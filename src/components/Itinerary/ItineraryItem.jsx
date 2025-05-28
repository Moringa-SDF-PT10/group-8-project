import React, { useState, useEffect } from 'react';

function ItineraryItem({ activity, onUpdate, onDelete}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: activity.name,
    time: activity.time,
    description: activity.description,
  });

  useEffect(() => {
    setFormData({
      name: activity.name,
      time: activity.time,
      description: activity.description,
    });
  }, [activity]);

  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value });
  }

  function handleSave() {
    if (!formData.name || !formData.time) {
      alert('Please fill in both name and time fields.');
      return;
    }
    const updatedActivity = { ...activity, ...formData };
    onUpdate(updatedActivity);
    setIsEditing(false);
  }
  
  function handleDelete() {
    if (window.confirm ('Are you sure you want to delete this activity')) {
      onDelete(activity.id);

    }
  }

  if (isEditing) {
    return (
      <li className="itinerary-item editing">
        <input
        name="name"
        value={formData.name}
          onChange={handleChange}
          placeholder="Activity Name"
        />
        <input
          name="time"
          value={formData.time}
          onChange={handleChange}
          placeholder="Time (e.g. 10:00 AM)"
          type="time"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button onClick={handleSave} disabled={!formData.name || !formData.time}>
        Save
      </button>
      
        <button
          onClick={() => {
            setFormData({
              name: activity.name,
              time: activity.time,
              description: activity.description,
            });
            setIsEditing(false);
          }}
        >
          Cancel
        </button>
      </li>
    );
  }

  return (
    <li className="itinerary-item">
      <h4>
        {activity.name} <small>at {activity.time}</small>
      </h4>
      <p>{activity.description}</p>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default ItineraryItem;