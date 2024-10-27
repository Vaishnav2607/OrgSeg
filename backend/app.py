
import os
from flask import Flask, request, send_file
from flask_cors import CORS
import numpy as np
import cv2
import tensorflow as tf
import scipy.io
import tensorflow as tf
import keras
from metrics import dice_coef, dice_loss
from io import BytesIO
from patchify import patchify
from tqdm import tqdm
import openai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


# from openai import OpenAI
# import instructor

# client = OpenAI(
#     api_key='Vaishnav2607',
#     base_url='http://localhost:8080/v1'
# )
# # Create a patched client
# client = instructor.patch(client=client)

# response = client.chat.completions.create(
#     # which model we want to use
#     model='llava3',

#     #Pass through our prompt
#     messages=[{
#         'role':'user',
#         'content':prompt
#     }],
#     # stream=True
# )


print("TensorFlow version:", tf.__version__)
print("Keras version:", keras.__version__)
import h5py
from finddoc import find_app_doc, gen_res, find_nearby_doctors, getCoords

# Open the HDF5 file for reading
with h5py.File('models/polyp.h5', 'r') as f:
    # Check the Keras version attribute
    keras_version = f.attrs.get('keras_version')
    print("Keras version used to save the model:", keras_version)

app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={
    r"/process_image": {"origins": "http://localhost:3000"},
    r"/process_polyp": {"origins": "http://localhost:3000"},
    r"/process_lung": {"origins": "http://localhost:3000"},
    r"/process_brain": {"origins": "http://localhost:3000"},
    r"/process_fracture": {"origins": "http://localhost:3000"},
    r"/process_text": {"origins": "http://localhost:3000"},
})
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

""" Global parameters """
IMG_H = 256
IMG_W = 256
NUM_CLASSES = 11

""" Creating a directory """
def create_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

