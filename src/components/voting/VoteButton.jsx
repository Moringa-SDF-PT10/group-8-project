import React, { useState, useEffect } from 'react';

// Mock API calls
const mockRecordVoteApi = async (activityId /*, userId */) => {
    console.log(`MOCK API: Voted for activity ${activityId}`);
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
};

const mockUnvoteApi = async (activityId /*, userId */) => {
    console.log(`MOCK API: Unvoted for activity ${activityId}`);
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
};

const VoteButton = ({ activityId, initialVotes = 0 }) => {
    const [voteCount, setVoteCount] = useState(initialVotes);
    const [isLoading, setIsLoading] = useState(false);
    const [hasVoted, setHasVoted] = useState(false); // Renamed for clarity
    const [error, setError] = useState(null);

    useEffect(() => {
        setVoteCount(initialVotes);
    }, [initialVotes]);

    const handleVoteToggle = async () => {
        setIsLoading(true);
        setError(null);

        try {
            if (hasVoted) {
                // --- Handle Unvote ---
                const response = await mockUnvoteApi(activityId /*, 'mockUserId123' */);
                if (response.success) {
                    setVoteCount(prevCount => Math.max(0, prevCount - 1)); // Ensure votes don't go negative
                    setHasVoted(false);
                } else {
                    throw new Error("Unvote failed (mock response)");
                }
            } else {
                // --- Handle Vote ---
                const response = await mockRecordVoteApi(activityId /*, 'mockUserId123' */);
                if (response.success) {
                    setVoteCount(prevCount => prevCount + 1);
                    setHasVoted(true);
                } else {
                    throw new Error("Vote failed (mock response)");
                }
            }
        } catch (err) {
            console.error("Error voting/unvoting:", err);
            setError(err.message || "Failed to process vote.");
        } finally {
            setIsLoading(false);
        }
    };

    // --- Styling ---
    const buttonStyle = {
        padding: '8px 15px',
        margin: '5px 0',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.2s ease, color 0.2s ease',
    };

    const defaultButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#007bff', // Blue
        color: 'white',
    };

    const votedButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#28a745', // Green
        color: 'white',
    };

    const loadingButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#6c757d', // Grey
        color: 'white',
        cursor: 'not-allowed',
    };

    return (
        <div className="vote-button-container" style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <button
                onClick={handleVoteToggle}
                disabled={isLoading}
                style={isLoading ? loadingButtonStyle : (hasVoted ? votedButtonStyle : defaultButtonStyle)}
            >
                {isLoading
                    ? 'Processing...'
                    : hasVoted
                        ? `Unvote (${voteCount})` // Text changes to Unvote
                        : `Vote (${voteCount})`}
            </button>
            {error && <p style={{ color: 'red', fontSize: '0.8em', margin: '5px 0 0 0' }}>{error}</p>}
        </div>
    );
};

export default VoteButton;