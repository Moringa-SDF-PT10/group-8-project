import React, { useState } from 'react';

function AddItineraryItemForm ({ tripId, onAdd }) {
  const[formData, setFormData] = useState({
    name: '',
    time: '',
    description: '',
  });

  const [isAdding, setIsAdding] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name || !formData.time) {
      alert('Please fill in both name and time fields.');
      return;
    }

    const newActivity = {
      id: Date.now(),
      tripId,
      ...formData,
    };

    onAdd(newActivity);
    setFormData({ name: '', time: '', description: ''});
    setIsAdding(false);
}

if (!isAdding) {
  return <button onClick={() => setIsAdding(true)}>+ Add Activity</button>;
  }

  return (
    <form onSubmit={handleSubmit} className="add-itinerary-form">
      <h4>Add New Activity</h4>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Activity Name"
        required
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        placeholder="Time"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description (optional)"
      />
      <button type="submit">Add</button>
      <button type="button" onClick={() => setIsAdding(false)}>Cancel</button>
    </form>
  );
}

export default AddItineraryItemForm;