def read_image(image_file):
    npimg = np.frombuffer(image_file.read(), np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    img = cv2.resize(img, (416, 320))  # Resize the image to match the model's input shape
    img = img.astype(np.float32)
    return img


def get_colormap():
    colormap = scipy.io.loadmat('ultimate.mat')["color"]
    classes = ["Background", "Spleen", "Right kidney", "Left kidney", "Liver", "Gallbladder", "Stomach", "Aorta", "Inferior vena cava", "Portal vein", "Pancreas"]
    return classes, colormap

def grayscale_to_rgb(pred, classes, colormap):
    h, w = IMG_H, IMG_W
    pred = np.squeeze(pred, axis=-1)
    pred = pred.astype(np.int32)
    output = np.zeros((h, w, 3), dtype=np.uint8)
    for i in range(h):
        for j in range(w):
            pixel = pred[i, j]
            output[i, j, :] = colormap[pixel]
    return output

def save_results(image, pred, classes, colormap, save_image_path):
    if os.path.exists(save_image_path):
        os.remove(save_image_path)  # Delete existing file
    pred = np.expand_dims(pred, axis=-1)
    pred = grayscale_to_rgb(pred, classes, colormap)
    alpha = 0.5
    blended_image = alpha * image + (1 - alpha) * pred
    cv2.imwrite(save_image_path, blended_image)

# def dice_loss(y_true, y_pred):
#     smooth = 1e-5
#     intersection = tf.reduce_sum(y_true * y_pred)
#     union = tf.reduce_sum(y_true) + tf.reduce_sum(y_pred)
#     return 1.0 - (2.0 * intersection + smooth) / (union + smooth)

# def dice_coef(y_true, y_pred):
#     smooth = 1e-5
#     intersection = tf.reduce_sum(y_true * y_pred)
#     return (2.0 * intersection + smooth) / (tf.reduce_sum(y_true) + tf.reduce_sum(y_pred) + smooth)

# import cv2
# import numpy as np
# from flask import request

# import cv2
# import numpy as np
# from flask import request

# import os

import os
from flask import Flask, request, send_file
from flask_cors import CORS
import numpy as np
import cv2
import tensorflow as tf
import scipy.io
from utils import main as utils_main
import anthropic
import base64
def encode_image(image_path):
    with open(image_path, 'rb') as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")
    
context = "You are a medical practictioner and an expert in analzying medical related images working for a very reputed hospital. You will be provided with image and you need to identify the anomalies, any disease or health issues. You need to generate the result in detailed manner. Write all the findings, next steps, recommendation, etc. You only need to respond if the image is related to a human body and health issues. You must have to answer but also write a disclaimer saying that 'Consult with a Doctor before making any decisions'. Remember, if certain aspects are not clear from the image, it's okay to state 'Unable to determine based on the provided text.' Now analyze the image and answer in the same structured manner defined above."
context_lung = "You are a medical practictioner and an expert in analzying medical related images working for a very reputed hospital. You will be provided with lungs x-ray image and its mask image you need to identify the anomalies, any disease or health issues. You need to generate the result in detailed manner. Write all the findings, next steps, recommendation, etc. You only need to respond if the image is related to a human body and health issues. You must have to answer but also write a disclaimer saying that 'Consult with a Doctor before making any decisions'. Remember, if certain aspects are not clear from the image, it's okay to state 'Unable to determine based on the provided text.' Now analyze the image and answer in the same structured manner defined above."
context_mos = "You are a medical practictioner and an expert in analzying medical related images working for a very reputed hospital. You will be provided with cross-sectional abdomen ct scan image in a vertical plane and you need to identify the anomalies, any disease or health issues. You need to generate the result in detailed manner. Write all the findings, next steps, recommendation, etc. You only need to respond if the image is related to a human body and health issues. You must have to answer but also write a disclaimer saying that 'Consult with a Doctor before making any decisions'. Remember, if certain aspects are not clear from the image, it's okay to state 'Unable to determine based on the provided text.' Now analyze the image and answer in the same structured manner defined above."
context_brain = "You are a medical practictioner and an expert in analzying medical related images working for a very reputed hospital. You will be provided with brain mri scan or a brain ct scan image and its tumor mask image and you need to identify the anomalies, any disease or health issues. You need to generate the result in detailed manner. Write all the findings, next steps, recommendation, etc. You must have to answer but also write a disclaimer saying that 'Consult with a Doctor before making any decisions'. Remember, if certain aspects are not clear from the image, it's okay to state 'Unable to determine based on the provided text.' Now analyze the image and answer in the same structured manner defined above."
claude_api_key = os.getenv("CLAUDE_API")
client = anthropic.Anthropic(api_key=claude_api_key)



""" Global parameters """
IMG_H = 256
IMG_W = 256
NUM_CLASSES = 11

""" Creating a directory """
def create_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

def read_image(image_file):
    npimg = np.frombuffer(image_file.read(), np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    img = cv2.resize(img, (IMG_W, IMG_H))
    img = img.astype(np.float32)
    return img

def get_colormap():
    colormap = scipy.io.loadmat('ultimate.mat')["color"]
    classes = ["Background", "Spleen", "Right kidney", "Left kidney", "Liver", "Gallbladder", "Stomach", "Aorta", "Inferior vena cava", "Portal vein", "Pancreas"]
    return classes, colormap

def grayscale_to_rgb(pred, classes, colormap):
    h, w = IMG_H, IMG_W
    pred = np.squeeze(pred, axis=-1)
    pred = pred.astype(np.int32)
    output = np.zeros((h, w, 3), dtype=np.uint8)
    for i in range(h):
        for j in range(w):
            pixel = pred[i, j]
            output[i, j, :] = colormap[pixel]
    return output

def save_results(image, pred, classes, colormap, save_image_path):
    if os.path.exists(save_image_path):
        os.remove(save_image_path)  # Delete existing file

    pred = np.expand_dims(pred, axis=-1)
    pred = grayscale_to_rgb(pred, classes, colormap)

    alpha = 0.5
    blended_image = alpha * image + (1 - alpha) * pred

    cv2.imwrite(save_image_path, blended_image)

@app.route('/process_image', methods=['POST'])
def process_image():
    """ Directory for storing files """
    saving_path = "results"
    create_dir(saving_path)

    """ Model """
    model = tf.keras.models.load_model('models/moss.h5')

    """ Read image """
    image_file = request.files['image']
    location = request.form['location']
    latitude,longitude = getCoords(location=location)
    print(latitude)
    print(longitude)
    filename = image_file.filename
    ext = filename.split('.')[-1].lower()
    input_path = f'results/input_mos.{ext}'
    # output_path = 'results/output1.png'
    # Ensure the results directory exists
    os.makedirs(os.path.dirname(input_path), exist_ok=True)
    image = read_image(image_file)
    image_x = image
    image = np.expand_dims(image, axis=0)

    """ Prediction """
    pred = model.predict(image, verbose=0)[0]
    pred = np.argmax(pred, axis=-1)
    pred = pred.astype(np.float32)

    classes, colormap = get_colormap()

    """ Saving the prediction """
    save_image_path = f"{saving_path}/output_mos.png"
    save_results(image_x, pred, classes, colormap, save_image_path)
    ext1 = ext
    if ext == 'jpg':
        ext1 = 'jpeg'
    # Assuming predictions[0] is the processed image data
    input_image_media_type = f'image/{ext1}'
    input_image_data = encode_image(f'results/input_mos.{ext}')
    output_image_data = encode_image("results/output_mos.png")
    output_image_media_type = 'image/png'
    # classes = main(image_path, model_path)
    # print(classes)  # Optionally, print the classes
    llm_res = 'Currently not working'
    try:
        message = client.messages.create(
            model="claude-3-opus-20240229",
            max_tokens=1024,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": input_image_media_type,
                                "data": input_image_data,
                            },
                        },
                        # {
                        #     "type": "image",
                        #     "source": {
                        #         "type": "base64",
                        #         "media_type": output_image_media_type,
                        #         "data": output_image_data,
                        #     },
                        # },
                        {
                            "type": "text",
                            "text": context_mos
                        }
                    ],
                }
            ],
        )
        llm_res = message.content[0].text
        print(llm_res)
    except:
        llm_res=''
        print("There is an error")

    # Prepare the response data
    prompt = 'Suggest the doctor type for this problem'
    app_doc = find_app_doc(prompt + llm_res) or ''
    print(app_doc)
    nearby_doctors = find_nearby_doctors(latitude, longitude, app_doc) if latitude and longitude else []
    print(nearby_doctors)
    # Prepare the response data
    result = {
        'app_doc': app_doc,
        'llm_res': llm_res,
        'nearby_doctors': nearby_doctors
          # Use the encoded image data here
    }
    # Return the response data as JSON
    return jsonify(result), 200
    return send_file(save_image_path, mimetype='image/png')

