import React, { useState } from 'react';


function AddItineraryItemForm ({ tripId, onAdd , onCancel}) {
  const[formData, setFormData] = useState({
    name: '',
    time: '',
    description: '',
    day: '',
    location: '',
    tripId: tripId
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const {name, value} = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (error) 
      setError(null); 
  } 

  async function handleSubmit(e) {
  e.preventDefault();

    if (!formData.name || !formData.time) {
      alert('Please fill in both name and time fields.');
      return;
    }

    const newActivity = {
      tripId,
      ...formData,
    };

    setSubmitting(true);
    setError(null);

    try {
      await onAdd(newActivity);
      setFormData({
        name: '',
        time: '',
        description: '',
        day: '',
        location: '',
      });
    } catch (err) {
      setError(err.message || 'Failed to add activity.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-itinerary-form">
      <h4>Add New Activity</h4>
      {error && <p className="error-text"  style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

      <label htmlFor="day">Day:</label>
      <input
        type="number"
        name="day"
        value={formData.day}
        onChange={handleChange}
        placeholder="Day number"
        required
      />

      <label htmlFor="location">Location:</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        required
      />

      <label htmlFor="name">Activity Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Activity Name"
        required
      />

      <label htmlFor="time">Time:</label>
      <input
        type="text"
        name="time"
        value={formData.time}
        onChange={handleChange}
        placeholder="e.g., 10:00 AM"
        required
      />

      <label htmlFor="description">Description:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button
                    type="submit"
                    disabled={submitting}
                    style={{
                        padding: '8px 15px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    {submitting ? 'Adding...' : 'Add Activity'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    style={{
                        padding: '8px 15px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Cancel
                </button>
            </div>
    </form>
  );
}

export default AddItineraryItemForm;


