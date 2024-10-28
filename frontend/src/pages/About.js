import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-br from-green-200 to-blue-900 container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">About OrgSeg</h1>
      <p>
        Introducing OrgSeg, your comprehensive solution for automating medical image analysis. Designed as a web application, OrgSeg revolutionizes the field by seamlessly integrating cutting-edge technologies to enhance efficiency and accuracy in medical imaging.

        At the heart of OrgSeg lies its robust image segmentation capabilities, powered by the state-of-the-art UNET transformer model. This advanced algorithm enables precise segmentation of various critical anatomical structures, including brain tumors, lungs, abdominal CT scans, and X-rays. Through meticulous segmentation, OrgSeg ensures that every detail in the medical images is accurately delineated, facilitating subsequent analysis and diagnosis.

        Following segmentation, OrgSeg employs deep learning models such as the renowned medical LLama-3 llm for further analysis and diagnosis. These sophisticated models leverage vast amounts of medical data to provide accurate and timely assessments, assisting healthcare professionals in making informed decisions.

        OrgSeg is not just about automating image analysis; it's about addressing real-world challenges. With a global shortage of radiologists and the exponential growth of medical imaging data, OrgSeg emerges as a vital tool in the healthcare landscape. By streamlining the process of image segmentation, processing, and diagnosis, OrgSeg empowers healthcare providers to manage the influx of medical data efficiently and effectively.

        But OrgSeg goes beyond traditional image-based diagnosis. With its innovative chat functionality, users can engage with a medical bot, providing symptoms and receiving accurate diagnoses without the need for images. This feature enhances accessibility to healthcare services, particularly in remote or underserved areas, facilitating timely interventions and improving patient outcomes.

        Whether you're a healthcare provider seeking to optimize workflow efficiency or an individual looking for reliable medical guidance, OrgSeg is your indispensable ally in the journey towards better healthcare delivery. With OrgSeg, the future of medical imaging and diagnosis is within reach.
      </p>
      <p className="mb-4">
        Thank you for using OrgSeg! If you have any feedback or suggestions, feel free to reach out to us.
      </p>
      <Link
    to="/contact"
    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center mt-5"
  >
    {/* <FaCommentDots className="mr-2" /> */}
    Contact Us
    </Link>
    </div>
    
  );
};

export default AboutPage;
