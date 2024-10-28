// import React from 'react';

// const Card = ({ title, text, imgSrc, href }) => {
//     return (
//         <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-700">
//             <a href={href}>
//                 <img className="rounded-t-lg w-full h-50 object-cover" src={imgSrc} alt="" />
//             </a>
//             <div className="p-5">
//                 <a href={href}>
//                     <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{title}</h5>
//                 </a>
//                 <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{text}</p>
//                 <a href={href} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
//                     try
//                     <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
//                     </svg>
//                 </a>
//             </div>
//         </div>
//     );
// };

// export default Card;

import React from 'react';

const Card = ({ title, text, imgSrc, href }) => {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-700">
            <a href={href} className="block">
                {/* Add object-fit property to control image display */}
                <img className="rounded-t-lg w-full h-40 object-cover" src={imgSrc} alt="" style={{ objectFit: 'cover' }} />
            </a>
            <div className="p-5">
                <a href={href}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{text}</p>
                <a href={href} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Try Now
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default Card;
