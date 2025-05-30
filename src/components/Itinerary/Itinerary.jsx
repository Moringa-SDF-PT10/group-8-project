import React, { useState, useEffect } from 'react';
import ItineraryItem from './ItineraryItem';
import AddItineraryItemForm from './AddItineraryItemForm';

function Itinerary ({ tripId }) {
  const [activities, setActivities] = useState ([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchItinerary() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('https://my-json-api-lnar.onrender.com/itinerary');
        if (!res.ok) throw new Error('Failed to fetch itinerary');
        const data = await res.json();
        setActivities(data);
      } catch (err) {
        setError(err.message);
      }  finally {
        setLoading(false);
      }    
    }
    fetchItinerary();
  },  [tripId]);

   async function handleAddActivity(newActivity) {
    try {
      const res = await fetch('https://my-json-api-lnar.onrender.com/itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newActivity),
      });

      if (!res.ok) throw new Error('Failed to add activity');
      const savedActivity = await res.json();
      setActivities((prev) => [...prev, savedActivity]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdateActivity(updatedActivity) {
    try {
      const res = await fetch(`https://my-json-api-lnar.onrender.com/itinerary/${updatedActivity.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedActivity),
      });

      if (!res.ok) throw new Error('Failed to update activity');
      const updatedData = await res.json();

      setActivities((prev) =>
        prev.map((act) => (act.id === updatedData.id ? updatedData : act))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteActivity(deletedActivityId) {
    try {
      const res = await fetch(`https://my-json-api-lnar.onrender.com/itinerary/${deletedActivityId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete activity');

      setActivities((prev) => prev.filter((act) => act.id !== deletedActivityId));
    } catch (err) {
      setError(err.message);
    }
  }

return (
    <div className="itinerary-container">
      <h2 className="itinerary-title">Trip Itinerary</h2>

      {loading && (
        <div className="loading-spinner-container">
          <div className="spinner"></div>
          <p className="loading-text">Loading itinerary...</p>
        </div>
      )}
      
      {error && <p className="error-text">Error: {error}</p>}

      {!loading && !error && (
        <>
          <button onClick={() => setShowForm(!showForm)} className="toggle-button">
            {showForm ? 'Hide New Activity Form' : '+ Add New Activity'}
          </button>

          {showForm && (
            <AddItineraryItemForm 
              tripId={tripId} 
              onAdd={(newActivity) => {
                handleAddActivity(newActivity);
                setShowForm(false);
           }} 
          />
         )}

          {activities.length === 0 ? (
            <p className="empty-message">No activities planned yet.</p>
          ) : (
            <ul className="itinerary-list">
              {activities.map((activity) => (
                <ItineraryItem
                  key={activity.id}
                  activity={activity}
                  onUpdate={handleUpdateActivity}
                  onDelete={handleDeleteActivity}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default Itinerary;