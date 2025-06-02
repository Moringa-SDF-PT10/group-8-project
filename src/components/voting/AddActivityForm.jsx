import React, { useState } from 'react';
// import './voting.css';

const AddActivityForm = ({ onAddSuggestion }) => {
    const [activityName, setActivityName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!activityName.trim()) {
            alert("Activity name is required!");
            return;
        }

        console.log("AddActivityForm: Submitting new activity:", { name: activityName, description });
        if (typeof onAddSuggestion === 'function') {
            onAddSuggestion({ name: activityName, description: description.trim() });
        } else {
            console.error("AddActivityForm: onAddSuggestion prop is not a function!");
        }

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