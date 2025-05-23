// import React from 'react';

// const Header = () => {
//   return (
//     <header className="bg-gray-600 py-4 px-6 flex items-center justify-between">
//       <h1 className="text-white text-2xl font-bold">
//         <a href='/'>OrgSeg</a>
//       </h1>
//       <nav>
//         <ul className="flex space-x-4 text-white">
//           <li>
//             <a href="/" className="hover:text-gray-200">Home</a>
//           </li>
//           <li>
//             <a href="/about" className="hover:text-gray-200">About</a>
//           </li>
//           <li>
//             <a href="/contact" className="hover:text-gray-200">Contact</a>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleNavbar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
//       <div id='OrgSeg-img' className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
//           <img src="C:/Users/visha/Desktop/ml/frontend/src/components/OrgSeg.png"  className="h-8" alt="OrgSeg"/>
//           <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">OrgSeg</span>
//         </a>
//         <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
//           <button
//             type="button"
//             onClick={() => navigate('/chat')}
//             className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
//           >
//             Get started
//           </button>
//           <button
//             data-collapse-toggle="navbar-sticky"
//             type="button"
//             className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//             aria-controls="navbar-sticky"
//             aria-expanded={isOpen ? 'true' : 'false'}
//             onClick={toggleNavbar}
//           >
//             <span className="sr-only">Open main menu</span>
//             <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
//             </svg>
//           </button>
//         </div>
//         <div className={`items-center justify-between ${isOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
//           <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//             <li>
//               <a href="/" className="block py-2 px-3 text-white bg-gray-900 rounded md:bg-transparent md:text-green-700 md:p-0 md:dark:text-green-500" >Home</a>
//             </li>
//             <li>
//               <a href="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
//             </li>
//             <li>
//               <a href="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
//             </li>
//             <li>
//               <a href="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;



const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://firebasestorage.googleapis.com/v0/b/orgseg-6bdbc.appspot.com/o/OrgSeggggg.png?alt=media&token=2c24e0fc-9ddf-4f69-a104-0d09883482b6" className="h-8" alt="OrgSeg" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">OrgSeg</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            onClick={() => navigate('/services')}
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Get started
          </button>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen ? 'true' : 'false'}
            onClick={toggleNavbar}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className={`items-center justify-between ${isOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => `block py-2 px-3 rounded md:p-0 ${isActive ? 'text-white bg-gray-900 md:bg-transparent md:text-green-700 dark:text-green-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 dark:hover:text-white dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700'}`}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => `block py-2 px-3 rounded md:p-0 ${isActive ? 'text-white bg-gray-900 md:bg-transparent md:text-green-700 dark:text-green-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 dark:hover:text-white dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700'}`}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={({ isActive }) => `block py-2 px-3 rounded md:p-0 ${isActive ? 'text-white bg-gray-900 md:bg-transparent md:text-green-700 dark:text-green-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 dark:hover:text-white dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700'}`}
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => `block py-2 px-3 rounded md:p-0 ${isActive ? 'text-white bg-gray-900 md:bg-transparent md:text-green-700 dark:text-green-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 dark:hover:text-white dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700'}`}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
