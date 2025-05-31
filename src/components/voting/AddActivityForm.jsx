import React, { useState } from 'react';
// import './voting.css'; // We'll uncomment later

const AddActivityForm = ({ onAddSuggestion }) => { // onAddSuggestion will be a prop to lift state up
    const [activityName, setActivityName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!activityName.trim()) {
            alert("Activity name is required!");
            return;
        }
        // Later, we'll call onAddSuggestion here
        console.log("Submitting new activity:", { name: activityName, description });
        setActivityName('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="add-activity-form">
            <h3>Suggest New Activity</h3>
            <div>
                <label htmlFor="activityName">Activity Name:</label>
                <input
                    type="text"
                    id="activityName"
                    value={activityName}
                    onChange={(e) => setActivityName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="activityDescription">Description (Optional):</label>
                <textarea
                    id="activityDescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type="submit">Suggest Activity</button>
        </form>
    );
};

export default AddActivityForm;