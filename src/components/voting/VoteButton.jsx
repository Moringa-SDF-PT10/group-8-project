import React from 'react';
// import './voting.css';

const VoteButton = ({ suggestionId, onVote }) => {
    const handleVote = () => {
        // Later, we'll call onVote here
        console.log(`Voting for suggestion ID: ${suggestionId}`);
        // onVote(suggestionId);
    };

    return (
        <button onClick={handleVote} className="vote-button">
            Vote
        </button>
    );
};

export default VoteButton;