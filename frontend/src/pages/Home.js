// import React from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return ( 
//     <div className="bg-gradient-to-br from-green-100 to-blue-100 min-h-screen flex items-center justify-center">
//       <div className="max-w-3xl mx-auto py-12 px-8 bg-white rounded-lg shadow-lg">
//         <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Welcome to OrgSeg App</h1>
//         <p className="text-lg text-gray-900 mb-4 text-center">
//           An innovative healthcare application that leverages advanced artificial intelligence and image processing techniques to assist medical professionals and patients in analyzing medical images. The application provides accurate diagnoses and detailed image segmentations to enhance the understanding and treatment of various medical conditions.
//         </p>
//         <p className="text-lg text-gray-700 mb-8 text-center">
//           Click here to get started...
//         </p>
//         <div className="flex justify-center space-x-4 mb-6">
//           <Link to="/mchat" className="bg-green-600 hover:bg-gray-900 text-white px-8 py-3 rounded-lg transition duration-300 transform hover:scale-105">
//             Mental Health Chat
//           </Link>
//           <Link to="/chat" className="bg-green-600 hover:bg-gray-900 text-white px-8 py-3 rounded-lg transition duration-300 transform hover:scale-105">
//             Chat
//           </Link>
//         </div>
//         <div className="flex justify-center py-4">
//           <div className="flex space-x-4">
//             <Link to="/ImageInputPage" className="bg-green-600 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105">
//               Multi Organ Segmentation
//             </Link>
//             <Link to="/processLung" className="bg-green-600 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105">
//               Lungs
//             </Link>
//             <Link to="/processBrain" className="bg-green-600 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105">
//               Brain
//             </Link>
//             <Link to="/processReg" className="bg-green-600 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105">
//               Regular Image
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


// import React from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return ( 
//     <div className="bg-gradient-to-br from-green-100 to-blue-100 min-h-screen flex items-center justify-center">
//       {/* <div className="max-w-3xl mx-auto py-12 px-8 bg-white rounded-lg shadow-lg">
//         <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Welcome to OrgSeg App</h1>
//         <p className="text-lg text-gray-900 mb-4 text-center">
//           An innovative healthcare application that leverages advanced artificial intelligence and image processing techniques to assist medical professionals and patients in analyzing medical images. The application provides accurate diagnoses and detailed image segmentations to enhance the understanding and treatment of various medical conditions.
//         </p>
//         <p className="text-lg text-gray-700 mb-8 text-center">
//           Click here to get started...
//         </p>
//         <div className="flex justify-center space-x-4 mb-6">
//           <Link to="/mchat" className="bg-green-600 hover:bg-gray-900 text-white px-8 py-3 rounded-lg transition duration-300 transform hover:scale-105">
//             Mental Health Chat
//           </Link>
//           <Link to="/chat" className="bg-green-600 hover:bg-gray-900 text-white px-8 py-3 rounded-lg transition duration-300 transform hover:scale-105">
//             Chat
//           </Link>
//         </div>
//         <div className="flex justify-center py-4">
//           <div className="flex space-x-4">
//             <Link to="/ImageInputPage" className="bg-green-600 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105">
//               Multi Organ Segmentation
//             </Link>
//             <Link to="/processLung" className="bg-green-600 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105">
//               Lungs
//             </Link>
//             <Link to="/processBrain" className="bg-green-600 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105">
//               Brain
//             </Link>
//             <Link to="/processReg" className="bg-green-600 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105">
//               Regular Image
//             </Link>
//           </div>
//         </div>
//       </div> */}
//       <div className="container mx-auto max-w-7xl px-4 py-8">
//         <Section1 />
//         <Section2 />
//         <Section3 />
//         <Section4 />
//       </div>
//     </div>
//   );
// };

// const Section1 = () => {
//   return (
//     <div className="mb-16">
//       <h1 className="text-4xl font-bold text-center mb-8">Multi-Organ Abdominal Segmentation and Diagnosis</h1>
//       <p className="text-lg text-gray-700 mb-8">
//         This component of the project enables us to upload CT scans of multiple abdominal organs. The proposed framework is evaluated through the segmentation of eight abdominal organs: liver, spleen, left and right kidneys, pancreas, gallbladder, aorta, and inferior vena cava. The evaluation is conducted on 134 CT data obtained from 86 patients under six different imaging conditions from various hospitals.
//       </p>
//       <div className="flex justify-center">
//         <img src="input-image-1.jpg" alt="Input Image 1" className="w-1/2 mr-4 rounded-lg shadow-lg" />
//         <img src="output-image-1.jpg" alt="Output Image 1" className="w-1/2 rounded-lg shadow-lg" />
//       </div>
//     </div>
//   );
// };

