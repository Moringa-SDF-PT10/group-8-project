import React, { useState } from 'react';

function AddItineraryItemForm ({ tripId, onAdd }) {
  const[formData, setFormData] = useState({
    name: '',
    time: '',
    description: '',
  });

  const [isAdding, setIsAdding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) {
      setError(null);
    }
  }

  async function handleSubmit(e) {
  e.preventDefault();

    if (!formData.name || !formData.time) {
      alert('Please fill in both name and time fields.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const newActivity = {
      tripId,
      ...formData,
    };

    try {
      await onAdd(newActivity);
      setFormData({ name: '', time: '', description: '' });
      setIsAdding(false);
    } catch (err) {
      setError(err.message || 'Failed to add activity.');
    } finally {
      setSubmitting(false);
    }
  }

 
if (!isAdding) {
  return <button className="button add" onClick={() => setIsAdding(true)}>+ Add Activity</button>;
  }

  return (
    <form onSubmit={handleSubmit} className="add-itinerary-form">
      <h4>Add New Activity</h4>
      {error && <p className="error-text">{error}</p>}

      <label htmlFor="name">Activity Name:</label>
      <input
        id="name"
        className="input-field"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter activity Name"
        required
        disabled={submitting}
      />

      <label htmlFor="time">Time:</label>
      <input
        id="time"
        className="input-field"
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange} 
        required
        disabled={submitting}
      />

      <label htmlFor="description">Description (optional):</label>
      <textarea
        id="description"
        className="textarea-field"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description of the activity"
        disabled={submitting}
      />
      <div className="button-group">
        <button type="submit" className="button save" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add Activity'}
        </button>
        <button
          type="button"
          className="button cancel"
          onClick={() => {
            setFormData({ name: '', time: '', description: '' });
            setIsAdding(false);
            setError(null);
          }}
          disabled={submitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddItineraryItemForm;


