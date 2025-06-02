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
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setVoteCount(initialVotes);
  }, [initialVotes]);

  const handleVoteToggle = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (hasVoted) {
        // Handle Unvote
        const response = await mockUnvoteApi(activityId);
        if (response.success) {
          setVoteCount(prev => Math.max(0, prev - 1));
          setHasVoted(false);
        } else {
          throw new Error("Unvote failed (mock response)");
        }
      } else {
        // Handle Vote
        const response = await mockRecordVoteApi(activityId);
        if (response.success) {
          setVoteCount(prev => prev + 1);
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

  const buttonStyleBase = {
    padding: '8px 15px',
    margin: '5px 0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  };

  const styles = {
    default: { ...buttonStyleBase, backgroundColor: '#007bff', color: 'white' },  // Blue
    voted: { ...buttonStyleBase, backgroundColor: '#28a745', color: 'white' },    // Green
    loading: { ...buttonStyleBase, backgroundColor: '#6c757d', color: 'white', cursor: 'not-allowed' }, // Grey
  };

  return (
    <div
      className="vote-button-container"
      style={{ marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
    >
      <button
        onClick={handleVoteToggle}
        disabled={isLoading}
        style={isLoading ? styles.loading : (hasVoted ? styles.voted : styles.default)}
      >
        {isLoading
          ? 'Processing...'
          : hasVoted
          ? `Unvote (${voteCount})`
          : `Vote (${voteCount})`}
      </button>
      {error && (
        <p style={{ color: 'red', fontSize: '0.8em', margin: '5px 0 0 0' }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default VoteButton;