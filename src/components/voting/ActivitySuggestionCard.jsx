import React from 'react';
import VoteButton from './VoteButton';

const ActivitySuggestionCard = ({ suggestion, onVote, hasCurrentUserVoted }) => {
    if (!suggestion) return null;

    return (
        <div className="activity-suggestion-card">
            <h4>{suggestion.name}</h4>
            {suggestion.description && <p className="description">{suggestion.description}</p>}
            <p className="suggested-by">Suggested by: {suggestion.suggestedBy || 'Anonymous'}</p>
            <div className="vote-section">
                <span>Votes: {suggestion.votes || 0}</span>
                <VoteButton
                    suggestionId={suggestion.id}
                    onVote={onVote}
                    hasVoted={hasCurrentUserVoted}
                />
            </div>
        </div>
    );
};

export default ActivitySuggestionCard;