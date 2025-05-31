// TripDetails.jsx
import React from 'react';

const TripDetails = ({ trip }) => {
  if (!trip) {
    return <p className="text-gray-600">Select a trip to see details.</p>;
  }

  return (
    <div className="details-container">
      <h2 className="trip-name">{trip.name}</h2>
      <p className="trip-destination">Destination: {trip.destination}</p>
      <p className="trip-date">Dates: {trip.startDate} - {trip.endDate}</p>
      <h3 className="trip-participants">Participants:</h3>
      <ul className="list-disc list-inside">
        {trip.participants.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default TripDetails;
