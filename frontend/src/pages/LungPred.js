
// // import React, { useState } from 'react';
// // import { HashLoader } from 'react-spinners';

// // const LungPred = () => {
// //   const [imageURL, setImageURL] = useState('');
// //   const [outputImageDataURL, setOutputImageDataURL] = useState('');
// //   const [llmRes, setLlmRes] = useState('');
// //   const [file, setFile] = useState(null);
// //   const [loading, setLoading] = useState(false); // Add loading state

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     setFile(file);
// //     const imageURL = URL.createObjectURL(file);
// //     setImageURL(imageURL);
// //   };

// //   const handleProcessImage = async () => {
// //     if (!file) return;
// //     setLoading(true); // Set loading to true when processing image
// //     const formData = new FormData();
// //     formData.append('image', file);
// //     try {
// //       const response = await fetch('http://localhost:5000/process_lung', {
// //         method: 'POST',
// //         body: formData,
// //       });
// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         console.error('Error processing image:', errorData.error);
// //         return;
// //       }
// //       const responseData = await response.json();
// //       setLlmRes(responseData.llm_res);
// //       setOutputImageDataURL(responseData.output_image_data);
// //     } catch (error) {
// //       console.error('Error processing image:', error);
// //     } finally {
// //       setLoading(false); // Set loading to false when image processing is complete
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
// //       <div className="min-w-md w-half bg-white p-8 rounded-lg shadow-lg">
// //         <h2 className="text-2xl mb-4">Upload Image</h2>
// //         <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
// //         {imageURL && (
// //           <div className="mb-4">
// //             <img src={imageURL} alt="Uploaded" className="max-w-full h-auto" />
// //           </div>
// //         )}
// //         {file && <p className="text-green-500 mb-4">Image uploaded successfully!</p>}
// //         {/* Render spinner if loading state is true */}
// //         {loading ? (
// //           <div className="flex justify-center">
// //             <HashLoader color="#43A047" size={50} />
// //           </div>
// //         ) : (
// //           <button onClick={handleProcessImage} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mb-4">
// //             Process Image
// //           </button>
// //         )}
// //         {outputImageDataURL && (
// //           <div className="mb-4">
// //             <img src={`data:image/png;base64,${outputImageDataURL}`} alt="Output" className="max-w-full h-auto" />
// //           </div>
// //         )}
// //         {llmRes && (
// //           <div>
// //             <h1>Diagnosis</h1>
// //             <pre style={{ whiteSpace: 'pre-wrap' }}>{llmRes}</pre>
// //           </div>
// //         )}
// //         <button
// //           onClick={() => {
// //             setImageURL('');
// //             setOutputImageDataURL('');
// //             setLlmRes('');
// //             setFile(null);
// //           }}
// //           className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
// //         >
// //           Clear
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LungPred;


// import React, { useState } from 'react';
// import { HashLoader } from 'react-spinners';

// const LungPred = () => {
//   const [imageURL, setImageURL] = useState('');
//   const [outputImageDataURL, setOutputImageDataURL] = useState('');
//   const [llmRes, setLlmRes] = useState('');
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false); // Add loading state

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFile(file);
//     const imageURL = URL.createObjectURL(file);
//     setImageURL(imageURL);
//   };