# @app.route('/process_image', methods=['POST'])
# def process_image():
#     """ Directory for storing files """
#     saving_path = "results"
#     create_dir(saving_path)

#     """ Model """
#     model = tf.keras.models.load_model('moss.h5')

#     """ Read image """
#     image_file = request.files['image']
    
#     # Extract extension from the filename
#     _, ext = os.path.splitext(image_file.filename)
    
#     # Generate unique filename for input image
#     input_filename = f"input_mos{ext}"
#     input_image_path = os.path.join(saving_path, input_filename)
    
#     # Save input image
#     image_file.save(input_image_path)
    
#     # Read and preprocess input image
#     image = read_image(image_file)
#     image_x = image
#     image = np.expand_dims(image, axis=0)

#     """ Prediction """
#     pred = model.predict(image, verbose=0)[0]
#     pred = np.argmax(pred, axis=-1)
#     pred = pred.astype(np.float32)

#     classes, colormap = get_colormap()

#     """ Saving the prediction """
#     save_image_path = f"{saving_path}/output_mos.png"
#     save_results(image_x, pred, classes, colormap, save_image_path)
    
#     # Return the saved input image
#     return send_file(save_image_path, mimetype='image/png')




# New route for processing lung images
from keras.models import load_model
from keras.preprocessing import image
import keras.backend as K

