import React from 'react';

const DoctorCard = ({ doctor }) => {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doctor.name)}&query_place_id=${doctor.place_id}`;
  const photoUrl = doctor.photo_reference 
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${doctor.photo_reference}&key=YOUR_API_KEY`
    : 'https://via.placeholder.com/400x200?text=No+Image';

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img className="w-full h-48 object-cover" src={photoUrl} alt={doctor.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{doctor.name}</div>
        <p className="text-gray-700 text-base">{doctor.address}</p>
        {/* <p className="text-gray-700 text-base">{doctor.vicinity}</p> */}
        <p className="text-gray-700 text-base">Rating: {doctor.rating} ({doctor.user_ratings_total} reviews)</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <a 
          href={mapUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
        >
          View on Map
        </a>
      </div>
    </div>
  );
};

export default DoctorCard;