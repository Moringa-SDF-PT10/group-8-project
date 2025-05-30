import { useState } from 'react'

import Itinerary from './components/Itinerary/Itinerary.jsx';

function App() {
  return (
    <div>
      <h1>Your Ultimate Travel Itinerary</h1>
      <Itinerary tripId={1} />
    </div>
  );
}

export default App;
