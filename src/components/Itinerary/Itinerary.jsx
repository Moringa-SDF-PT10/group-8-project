import React, { useState, useEffect } from 'react';
import ItineraryItem from './ItineraryItem';
import AddItineraryItemForm from './AddItineraryItemForm';

function Itinerary ({ tripId , itinerary = [], onItineraryUpdate}) {
  const [activities, setActivities] = useState (itinerary);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const API_URL = 'https://my-json-api-lnar.onrender.com/itinerary';

   useEffect(() => {
        setActivities(itinerary);
    }, [itinerary]);

  useEffect(() => {
    async function fetchItinerary() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(API_URL);
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

   const handleAddActivity = async (newActivity) => {
    try {
      const res = await fetch(API_URL, {
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

  const handleUpdateActivity = async (updatedActivity) => {
    try {
      const res = await fetch(`${API_URL}/${updatedActivity.id}`, {
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

  const handleDeleteActivity = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete activity');

      setActivities((prev) => prev.filter((act) => act.id !== id));
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