// const Section2 = () => {
//   return (
//     <div className="mb-16 bg-gray-100 py-12">
//       <h1 className="text-4xl font-bold text-center mb-8">Brain Tumor Segmentation and Diagnosis</h1>
//       <p className="text-lg text-gray-700 mb-8 px-8">
//         This component of the project enables us to upload MRI scans of the brain, one image at a time, to obtain a diagnosis based on the segmented image produced by our model. Our model is a U-Net CNN model, unlike the multi-organ segmentation model, which is a U-Net Transformer model.
//       </p>
//       <div className="flex justify-center">
//         <img src="input-image-2.jpg" alt="Input Image 2" className="w-1/2 mr-4 rounded-lg shadow-lg" />
//         <img src="output-image-2.jpg" alt="Output Image 2" className="w-1/2 rounded-lg shadow-lg" />
//       </div>
//     </div>
//   );
// };

// const Section3 = () => {
//   return (
//     <div className="mb-16">
//       <h1 className="text-4xl font-bold text-center mb-8">Pulmonary Chest X-Ray Segmentation and Diagnosis</h1>
//       <p className="text-lg text-gray-700 mb-8">
//         This component of the project enables us to upload X-ray images of a patient's lungs. The proposed framework is evaluated through the segmentation of the lung tissue from the patient's X-ray, and it provides a detailed diagnosis. We utilized a fine-tuned U-Net CNN model trained on lung masks and images. Our model achieved a validation accuracy of 97.5% when trained for 30 epochs, and we employed the Dice coefficient as our metric for evaluating the segmentation performance.
//       </p>
//       <div className="flex justify-center">
//         <img src="input-image-2.jpg" alt="Input Image 2" className="w-1/2 mr-4 rounded-lg shadow-lg" />
//         <img src="output-image-2.jpg" alt="Output Image 2" className="w-1/2 rounded-lg shadow-lg" />
//       </div>
//     </div>
//   );
// };

// const Section4 = () => {
//   return (
//     <div className="mb-16 bg-gray-100 py-12">
//       <h1 className="text-4xl font-bold text-center mb-8">An Image-based Large Language Model (LLM) Bot finetuned on Medical LLama-3</h1>
//       <p className="text-lg text-gray-700 mb-8 px-8">
//         This component of the project enables us to upload images of any organ displaying physical abnormalities, such as skin rashes, burns, swelling, or any other visible defects perceptible to the naked eye. Our LLM Bot provides a basic overview of the image without employing any segmentation or processing techniques.
//       </p>
//       <div className="flex justify-center">
//         <img src="input-image-2.jpg" alt="Input Image 2" className="w-1/2 mr-4 rounded-lg shadow-lg" />
//         <img src="output-image-2.jpg" alt="Output Image 2" className="w-1/2 rounded-lg shadow-lg" />
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import { FaLaptopMedical, FaCommentDots, FaBrain, FaLungs } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-green-200 to-blue-900 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto py-12 px-8 bg-white rounded-lg shadow-lg">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">Welcome to OrgSeg App</h1>
          <p className="text-lg text-gray-700">
            An advanced healthcare application harnessing cutting-edge artificial intelligence and sophisticated image processing techniques to revolutionize the analysis of medical images. This innovative solution empowers medical professionals with precise diagnostics, enhances patient care through accurate image interpretation, and accelerates the decision-making process in clinical settings. By integrating state-of-the-art AI models, the application provides reliable, real-time analysis of various medical images, from X-rays to MRIs, aiding in the early detection of diseases and conditions. It serves as an invaluable tool for both healthcare providers and patients, ensuring better health outcomes and streamlining medical workflows. Experience the future of medical imaging with our AI-driven application, designed to set new standards in healthcare excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
            <ul className="space-y-4">
              <li className="flex items-center">
                {/* <FaLaptopMedical className="text-green-600 mr-4" /> */}
                <span>Detailed image segmentations and accurate diagnoses through abdominal CT scans, Chest X-rays, Brain MRI Scans</span>
              </li>
              <li className="flex items-center">
                {/* <FaCommentDots className="text-green-600 mr-4" /> */}
                <span>Virtual Doctor</span>
              </li>
              <li className="flex items-center">
                {/* <FaCommentDots className="text-green-600 mr-4" /> */}
                <span>Mental health chat and support</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              <div className='py-3'>
                Try out these features
              </div>
              <Link
                to="/services"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center mt-5"
              >
                {/* <FaCommentDots className="mr-2" /> */}
                Get Started
              </Link>
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* <Link
                to="/mchat"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
              >
                <FaCommentDots className="mr-2" />
                Mental Health Chat
              </Link>
              <Link
                to="/chat"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
              >
                <FaCommentDots className="mr-2" />
                Chat
              </Link>
              <Link
                to="/ImageInputPage"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
              >
                <FaLaptopMedical className="mr-2" />
                Multi Organ Segmentation
              </Link>
              <Link
                to="/processLung"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
              >
                <FaLungs className="mr-2" />
                Lungs
              </Link>
              <Link
                to="/processBrain"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
              >
                <FaBrain className="mr-2" />
                Brain
              </Link>
              <Link
                to="/processReg"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
              >
                <FaLaptopMedical className="mr-2" />
                Regular Image
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;