def dice_coef(y_true, y_pred, smooth=1):
    y_true_f = K.flatten(y_true)
    y_pred_f = K.flatten(y_pred)
    intersection = K.sum(y_true_f * y_pred_f)
    return (2. * intersection + smooth) / (K.sum(y_true_f) + K.sum(y_pred_f) + smooth)

custom_metrics = {
    'dice_coef': dice_coef
}


lung_model = load_model('models/lungs.h5', custom_objects={'dice_coef': dice_coef})


ext=''
from flask import jsonify
@app.route('/process_lung', methods=['POST'])
def process_lung():
    # Get the image file from the request
    image_file = request.files['image']
    location = request.form['location']
    latitude,longitude = getCoords(location=location)
    print(latitude)
    print(longitude)

    # Get the original filename and extension
    filename = image_file.filename
    ext = filename.split('.')[-1].lower()

    # Define paths for input and output images
    input_path = f'results/input_lung.{ext}'
    output_path = 'results/output_lung.png'

    # Ensure the results directory exists
    os.makedirs(os.path.dirname(input_path), exist_ok=True)

    # Save the uploaded image to input_path
    with open(input_path, 'wb') as f:
        f.write(image_file.read())

    # Load and preprocess the image
    img = image.load_img(input_path, target_size=(256, 256), color_mode='grayscale')
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.

    # Make predictions using the loaded model
    predictions = lung_model.predict(img_array)

    # Save the processed image to output_path
    image.save_img(output_path, predictions[0])
    ext1 = ext
    if ext == 'jpg':
        ext1 = 'jpeg'
    
    # Assuming predictions[0] is the processed image data
    input_image_media_type = f'image/{ext1}'
    input_image_data = encode_image(f'results/input_lung.{ext}')
    output_image_data = encode_image("results/output_lung.png")
    output_image_media_type = 'image/png'
    
    try:
        message = client.messages.create(
            model="claude-3-opus-20240229",
            max_tokens=1024,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": input_image_media_type,
                                "data": input_image_data,
                            },
                        },
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": output_image_media_type,
                                "data": output_image_data,
                            },
                        },
                        {
                            "type": "text",
                            "text": context_lung
                        }
                    ],
                }
            ],
        )
        llm_res = message.content[0].text
        print(llm_res)
        # openai.api_key = "sk-YLBUFAOe_MlajgagQrxlJZEAIqz6fyJch7tM5C1SMaT3BlbkFJd0fI3qSw6IjLlWWRI7Mh1oUJc16tNE6PXlPSeKco0A"
        # response = openai.chat.completions.create(
        #     model="gpt-4o-mini",
        #     messages=[
        #         {
        #             "role": "user",
        #             "content": context_lung
        #         },
        #         {
        #             "role": "user",
        #             "content": {
        #                 "image": {
        #                     "url": f"data:{input_image_media_type};base64,{input_image_data}"
        #                 }
        #             }
        #         }
        #     ],
        #     max_tokens=300
        # )

        # llm_res = response['choices'][0]['message']['content']
        # print(llm_res)

    except Exception as e:
        llm_res = f"Error: {str(e)}"
        print(llm_res)

    prompt = 'Suggest the doctor type for this problem'
    app_doc = find_app_doc(prompt + llm_res) or ''
    print(app_doc)
    nearby_doctors = find_nearby_doctors(latitude, longitude, app_doc) if latitude and longitude else []
    print(nearby_doctors)
    # Prepare the response data
    result = {
        'app_doc': app_doc,
        'llm_res': llm_res,
        'nearby_doctors': nearby_doctors,
        "output_image_data" : output_image_data
          # Use the encoded image data here
    }
    # Return the response data as JSON
    return jsonify(result), 200


import cv2
import os
from keras.models import load_model

