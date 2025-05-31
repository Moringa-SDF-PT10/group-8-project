import React, { useState } from 'react';

const JoinTripForm = ({ onJoin }) => {
  const [tripCode, setTripCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tripCode) {
      onJoin(tripCode);
      setTripCode('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <label className="block text-gray-700 font-medium mb-2">
        Enter Trip Code:
      </label>
      <input
        type="text"
        value={tripCode}
        onChange={(e) => setTripCode(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
        placeholder="e.g. TRIP123"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Join Trip
      </button>
    </form>
  );
};

export default JoinTripForm;
