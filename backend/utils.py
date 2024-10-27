import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

import numpy as np
import cv2
import tensorflow as tf
import scipy.io

""" Global parameters """
global IMG_H
global IMG_W
global NUM_CLASSES
global CLASSES
global COLORMAP

""" Creating a directory """
def create_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

def read_image(x):
    x = cv2.imread(x, cv2.IMREAD_COLOR)
    x = cv2.resize(x, (IMG_W, IMG_H))
    x = x.astype(np.float32)
    return x

def get_colormap():
    colormap = scipy.io.loadmat('ultimate.mat')["color"]

    classes = [
        "Background",
        "Spleen",
        "Right kidney",
        "Left kidney",
        "Liver",
        "Gallbladder",
        "Stomach",
        "Aorta",
        "Inferior vena cava",
        "Portal vein",
        "Pancreas"
    ]

    return classes, colormap




def grayscale_to_rgb(pred, classes, colormap):
    h, w, _ = pred.shape
    pred = pred.astype(np.int32)
    output = []

    for i, pixel in enumerate(pred.flatten()):
        output.append(colormap[pixel])

    output = np.reshape(output, (h, w, 3))
    return output

def save_results(image, pred, classes, colormap, save_image_path):
    if os.path.exists(save_image_path):
        os.remove(save_image_path)  # Delete existing file
    
    h, w, _ = image.shape
    line = np.ones((h, 10, 3)) * 255
    pred = np.expand_dims(pred, axis=-1)
    pred = grayscale_to_rgb(pred, classes, colormap)
    assert image.shape == pred.shape
    print("image", image.shape)
    print("pred", pred.shape)

    alpha = 0.5
    blended_image2 = alpha * image + (1 - alpha) * pred
    cat_images = np.concatenate([image, line, blended_image2], axis=1)
    cv2.imwrite(save_image_path, cat_images)


def main(image_path, model_path, IMG_H, IMG_W, NUM_CLASSES):
    """ Directory for storing files """
    saving_path = "results"
    create_dir(saving_path)

    """ Model """
    model = tf.keras.models.load_model(model_path)
    
    image = cv2.imread(image_path, cv2.IMREAD_COLOR)
    image = cv2.resize(image, (IMG_W, IMG_H))
    image_x = image
    image = np.expand_dims(image, axis=0)
    
    """ Prediction """
    pred = model.predict(image, verbose=0)[0]
    pred = np.argmax(pred, axis=-1)
    pred = pred.astype(np.float32)
    classes, colormap = get_colormap()

    """ Saving the prediction """
    save_image_path = f"{saving_path}/unet_prediction1.png"
    save_results(image_x, pred, classes, colormap, save_image_path)
    
    return classes  # Return classes variable