# Define the custom loss function if not already defined
def dice_coef(y_true, y_pred, smooth=1):
    intersection = K.sum(y_true * y_pred, axis=[1,2,3])
    union = K.sum(y_true, axis=[1,2,3]) + K.sum(y_pred, axis=[1,2,3])
    dice = K.mean((2. * intersection + smooth) / (union + smooth), axis=0)
    return 1 - dice


import keras.backend as K

def iou(y_true, y_pred, smooth=1):
    # Flatten the true and predicted masks
    y_true_flat = K.flatten(y_true)
    y_pred_flat = K.flatten(y_pred)
    
    # Calculate the intersection (true positive)
    intersection = K.sum(y_true_flat * y_pred_flat)
    
    # Calculate the union
    union = K.sum(y_true_flat) + K.sum(y_pred_flat) - intersection
    
    # Calculate IoU (Intersection over Union)
    iou = (intersection + smooth) / (union + smooth)
    
    return iou
import keras.backend as K

def dice_coef_loss(y_true, y_pred):
    smooth = 1.0
    
    # Flatten the true and predicted masks
    y_true_flat = K.flatten(y_true)
    y_pred_flat = K.flatten(y_pred)
    
    # Calculate the intersection
    intersection = 2.0 * K.sum(y_true_flat * y_pred_flat) + smooth
    
    # Calculate the sum of squares for both true and predicted masks
    sum_true_pred = K.sum(K.square(y_true_flat)) + K.sum(K.square(y_pred_flat)) + smooth
    
    # Calculate the Dice coefficient
    dice_coef = intersection / sum_true_pred
    
    # Calculate the Dice loss
    dice_loss = 1 - dice_coef
    
    return dice_loss

import cv2

# Wrap the loading code with the custom object scope
model_seg=load_model('models/brain.h5', custom_objects={'dice_coef_loss': dice_coef_loss, 'iou' : iou, 'dice_coef' : dice_coef})

@app.route('/process_brain', methods=['POST'])
def process_brain():
    # Create the results directory if it doesn't exist
    output_dir = 'results'

    image_file = request.files['image']
    location = request.form['location']
    latitude,longitude = getCoords(location=location)
    print(latitude)
    print(longitude)

    # Get the original filename and extension
    filename = image_file.filename
    ext = filename.split('.')[-1].lower()
    print(ext)

    # Define paths for input and output images
    input_path = f'results/input_brain.{ext}'
    output_path = 'results/output_brain.png'
    
    # Save the uploaded image
    input_path = os.path.join(output_dir, f'input_brain.{ext}')
    image_file.save(input_path)

    # Read the image using OpenCV
    img = cv2.imread(input_path)
    
    # Preprocess the image
    img = cv2.resize(img, (256, 256))
    img = np.array(img, dtype=np.float64)
    img -= img.mean()
    img /= img.std()
    
    # Reshape the image for prediction
    X = img.reshape(1, 256, 256, 3)
    
    # Make prediction of the mask
    predict = model_seg.predict(X)
    print(predict)
    
        # Threshold the prediction to obtain a binary mask
    threshold = 0.5  # Adjust this threshold as needed
    binary_mask = (predict > threshold).astype(np.uint8) * 255

    # Save the binary mask as an image
    output_path = os.path.join(output_dir, 'output_brain.png')
    cv2.imwrite(output_path, binary_mask[0])
    ext1=ext
    if ext == 'jpg':
        ext1 = 'jpeg'
    
    # Assuming predictions[0] is the processed image data
    input_image_media_type = f'image/{ext1}'
    input_image_data = encode_image(f'results/input_brain.{ext}')
    output_image_data = encode_image("results/output_brain.png")
    output_image_media_type = 'image/png'
    llm_res = 'Currently not working'
    try:
        message = client.messages.create(
            model="claude-3-opus-20240229",
            max_tokens=1024,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": input_image_media_type,
                                "data": input_image_data,
                            },
                        },
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": output_image_media_type,
                                "data": output_image_data,
                            },
                        },
                        {
                            "type": "text",
                            "text": context_brain
                        }
                    ],
                }
            ],
        )
        llm_res = message.content[0].text
        print(llm_res)
    except:
        print("There is an error")

    prompt = 'Suggest the doctor type for this problem'
    app_doc = find_app_doc(prompt + llm_res) or ''
    print(app_doc)
    nearby_doctors = find_nearby_doctors(latitude, longitude, app_doc) if latitude and longitude else []
    print(nearby_doctors)
    # Prepare the response data
    result = {
        'app_doc': app_doc,
        'llm_res': llm_res,
        'nearby_doctors': nearby_doctors,
        'output_image_data': output_image_data
          # Use the encoded image data here
    }
    # Return the response data as JSON
    return jsonify(result), 200

    
    # return 'Processing completed. Output saved as output.png'