//   const handleProcessImage = async () => {
//     if (!file) return;
//     setLoading(true); // Set loading to true when processing image
//     const formData = new FormData();
//     formData.append('image', file);
//     try {
//       const response = await fetch('http://localhost:5000/process_lung', {
//         method: 'POST',
//         body: formData,
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Error processing image:', errorData.error);
//         return;
//       }
//       const responseData = await response.json();
//       setLlmRes(responseData.llm_res);
//       setOutputImageDataURL(responseData.output_image_data);
//     } catch (error) {
//       console.error('Error processing image:', error);
//     } finally {
//       setLoading(false); // Set loading to false when image processing is complete
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="min-w-md w-full bg-white p-8 rounded-lg shadow-lg">
//         <h2 className="text-2xl mb-4">Upload Image</h2>
//         <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
//         <div className="flex mb-4">
//           {imageURL && (
//             <div className="flex-1 mr-2">
//               <img src={imageURL} alt="Uploaded" className="max-w-full h-auto" />
//             </div>
//           )}
//           {outputImageDataURL && (
//             <div className="flex-1 ml-2">
//               <img src={`data:image/png;base64,${outputImageDataURL}`} alt="Output" className="max-w-full h-auto" />
//             </div>
//           )}
//         </div>
//         {file && <p className="text-green-500 mb-4">Image uploaded successfully!</p>}
//         {/* Render spinner if loading state is true */}
//         {loading ? (
//           <div className="flex justify-center">
//             <HashLoader color="#43A047" size={50} />
//           </div>
//         ) : (
//           <button onClick={handleProcessImage} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mb-4">
//             Process Image
//           </button>
//         )}
//         {llmRes && (
//           <div>
//             <h1>Diagnosis</h1>
//             <pre style={{ whiteSpace: 'pre-wrap' }}>{llmRes}</pre>
//           </div>
//         )}
//         <button
//           onClick={() => {
//             setImageURL('');
//             setOutputImageDataURL('');
//             setLlmRes('');
//             setFile(null);
//           }}
//           className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//         >
//           Clear
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LungPred;


import React, { useState } from 'react';
import { HashLoader } from 'react-spinners';
import DoctorCard from '../components/DoctorCard';

const LungPred = () => {
  const [imageURL, setImageURL] = useState('');
  const [outputImageDataURL, setOutputImageDataURL] = useState('');
  const [llmRes, setLlmRes] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [nearbyDoctors, setNearbyDoctors] = useState([]);
  const [appDoc, setAppDoc] = useState('');
  const [location, setLocation] = useState('');


  const handleLocationChange = async(e) =>{
    setLocation(e.target.value);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const imageURL = URL.createObjectURL(file);
    setImageURL(imageURL);
  };

  const handleProcessImage = async () => {
    if (!file) return;
    setLoading(true); // Set loading to true when processing image
    const formData = new FormData();
    formData.append('image', file);
    formData.append('location', location);
    try {
      const response = await fetch('http://localhost:5000/process_lung', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error processing image:', errorData.error);
        return;
      }
      const responseData = await response.json();
      setLlmRes(responseData.llm_res);
      setOutputImageDataURL(responseData.output_image_data);
      setNearbyDoctors(responseData.nearby_doctors || []);
      setAppDoc(responseData.app_doc)
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setLoading(false); // Set loading to false when image processing is complete
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-200 to-blue-900 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="min-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Upload Lung X-Ray to diagnose</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
        <div className="flex mb-4">
          {imageURL && (
            <div className="flex-1 mr-2">
              <img src={imageURL} alt="Uploaded" className="max-w-full h-auto" style={{ width: '300px', height: '300px' }} />
            </div>
          )}
          {outputImageDataURL && (
            <div className="flex-1 ml-2">
              <img src={`data:image/png;base64,${outputImageDataURL}`} alt="Output" className="max-w-full h-auto" style={{ width: '300px', height: '300px' }} />
            </div>
          )}
        </div>
        {file && <p className="text-green-500 mb-4">Image uploaded successfully!</p>}
        <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
              Location:
            </label>
            <textarea
              id="location"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter your Address"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
        {/* Render spinner if loading state is true */}
        {loading ? (
          <div className="flex justify-center">
            <HashLoader color="#43A047" size={50} />
          </div>
        ) : (
          <button onClick={handleProcessImage} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mb-4">
            Process Image
          </button>
        )}
        {llmRes && (
          <div>
            <h1>Diagnosis</h1>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{llmRes}</pre>
          </div>
        )}
        {appDoc && !loading && (
          <div className="mt-8 border border-gray-300 rounded-md p-4">
            <h2 className="text-xl font-bold mb-2">Doctor to Consult:</h2>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{appDoc}</pre>
          </div>
        )}
        {nearbyDoctors.length > 0 && !loading && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Nearby Doctors:</h2>
            <div className="flex flex-wrap justify-center">
              {nearbyDoctors.map((doctor, index) => (
                <DoctorCard key={index} doctor={doctor} />
              ))}
            </div>
          </div>
        )}
        <button
          onClick={() => {
            setImageURL('');
            setOutputImageDataURL('');
            setLlmRes('');
            setFile(null);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default LungPred;
