import React, { useState, useEffect } from 'react';
import ItineraryItem from './ItineraryItem';
import AddItineraryItemForm from './AddItineraryItemForm';
import localActivities from '../../data/activities.json';


function Itinerary ({ tripId }) {

  const [activities, setActivities] = useState ([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItinerary() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('https://api.jsonbin.io/v3/b/683762448561e97a501cbdab');

        if (!res.ok) throw new Error ('Failed to fetch itinerary');

        const json = await res.json();
        const data = json.record;

        setActivities(data.activities || []);

      } catch (err) {
        console.warn('Using local data due to error:', err.message);
        setActivities(localActivities);
        setError(null);
      }  finally {
        setLoading(false);
      }    
    }
    fetchItinerary();
  },  [tripId])

  function handleAddActivity(newActivity) {
    setActivities((prev) => [...prev, newActivity]);
  }

  function handleUpdateActivity(updatedActivity) {
    setActivities((prev) =>
      prev.map((act) => (act.id === updatedActivity.id ? updatedActivity : act))
    );
  }

  function handleDeleteActivity(deletedActivityId) {
    setActivities((prev) => prev.filter((act) => act.id !== deletedActivityId));
  }
  
  if (loading) return <p>Loading itinerary...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="itinerary-container">
      <h2>Itinerary</h2>
      {activities.length === 0 && <p>No activities planned yet.</p>}
      <ul>
        {activities.map((activity) => (
          <ItineraryItem
            key={activity.id}
            activity={activity}
            onUpdate={handleUpdateActivity}
            onDelete={handleDeleteActivity}
          />
        ))}
      </ul>
      <AddItineraryItemForm tripId={tripId} onAdd={handleAddActivity} />
    </div>
  );
}

export default Itinerary;
