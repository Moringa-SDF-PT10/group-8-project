import React from 'react';


const VoteButton = ({ suggestionId, onVote, hasVoted }) => {
    const handleVoteClick = () => {
        if (typeof onVote === 'function') {
            onVote(suggestionId);
        }
    };

    return (
        <button
            onClick={handleVoteClick}
            className={`vote-button ${hasVoted ? 'voted' : ''}`}
            // Button is no longer disabled, so user can click to un-vote
        >
            {hasVoted ? 'Unvote' : 'Vote'} {/* Changed text when voted */}
        </button>
    );
};

export default VoteButton;