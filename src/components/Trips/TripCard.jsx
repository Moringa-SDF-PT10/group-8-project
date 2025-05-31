
import React from 'react';

const TripCard = ({ trip, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg cursor-pointer"
      onClick={() => onClick(trip.id)}
    >
      <h2 className="text-xl font-bold text-blue-800">{trip.name}</h2>
      <p className="text-gray-600">{trip.destination}</p>
      <p className="text-sm text-gray-500">Dates: {trip.startDate} - {trip.endDate}</p>
    </div>
  );
};

export default TripCard;
