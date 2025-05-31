import React, { useState } from 'react';
import TripList from './TripList';
import TripDetails from './TripDetails';
import JoinTripForm from './JoinTripForm';
import '../../styles/TripsPage.css';

const MyTripsPage = () => {
  const [trips, setTrips] = useState([
    {
      id: 1,
      name: "Paris Adventure",
      destination: "Paris, France",
      startDate: "2025-07-01",
      endDate: "2025-07-10",
      participants: ["Alice", "Bob", "Charlie"],
      code: "PARIS123",
    },
    {
      id: 2,
      name: "Beach Getaway",
      destination: "Bali, Indonesia",
      startDate: "2025-08-15",
      endDate: "2025-08-22",
      participants: ["Dana", "Eva", "Frank"],
      code: "BALI456",
    },
    {
      id: 3,
      name: "Mountain Hike",
      destination: "Rocky Mountains, USA",
      startDate: "2025-09-10",
      endDate: "2025-09-17",
      participants: ["George", "Hannah", "Ian"],
      code: "HIKE789",
    },
  ]);

  const [joinedTrips, setJoinedTrips] = useState([]); // List of joined trips
  const [selectedTripId, setSelectedTripId] = useState(null);

  const handleSelectTrip = (tripId) => {
    setSelectedTripId(tripId);
  };

  const handleJoinTrip = (tripCode) => {
    const trip = trips.find((t) => t.code.toLowerCase() === tripCode.toLowerCase());
    if (trip) {
      if (!joinedTrips.some((jt) => jt.id === trip.id)) {
        setJoinedTrips([...joinedTrips, trip]);
        alert(`Successfully joined trip: ${trip.name}`);
      } else {
        alert(`You've already joined this trip.`);
      }
    } else {
      alert(`No trip found with code: ${tripCode}`);
    }
  };

  const selectedTrip = trips.find((trip) => trip.id === selectedTripId);

  return (
    <div className="p-6 space-y-6 m-a">
      <h1 className="text- font-bold text-blue-800">My Trips</h1>

      {/* Join Trip Form */}
      <JoinTripForm onJoin={handleJoinTrip} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trip List */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">All Trips</h2>
          <TripList trips={joinedTrips.length > 0 ? joinedTrips : trips} onSelectTrip={handleSelectTrip} />
        </div>

        {/* Trip Details */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Trip Details</h2>
          <TripDetails trip={selectedTrip} />
        </div>
      </div>
    </div>
  );
};

export default MyTripsPage;
