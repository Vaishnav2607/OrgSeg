import React, { useState } from 'react';

const PolypPred = () => {
  const [imageURL, setImageURL] = useState('');
  const [outputImageURL, setOutputImageURL] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const imageURL = URL.createObjectURL(file);
    setImageURL(imageURL);
  };

  const handleProcessImage = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch('http://localhost:5000/process_polyp', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error processing image:', errorData.error);
        return;
      }
      const blob = await response.blob();
      const outputImageURL = URL.createObjectURL(blob);
      setOutputImageURL(outputImageURL);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  const handleClear = () => {
    setImageURL('');
    setOutputImageURL('');
    setFile(null);
  };

  return (
    <div className="bg-gradient-to-br from-green-200 to-blue-900 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="min-w-md w-half bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Upload Image</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
        {imageURL && (
          <div className="mb-4">
            <img src={imageURL} alt="Uploaded" className="max-w-full h-auto" />
          </div>
        )}
        {file && <p className="text-green-500 mb-4">Image uploaded successfully!</p>}
        <button onClick={handleProcessImage} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-800 mb-4">
          Process Image
        </button>
        {outputImageURL && (
          <div className="mb-4">
            <img src='' alt="Output" className="max-w-full h-auto" />
          </div>
        )}
        <button onClick={handleClear} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Clear
        </button>
      </div>
    </div>
  );
};

export default PolypPred;
