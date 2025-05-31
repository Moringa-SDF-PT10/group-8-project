import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Assumes AuthProvider wraps App in main.jsx
import ProtectedRoute from "./components/profile/ProtectedRoute";
import NavBar from "./components/profile/NavBar";
import LoginForm from "./components/profile/LoginForm";
import RegisterForm from "./components/profile/RegisterForm";
import ResetPasswordForm from "./components/profile/ResetPasswordForm";
import ProfileInfo from "./components/profile/ProfileInfo";
import "./styles/App.css"; // Your global app styles

// Import Voting System components and their CSS
import AddActivityForm from './components/voting/AddActivityForm';
import ActivitySuggestions from './components/voting/ActivitySuggestions';
import './components/voting/voting.css'; // Voting specific styles

// Import Destination Suggestions component and its CSS (if any)
import DestinationSuggestions from './components/api_integration/DestinationSuggestions';
// Assuming DestinationSuggestions.css is imported within its own file or you can import here:
// import './components/api_integration/DestinationSuggestions.css';

const INITIAL_MOCK_SUGGESTIONS = [
    { id: 's1', name: 'Visit the Eiffel Tower', description: 'Iconic landmark in Paris.', suggestedBy: 'UserA', votes: 5 },
    { id: 's2', name: 'British Museum Tour', description: 'Explore history and culture.', suggestedBy: 'UserB', votes: 3 },
];

function App() {
  const [mockSuggestions, setMockSuggestions] = useState(INITIAL_MOCK_SUGGESTIONS);
  const { user } = useAuth();
  const [userVotes, setUserVotes] = useState({}); // Tracks { suggestionId: [userEmail1, userEmail2] }

  const handleAddSuggestion = (newSuggestionData) => {
    const suggesterName = user ? user.name : 'Anonymous';
    const newSuggestion = {
        ...newSuggestionData,
        id: `s${Date.now()}`,
        suggestedBy: suggesterName,
        votes: 0
    };
    setMockSuggestions(prevSuggestions => [newSuggestion, ...prevSuggestions]);
    console.log("App.jsx: New suggestion added by", suggesterName, newSuggestion);
  };

  const handleVote = (suggestionId) => {
    if (!user || !user.email) {
      alert("Please log in to vote or unvote.");
      return;
    }

    const votesForThisSuggestion = userVotes[suggestionId] || [];
    const hasVoted = votesForThisSuggestion.includes(user.email);

    if (hasVoted) {
      // Un-vote logic
      setMockSuggestions(prevSuggestions =>
        prevSuggestions.map(s =>
          s.id === suggestionId ? { ...s, votes: Math.max(0, (s.votes || 0) - 1) } : s
        )
      );
      setUserVotes(prevUserVotes => ({
        ...prevUserVotes,
        [suggestionId]: votesForThisSuggestion.filter(email => email !== user.email)
      }));
      console.log(`App.jsx: ${user.name} UNVOTED for suggestion ID: ${suggestionId}`);
    } else {
      // Vote logic
      setMockSuggestions(prevSuggestions =>
        prevSuggestions.map(s =>
          s.id === suggestionId ? { ...s, votes: (s.votes || 0) + 1 } : s
        )
      );
      setUserVotes(prevUserVotes => ({
        ...prevUserVotes,
        [suggestionId]: [...votesForThisSuggestion, user.email]
      }));
      console.log(`App.jsx: ${user.name} VOTED for suggestion ID: ${suggestionId}`);
    }
  };

  return (
    <div className="app">
      <NavBar />
      <main className="main-content">
        <Routes>
          {/* Your existing application routes */}
          <Route path="/" element={<div className="page-content">Welcome to the Travel App!</div>} />
          <Route path="/about" element={<div className="page-content">About Us</div>} />
          <Route path="/contact" element={<div className="page-content">Contact Us</div>} />
          <Route path="/login" element={<div className="login-container"><LoginForm /></div>} />
          <Route path="/register" element={<div className="login-container"><RegisterForm /></div>} />
          <Route path="/reset-password" element={<div className="login-container"><ResetPasswordForm /></div>} />
          <Route path="/profile" element={<ProtectedRoute><div className="page-content"><ProfileInfo /></div></ProtectedRoute>} />
          <Route path="/itinerary" element={<ProtectedRoute><div className="page-content">Itinerary Page</div></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><div className="page-content">Bookings Page</div></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><div className="page-content">Settings Page</div></ProtectedRoute>} />

          {/* Route combining Destination Suggestions and Voting System */}
          <Route
            path="/trip-activities-demo"
            element={
              <div className="page-content">

                {/* Section for Destination Suggestions */}
                <section className="destination-suggestions-section" style={{ marginBottom: '40px' }}>
                  <h2>Find Destination Ideas</h2>
                  <DestinationSuggestions />
                </section>

                <hr style={{margin: "20px 0", borderColor: "#555"}} /> {/* Visual separator */}

                {/* Section for Activity Voting */}
                <section className="activity-voting-section">
                  <h2>Activity Voting Demo</h2>
                  {user && <p style={{ textAlign: 'center', color: 'lightgreen', fontWeight: 'bold' }}>User: {user.name}</p>}
                  {!user && <p style={{ textAlign: 'center', color: 'orange' }}>Please log in to participate in voting.</p>}
                  <AddActivityForm onAddSuggestion={handleAddSuggestion} />
                  <ActivitySuggestions
                    suggestions={mockSuggestions}
                    onVote={handleVote}
                    userVotes={userVotes}
                    currentUserIdentifier={user ? user.email : null}
                  />
                </section>

              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;