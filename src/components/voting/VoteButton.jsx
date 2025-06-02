import React, { useState, useEffect } from 'react';
// import './VoteButton.css';

// Mock API call
const mockRecordVoteApi = async (activityId, /* userId */) => {
    console.log(`MOCK API: Voted for activity ${activityId}`);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return { success: true };
};

const VoteButton = ({ activityId, initialVotes = 0 }) => {
    const [voteCount, setVoteCount] = useState(initialVotes);
    const [isLoading, setIsLoading] = useState(false);
    const [hasVotedLocal, setHasVotedLocal] = useState(false); // Simple local "voted once" state
    const [error, setError] = useState(null);


    useEffect(() => {
        setVoteCount(initialVotes);
    }, [initialVotes]);

    const handleVote = async () => {
        if (hasVotedLocal) {
            // alert("You've already voted for this activity."); // Or some other UI feedback
            return;
        }
        setIsLoading(true);
        setError(null);
        try {

            const response = await mockRecordVoteApi(activityId /*, 'mockUserId123' */);
            if (response.success) {
                setVoteCount(prevCount => prevCount + 1); // Optimistically increment
                setHasVotedLocal(true);
            } else {
                throw new Error("Vote failed (mock response)");
            }
        } catch (err) {
            console.error("Error voting:", err);
            setError(err.message || "Failed to record vote.");
            
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="vote-button-container" style={{ marginTop: '10px' }}>
            <button onClick={handleVote} disabled={isLoading || hasVotedLocal}>
                {isLoading ? 'Voting...' : hasVotedLocal ? `Voted (${voteCount})` : `Vote (${voteCount})`}
            </button>
            {error && <p style={{ color: 'red', fontSize: '0.8em', margin: '5px 0 0 0' }}>{error}</p>}
        </div>
    );
};

export default VoteButton;