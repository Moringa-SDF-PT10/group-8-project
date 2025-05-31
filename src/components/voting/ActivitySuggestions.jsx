import React from 'react';
import ActivitySuggestionCard from './ActivitySuggestionCard';
// import './voting.css';

const ActivitySuggestions = ({ suggestions /*, onVote (will add later) */ }) => {
    if (!suggestions || suggestions.length === 0) {
        return <p>No activity suggestions yet. Be the first to add one!</p>;
    }

    return (
        <div className="activity-suggestions-list">
            <h3>Activity Suggestions</h3>
            {suggestions.map(suggestion => (
                <ActivitySuggestionCard
                    key={suggestion.id}
                    suggestion={suggestion}
                    // onVote={onVote}
                />
            ))}
        </div>
    );
};

export default ActivitySuggestions;