@app.route('/process_polyp', methods=['POST'])
def process_polyp():
    """ Directory for storing files """
    saving_path = "results"
    create_dir(saving_path)

    """ Model """
    model = tf.keras.models.load_model('models/polyp.h5')
    # model.compile(loss=[dice_loss, dice_coef], optimizer='adam', metrics=['accuracy'])

    """ Read image """
    image_file = request.files['image']
    image = read_image(image_file)
    image_x = image
    image = np.expand_dims(image, axis=0)

    """ Prediction """
    pred = model.predict(image, verbose=0)[0]
    pred = np.argmax(pred, axis=-1)
    pred = pred.astype(np.float32)

    classes, colormap = get_colormap()

    """ Saving the prediction """
    save_image_path = f"{saving_path}/output_mos.png"
    save_results(image_x, pred, classes, colormap, save_image_path)

    # Convert the image to a byte string
    with open(save_image_path, 'rb') as f:
        image_bytes = f.read()

    # Remove the saved image file
    os.remove(save_image_path)

    # Return the image data as a response
    return image_bytes, {'Content-Type': 'image/png'}

@app.route('/process_reg', methods=['POST'])
def process_reg():
    # Create the results directory if it doesn't exist
    output_dir = 'results'
    # os.makedirs(output_dir, exist_ok=True)

    # Get the image file from the request
    image_file = request.files['image']
    location = request.form['location']
    latitude,longitude = getCoords(location=location)
    print(latitude)
    print(longitude)
    
    # image_file = request.files['image']

    # Get the original filename and extension
    filename = image_file.filename
    ext = filename.split('.')[-1].lower()

    # Define paths for input and output images
    input_path = f'results/input_brain.{ext}'
    output_path = 'results/output_brain.png'
    
    # Save the uploaded image
    input_path = os.path.join(output_dir, f'input_reg.{ext}')
    image_file.save(input_path)

    # Read the image using OpenCV
    img = cv2.imread(input_path)
    ext1=ext
    if ext == 'jpg':
        ext1 = 'jpeg'
    
    # Assuming predictions[0] is the processed image data
    input_image_media_type = f'image/{ext1}'
    input_image_data = encode_image(f'results/input_reg.{ext}')
    # output_image_data = encode_image("results/output_brain.png")
    # output_image_media_type = 'image/png'
    llm_res = 'Currently not working'
    try:
        message = client.messages.create(
            model="claude-3-opus-20240229",
            max_tokens=1024,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": input_image_media_type,
                                "data": input_image_data,
                            },
                        },
                        {
                            "type": "text",
                            "text": context
                        }
                    ],
                }
            ],
        )
        llm_res = message.content[0].text
        print(llm_res)
    except:
        print("There is an error")
    prompt = 'Suggest the doctor type for this problem'
    app_doc = find_app_doc(prompt + llm_res) or ''
    print(app_doc)
    nearby_doctors = find_nearby_doctors(latitude, longitude, app_doc) if latitude and longitude else []
    print(nearby_doctors)
    # Prepare the response data
    result = {
        'app_doc': app_doc,
        'llm_res': llm_res,
        'nearby_doctors': nearby_doctors
          # Use the encoded image data here
    }
    # Return the response data as JSON
    return jsonify(result), 200

