import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4 px-6 text-white text-center">
      <p>&copy; {new Date().getFullYear()} OrgSeg All rights reserved.</p>
    </footer>
  );
};

export default Footer;
