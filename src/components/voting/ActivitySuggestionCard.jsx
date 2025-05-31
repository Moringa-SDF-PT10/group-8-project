import React from 'react';
// import VoteButton from './VoteButton'; // Will uncomment later
// import './voting.css';

const ActivitySuggestionCard = ({ suggestion /*, onVote (will add later) */ }) => {
    if (!suggestion) return null;

    return (
        <div className="activity-suggestion-card">
            <h4>{suggestion.name}</h4>
            {suggestion.description && <p>{suggestion.description}</p>}
            <p>Suggested by: {suggestion.suggestedBy || "Anonymous"}</p>
            <p>Votes: {suggestion.votes || 0}</p>
            {/* <VoteButton suggestionId={suggestion.id} onVote={onVote} /> */}
        </div>
    );
};

export default ActivitySuggestionCard;