import requests
@app.route('/process_text', methods=['POST'])
def process_text():
    data = request.get_json()
    prompt = data.get('prompt')
    chat_history = data.get('chat_history')
    location = data.get('location')

    # Get coordinates from the location using Google Maps API
    latitude,longitude = getCoords(location=location)
    # print(latitude)
    # print(longitude)
    # google_maps_api_key = 'AIzaSyAPXF7A_0vCzpkSguqNjhKuLkVgSzCZ_Xs'
    # geocode_url = f'https://maps.googleapis.com/maps/api/geocode/json?address={location}&key={google_maps_api_key}'
    
    # response = requests.get(geocode_url)
    # geocode_data = response.json()
    
    # # Debugging: Print the entire response from the API
    # # print(f"Geocode API response: {geocode_data}")
    
    # if geocode_data['status'] == 'OK':
    #     coordinates = geocode_data['results'][0]['geometry']['location']
    #     latitude = coordinates['lat']
    #     longitude = coordinates['lng']
    # else:
    #     latitude = None
    #     longitude = None
    
    # Debugging: Print the latitude and longitude
    print(f"Latitude: {latitude}")
    print(f"Longitude: {longitude}")
    # print(f"Chat history: {chat_history}")

    # Process the data
    llm_res = gen_res(prompt, chat_history) or ''
    app_doc = find_app_doc(prompt + llm_res) or ''
    nearby_doctors = find_nearby_doctors(latitude, longitude, app_doc) if latitude and longitude else []
    # print(nearby_doctors)
    result = {
        'app_doc': app_doc,
        'llm_res': llm_res,
        'nearby_doctors': nearby_doctors
    }
    print(llm_res)
    return jsonify(result)


@app.route('/process_mhtext', methods=['POST'])
def process_mhtext():
    data = request.get_json()
    prompt = data.get('prompt')
    chat_history = data.get('chat_history')
    location = data.get('location')

    # Get coordinates from the location using Google Maps API
    latitude,longitude = getCoords(location=location)
    # print(latitude)
    # print(longitude)
    # google_maps_api_key = 'AIzaSyAPXF7A_0vCzpkSguqNjhKuLkVgSzCZ_Xs'
    # geocode_url = f'https://maps.googleapis.com/maps/api/geocode/json?address={location}&key={google_maps_api_key}'
    
    # response = requests.get(geocode_url)
    # geocode_data = response.json()
    
    # # Debugging: Print the entire response from the API
    # # print(f"Geocode API response: {geocode_data}")
    
    # if geocode_data['status'] == 'OK':
    #     coordinates = geocode_data['results'][0]['geometry']['location']
    #     latitude = coordinates['lat']
    #     longitude = coordinates['lng']
    # else:
    #     latitude = None
    #     longitude = None
    
    # Debugging: Print the latitude and longitude
    print(f"Latitude: {latitude}")
    print(f"Longitude: {longitude}")
    # print(f"Chat history: {chat_history}")

    # Process the data
    llm_res = gen_res(prompt, chat_history) or ''
    app_doc = find_app_doc(prompt + llm_res) or ''
    nearby_doctors = find_nearby_doctors(latitude, longitude, app_doc) if latitude and longitude else []
    # print(nearby_doctors)
    result = {
        'app_doc': app_doc,
        'llm_res': llm_res,
        'nearby_doctors': nearby_doctors
    }
    print(llm_res)
    return jsonify(result)
# from flask import Flask, request, jsonify
# import safetensors.torch
# import torch
# import torchvision.transforms as T
# from PIL import Image
# import io
# import os

# # Load the model
# Fracturemodel = safetensors.torch.load_file("frac.safetensors")
# Fracturemodel.eval() 

# # Define the image preprocessing steps
# transform = T.Compose([
#     T.Resize((224, 224)),  # Resize the image (adjust size as needed)
#     T.ToTensor(),
#     T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalize the tensor
# ])

# # Create a directory to save the images
# output_dir = 'results'
# # if not os.path.exists(output_dir):
# #     os.makedirs(output_dir)

