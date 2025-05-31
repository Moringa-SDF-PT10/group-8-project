import React from 'react';
import ActivitySuggestionCard from './ActivitySuggestionCard';

const ActivitySuggestions = ({ suggestions, onVote, userVotes, currentUserIdentifier }) => {
    if (!suggestions || suggestions.length === 0) {
        return <p>No activity suggestions yet. Be the first to add one!</p>;
    }

    return (
        <div className="activity-suggestions-list">
            <h3>Suggested Activities</h3>
            {suggestions.map(suggestion => {
                const votesForThisSuggestion = userVotes ? userVotes[suggestion.id] || [] : [];
                const hasCurrentUserVoted = currentUserIdentifier ? votesForThisSuggestion.includes(currentUserIdentifier) : false;

                return (
                    <ActivitySuggestionCard
                        key={suggestion.id}
                        suggestion={suggestion}
                        onVote={onVote}
                        hasCurrentUserVoted={hasCurrentUserVoted}
                    />
                );
            })}
        </div>
    );
};

export default ActivitySuggestions;