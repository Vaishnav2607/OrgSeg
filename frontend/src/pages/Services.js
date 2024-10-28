// // import React from 'react';
// // import { Link } from 'react-router-dom';

// // const Home = () => {
// //   return (
// //     <div className="bg-gradient-to-br from-green-100 to-blue-100 min-h-screen flex items-center justify-center">
// //       <div className="max-w-3xl mx-auto py-12 px-8 bg-white rounded-lg shadow-lg">
// //         <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Welcome to OrgSeg App</h1>
// //         <p className="text-lg text-gray-900 mb-4 text-center">
// //           An innovative healthcare application that leverages advanced artificial intelligence and image processing techniques to assist medical professionals and patients in analyzing medical images. The application provides accurate diagnoses and detailed image segmentations to enhance the understanding and treatment of various medical conditions.
// //         </p>
// //         <p className="text-lg text-gray-700 mb-8 text-center">
// //           Click here to get started...
// //         </p>
// //         <div className="flex justify-center space-x-4 mb-6">
// //           <Link to="/ImageInputPage" className="bg-green-600 hover:bg-gray-900 text-white px-8 py-3 rounded-lg transition duration-300 transform hover:scale-105">
// //             Organ Segmentation
// //           </Link>
// //           <Link to="/chat" className="bg-green-600 hover:bg-gray-900 text-white px-8 py-3 rounded-lg transition duration-300 transform hover:scale-105">
// //             Chat
// //           </Link>
// //         </div>
// //         <div className="flex justify-center py-4">
// //           <div className="flex space-x-4">
// //             <Link to="/processPolyp" className="bg-green-600 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105">
// //               Polyps
// //             </Link>
// //             <Link to="/processLung" className="bg-green-600 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105">
// //               Lungs
// //             </Link>
// //             <Link to="/processBrain" className="bg-green-600 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105">
// //               Brain
// //             </Link>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;
// import React from 'react';
// import { Link } from 'react-router-dom';

// const ServicesPage = () => {
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

// export default ServicesPage;


import React from 'react';
import Card from '../components/Card';

const ServicesPage = () => {
    return (
        <div className="bg-gradient-to-br from-green-200 to-blue-900 bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
                <Card
                    title="Multi Organ Segmentation"
                    text="Upload a abdomenal CT scan to get the segmented image and diagnosis."
                    imgSrc="https://firebasestorage.googleapis.com/v0/b/orgseg-6bdbc.appspot.com/o/mos.jpeg?alt=media&token=be0d6d37-9f75-4b6b-80f8-d0b5b2897661"
                    href="/ImageInputPage"
                />
                <Card
                    title="Lung Segmentation"
                    text="Upload a Chest X-ray to get the segmented lung image and diagnosis."
                    imgSrc="https://firebasestorage.googleapis.com/v0/b/orgseg-6bdbc.appspot.com/o/lung.jpeg?alt=media&token=d109248d-9260-4fb0-9946-8257c733f941"
                    href="/processLung"
                />
                <Card
                    title="Brain Tumor Prediction"
                    text="Upload a brain MRI scan to get the segmented lung image and diagnosis."
                    imgSrc="https://firebasestorage.googleapis.com/v0/b/orgseg-6bdbc.appspot.com/o/brain.jpeg?alt=media&token=90acbdb1-a179-4405-a0bc-6a99f84d4dda"
                    href="processBrain"
                />
                <Card
                    title="Other Medical Images"
                    text="Upload any other medical image to get the diagnosis."
                    imgSrc="https://firebasestorage.googleapis.com/v0/b/orgseg-6bdbc.appspot.com/o/other_image.jpeg?alt=media&token=2a6623fa-b352-456a-b93c-c5da14e376f3"
                    href="processReg"
                />
                <Card
                    title="Virtual Doctor"
                    text="Chat with a virtual doctor to get findings from symptoms."
                    imgSrc="https://firebasestorage.googleapis.com/v0/b/orgseg-6bdbc.appspot.com/o/qna.jpeg?alt=media&token=644ba18f-ca01-4355-afd6-d9540247ca3d"
                    href="/chat"
                />
                <Card
                    title="Mental Health Assistant"
                    text="Feel free to chat and destress. Ask any mental health related query."
                    imgSrc="https://firebasestorage.googleapis.com/v0/b/orgseg-6bdbc.appspot.com/o/mentalh.jpeg?alt=media&token=fd6782be-253d-4a01-8dbf-744a2c400469"
                    href="/mchat"
                />
            </div>
        </div>
    );
};

export default ServicesPage;