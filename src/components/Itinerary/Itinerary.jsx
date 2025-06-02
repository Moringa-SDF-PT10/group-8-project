import React, { useState, useEffect } from 'react';
import ItineraryItem from './ItineraryItem';
import AddItineraryItemForm from './AddItineraryItemForm';

function Itinerary({ tripId, itinerary = [], onItineraryUpdate }) {
  const [activities, setActivities] = useState(itinerary);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const API_URL = 'https://my-json-api-lnar.onrender.com/itinerary';

  useEffect(() => {
    async function fetchItinerary() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch itinerary');

        const data = await res.json();

        // Filter by tripId
        const filteredData = data.filter(item => item.tripId === tripId);

        setActivities(filteredData);
        onItineraryUpdate(filteredData);
      } catch (err) {
        setError(err.message);
        setActivities([]);
        onItineraryUpdate([]);
      } finally {
        setLoading(false);
      }
    }

    if (tripId) {
      fetchItinerary();
    }
  }, [tripId, onItineraryUpdate]);

  const handleAddActivity = async (newActivity) => {
    try {
      const activityToAdd = {
        ...newActivity,
        tripId,
      };

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activityToAdd),
      });

      if (!res.ok) throw new Error('Failed to add activity');

      const savedActivity = await res.json();
      const updatedActivities = [...activities, savedActivity];
      setActivities(updatedActivities);
      onItineraryUpdate(updatedActivities);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateActivity = async (updatedActivity) => {
    try {
      const res = await fetch(`${API_URL}/${updatedActivity.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedActivity),
      });

      if (!res.ok) throw new Error('Failed to update activity');

      const updatedData = await res.json();
      const updatedList = activities.map(act =>
        act.id === updatedData.id ? updatedData : act
      );
      setActivities(updatedList);
      onItineraryUpdate(updatedList);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteActivity = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete activity');

      const updatedList = activities.filter(act => act.id !== id);
      setActivities(updatedList);
      onItineraryUpdate(updatedList);
    } catch (err) {
      setError(err.message);
    }
  };

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
          <button
            onClick={() => setShowForm(!showForm)}
            className="toggle-button"
          >
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