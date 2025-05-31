// Resolved App.jsx for merging 'main' into 'feature/activity-voting-system'

// Combine imports: Take all from HEAD, and add MyTripsPage from main if not already there implicitly
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Assumes AuthProvider wraps App in main.jsx
import ProtectedRoute from "./components/profile/ProtectedRoute";
import NavBar from "./components/profile/NavBar";
import LoginForm from "./components/profile/LoginForm";
import RegisterForm from "./components/profile/RegisterForm";
import ResetPasswordForm from "./components/profile/ResetPasswordForm";
import ProfileInfo from "./components/profile/ProfileInfo";
import MyTripsPage from "./components/Trips/MyTripsPage"; // This comes from 'main' branch changes
import "./styles/App.css"; // Your global app styles

// Imports for Voting System components and their CSS (from HEAD)
import AddActivityForm from './components/voting/AddActivityForm';
import ActivitySuggestions from './components/voting/ActivitySuggestions';
import './components/voting/voting.css'; // Voting specific styles

// Import Destination Suggestions component (from HEAD)
import DestinationSuggestions from './components/api_integration/DestinationSuggestions';
// import './components/api_integration/DestinationSuggestions.css'; // If you have this

const INITIAL_MOCK_SUGGESTIONS = [ // From HEAD
    { id: 's1', name: 'Visit the Eiffel Tower', description: 'Iconic landmark in Paris.', suggestedBy: 'UserA', votes: 5 },
    { id: 's2', name: 'British Museum Tour', description: 'Explore history and culture.', suggestedBy: 'UserB', votes: 3 },
];

function App() {
  // This part (state and handlers) seems to have been auto-merged correctly
  // as it was outside the explicit conflict blocks you pasted.
  // We ensure it uses 'user' from useAuth.
  const [mockSuggestions, setMockSuggestions] = useState(INITIAL_MOCK_SUGGESTIONS);
  const { user } = useAuth(); // This relies on AuthProvider in main.jsx
  const [userVotes, setUserVotes] = useState({});

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
      setMockSuggestions(prev => prev.map(s => s.id === suggestionId ? { ...s, votes: Math.max(0, (s.votes || 0) - 1) } : s));
      setUserVotes(prev => ({ ...prev, [suggestionId]: votesForThisSuggestion.filter(email => email !== user.email) }));
      console.log(`App.jsx: ${user.name} UNVOTED for suggestion ID: ${suggestionId}`);
    } else {
      setMockSuggestions(prev => prev.map(s => s.id === suggestionId ? { ...s, votes: (s.votes || 0) + 1 } : s));
      setUserVotes(prev => ({ ...prev, [suggestionId]: [...votesForThisSuggestion, user.email] }));
      console.log(`App.jsx: ${user.name} VOTED for suggestion ID: ${suggestionId}`);
    }
  };

  return (
    // We choose the structure from HEAD here, which does NOT include <AuthProvider>
    // as AuthProvider is handled in main.jsx
    <div className="app">
      <NavBar />
      <main className="main-content">
        <Routes>
          {/* Common routes present in both HEAD and main */}
          <Route path="/" element={<div className="page-content">Welcome to the Travel App!</div>} />
          <Route path="/about" element={<div className="page-content">About Us</div>} />
          <Route path="/contact" element={<div className="page-content">Contact Us</div>} />
          <Route path="/login" element={<div className="login-container"><LoginForm /></div>} />
          <Route path="/register" element={<div className="login-container"><RegisterForm /></div>} />
          <Route path="/reset-password" element={<div className="login-container"><ResetPasswordForm /></div>} />
          <Route path="/profile" element={<ProtectedRoute><div className="page-content"><ProfileInfo /></div></ProtectedRoute>} />

          {/* Route for MyTripsPage (from main branch) */}
          <Route path="/trips" element={
            <ProtectedRoute>
              <MyTripsPage />
            </ProtectedRoute>
            }
          />

          {/* Other common routes */}
          <Route path="/itinerary" element={<ProtectedRoute><div className="page-content">Itinerary Page</div></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><div className="page-content">Bookings Page</div></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><div className="page-content">Settings Page</div></ProtectedRoute>} />

          {/* Route combining Destination Suggestions and Voting System (from HEAD) */}
          <Route
            path="/trip-activities-demo"
            element={
              <div className="page-content">
                <section className="destination-suggestions-section" style={{ marginBottom: '40px' }}>
                  <h2>Find Destination Ideas</h2>
                  <DestinationSuggestions />
                </section>
                <hr style={{margin: "20px 0", borderColor: "#555"}} />
                <section className="activity-voting-section">
                  <h2>Activity Voting Demo</h2> {/* Changed heading slightly from your HEAD for clarity */}
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