import React from 'react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  return (
    <div className="bg-gradient-to-br from-green-200 to-blue-900 container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">
        email. orgseg@gmail.com
      </p>
      <p className="mb-4">
        PhoneNo. 9390983132.
      </p>
      <p className="mb-4">
        We strive to make the user experience as seamless as possible while providing accurate and relevant responses to your questions.
      </p>
      <p className="mb-4">
        Thank you for using OrgSeg! If you have any feedback or suggestions, feel free to reach out to us.
      </p>
    </div>
  );
};

export default ContactPage;
