
import React from 'react';
import TripCard from './TripCard';

const TripList = ({ trips, onSelectTrip }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} onClick={onSelectTrip} />
      ))}
    </div>
  );
};

export default TripList;