# @app.route('/process_fracture', methods=['POST'])
# def process_fracture():
#     # Get the image file from the request
#     image_file = request.files['image']

#     # Open the image file
#     input_image = Image.open(io.BytesIO(image_file.read()))

#     # Preprocess the input image
#     input_tensor = transform(input_image).unsqueeze(0)

#     # Perform inference
#     with torch.no_grad():
#         output = Fracturemodel(input_tensor)

#     # Post-process the output (example for classification task)
#     _, predicted_class = torch.max(output.data, 1)
#     predicted_class = predicted_class.item()

#     # Save the input image
#     input_image_path = os.path.join(output_dir, 'input_frac.jpg')
#     input_image.save(input_image_path)

#     # Save the output image
#     # Example: Convert tensor output to PIL image (adjust based on model output)
#     # Assuming output is a tensor representing the processed image
#     output_image = output.squeeze(0).permute(1, 2, 0).cpu().numpy()  # Convert tensor to numpy array
#     output_image = (output_image * 255).astype(np.uint8)  # Convert to uint8 format
#     output_image = Image.fromarray(output_image)  # Convert numpy array to PIL image
#     output_image_path = os.path.join(output_dir, 'output_frac.jpg')
#     output_image.save(output_image_path)

#     # Return the predicted class and paths to saved images as a JSON response
#     response = {
#         'predicted_class': predicted_class,
#         'input_image_path': input_image_path,
#         'output_image_path': output_image_path
#     }

#     return jsonify(response)

# Example usage

# import base64
# from openai import OpenAI
# client = OpenAI(api_key="")
# image_path ="results/output1.png"


# # For text
# response = client.chat.completions.create(
#     model = "gpt-3.5-turbo",
#     messages=[
#         {"role" : "system", "content" : "You are a helpful assistant"},
#         {"role" : "user", "content" : "What is return on investment?"}         
#     ]
# )
# print(response.choices[0].message.content)

    
# base64_image = encode_image(image_path)
# MODEL = "gpt-4o"

# response = client.chat.completions.create(
#     model = MODEL,
#     messages=[
#         {"role" : "system", "content" : "You aare a helpful assistant"},
#         {"role" : "user", "content" : [
#             {"type" : "text", "text" : "What is this Picture about?"},
#             {"type" : "image_url", "image_url" : {"url" : f"data:image/png;base64,{base64_image}"}
#             }
#         ]}        
#     ],
#     temperature=0.0,
# )
# print(response.choices[0].message.content)
# import anthropic
# import base64
# import base64
# def encode_image(image_path):
#     with open(image_path, 'rb') as image_file:
#         return base64.b64encode(image_file.read()).decode("utf-8")
    
# context = "You are a medical practictioner and an expert in analzying medical related images working for a very reputed hospital. You will be provided with image and you need to identify the anomalies, any disease or health issues. You need to generate the result in detailed manner. Write all the findings, next steps, recommendation, etc. You only need to respond if the image is related to a human body and health issues. You must have to answer but also write a disclaimer saying that 'Consult with a Doctor before making any decisions'. Remember, if certain aspects are not clear from the image, it's okay to state 'Unable to determine based on the provided text.' Now analyze the image and answer in the same structured manner defined above."
# client = anthropic.Anthropic(api_key="")
# input_image_media_type = f'image/{ext}'
# input_image_data = encode_image('results/input.png')
# output_image_data = encode_image("results/output1.png")
# output_image_media_type = 'image/png'
# message = client.messages.create(
#     model="claude-3-opus-20240229",
#     max_tokens=1024,
#     # api_key="",
#     messages=[
#         {
#             "role": "user",
#             "content": [
#                 {
#                     "type": "image",
#                     "source": {
#                         "type": "base64",
#                         "media_type": output_image_media_type,
#                         "data": output_image_data,
#                     },
#                 },
#                 {
#                     "type": "text",
#                     "text": context
#                 }
#             ],
#         }
#     ],
# )
# print(message)


if __name__ == '__main__':
    app.run(debug=True)
