import torch
from medpalm.model import MedPalm
import base64
import numpy as np
import cv2

def image_to_tensor(image_path):
  """
  Load an image and convert it to a PyTorch tensor.

  Args:
    image_path (str): Path to the image file.

  Returns:
    torch.Tensor: Image as a PyTorch tensor.
  """
  img = cv2.imread(image_path)
  # Preprocess the image if needed (e.g., resize, normalize)
  img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  # Convert BGR to RGB if needed
  img = img.astype(np.float32) / 255.0  # Normalize pixel values
  img = torch.from_numpy(img).permute(2, 0, 1)  # Convert to PyTorch format (C, H, W)
  return img

# Usage
img = image_to_tensor("results/input_lung.jpg")
img = img.unsqueeze(0)  # Add a batch dimension of size 1
img1 = torch.randn(1,3,256,256)

text = torch.randint(0,2000,(1,4096))

model = MedPalm()
output = model(img1, text)
print(output)