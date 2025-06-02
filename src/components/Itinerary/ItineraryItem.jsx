import React, { useState, useEffect } from 'react';
import VoteButton from '../voting/VoteButton'; // kiarie

function ItineraryItem({ activity, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: activity.name,
    time: activity.time,
    description: activity.description || '',
    day: activity.day || '',
    location: activity.location || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFormData({
      name: activity.name,
      time: activity.time,
      description: activity.description || '',
      day: activity.day || '',
      location: activity.location || '',
    });
  }, [activity]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    if (!formData.name || !formData.time) {
      setError('Please fill in both name and time fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://my-json-api-lnar.onrender.com/itinerary/${activity.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...activity, ...formData }),
      });

      if (!res.ok) throw new Error('Failed to update activity.');

      const updatedActivity = await res.json();
      onUpdate(updatedActivity);
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to update activity.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this activity?')) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://my-json-api-lnar.onrender.com/itinerary/${activity.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete activity.');

      onDelete(activity.id);
    } catch (err) {
      setError(err.message || 'Error deleting activity.');
    } finally {
      setLoading(false);
    }
  }

  if (isEditing) {
    return (
      <li className="itinerary-item editing">
        {error && <p className="error-text">{error}</p>}

        <input
          name="day"
          className="input-field"
          type="number"
          value={formData.day}
          onChange={handleChange}
          placeholder="Day Number"
          disabled={loading}
        />
        <input
          name="location"
          className="input-field"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          disabled={loading}
        />
        <input
          name="name"
          className="input-field"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Activity Name"
          required
          disabled={loading}
        />
        <input
          name="time"
          className="input-field"
          type="text"
          value={formData.time}
          onChange={handleChange}
          placeholder="Time (e.g., 10:00 AM)"
          required
          disabled={loading}
        />
        <textarea
          name="description"
          className="textarea-field"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          disabled={loading}
        />

        <div className="button-group">
          <button onClick={handleSave} disabled={loading || !formData.name || !formData.time}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            className="cancel-button"
            onClick={() => {
              setFormData({
                name: activity.name,
                time: activity.time,
                description: activity.description || '',
                day: activity.day || '',
                location: activity.location || '',
              });
              setIsEditing(false);
              setError(null);
            }}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="itinerary-item">
      {error && <p className="error-text">{error}</p>}

      <h3 className="item-day-location">
        Day {activity.day} - {activity.location}
      </h3>
      <h4 className="item-title">
        {activity.name} <small className="item-time">at {activity.time}</small>
      </h4>
      <p className="item-description">{activity.description}</p>

      <div className="button-group">
        <button className="btn edit-btn" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="btn delete-btn" onClick={handleDelete} disabled={loading}>
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>

      {/* kiarie */}
      <VoteButton
        activityId={activity.id}
        initialVotes={activity.votes || 0}
      />
      {/* kiarie */}
    </li>
  );
}

export default ItineraryItem;