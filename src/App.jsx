//kiarie: Import useState for managing suggestions state
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/profile/ProtectedRoute";
import NavBar from "./components/profile/NavBar";
import LoginForm from "./components/profile/LoginForm";
import RegisterForm from "./components/profile/RegisterForm";
import ResetPasswordForm from "./components/profile/ResetPasswordForm";
import ProfileInfo from "./components/profile/ProfileInfo";
import "./styles/App.css";

//kiarie: Import voting components
import AddActivityForm from './components/voting/AddActivityForm';
import ActivitySuggestions from './components/voting/ActivitySuggestions';
//kiarie: Import the CSS for voting components (if you created voting.css)
// import './components/voting/voting.css'; // Make sure path is correct

//kiarie: Mock initial data for suggestions
const INITIAL_MOCK_SUGGESTIONS = [
    { id: 's1', name: 'Visit the Eiffel Tower', description: 'Iconic landmark in Paris.', suggestedBy: 'UserA', votes: 5 },
    { id: 's2', name: 'British Museum Tour', description: 'Explore history and culture.', suggestedBy: 'UserB', votes: 3 },
];

function App() {
  //kiarie: State for managing the list of suggestions
  const [mockSuggestions, setMockSuggestions] = useState(INITIAL_MOCK_SUGGESTIONS);

  //kiarie: Handler to add a new suggestion (will be passed to AddActivityForm)
  const handleAddSuggestion = (newSuggestionData) => {
      const newSuggestion = {
          ...newSuggestionData,
          id: `s${Date.now()}`, // Simple unique ID for mock
          suggestedBy: 'CurrentUser (Mock)', // Placeholder until auth is integrated
          votes: 0
      };
      setMockSuggestions(prevSuggestions => [newSuggestion, ...prevSuggestions]);
      console.log("App: Added new suggestion", newSuggestion);
  };

  //kiarie: Handler for voting (will be passed down to ActivitySuggestions -> Card -> VoteButton)
  // This part is for the NEXT iteration (Wiring up the Vote Button)
  // but we define the function here now.
  const handleVote = (suggestionId) => {
      setMockSuggestions(prevSuggestions =>
          prevSuggestions.map(s =>
              s.id === suggestionId ? { ...s, votes: (s.votes || 0) + 1 } : s
          )
      );
      console.log(`App: Voted for suggestion ID: ${suggestionId}`);
  };


  return (
    <AuthProvider>
      <div className="app">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<div className="page-content">Welcome to the Travel App!</div>} />
            <Route path="/about" element={<div className="page-content">About Us</div>} />
            <Route path="/contact" element={<div className="page-content">Contact Us</div>} />
            <Route
              path="/login"
              element={
                <div className="login-container">
                  <LoginForm />
                </div>
              }
            />
            <Route
              path="/register"
              element={
                <div className="login-container">
                  <RegisterForm />
                </div>
              }
            />
            <Route
              path="/reset-password"
              element={
                <div className="login-container">
                  <ResetPasswordForm />
                </div>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <div className="page-content">
                    <ProfileInfo />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/itinerary"
              element={
                <ProtectedRoute>
                  <div className="page-content">Itinerary Page</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <div className="page-content">Bookings Page</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <div className="page-content">Settings Page</div>
                </ProtectedRoute>
              }
            />

            {/* kiarie: New route for the voting system demo */}
            <Route
              path="/trip-activities-demo"
              element={
                // For now, let's not put it under ProtectedRoute for easy testing,
                // but eventually, activity planning would likely be protected.
                <div className="page-content"> {/* Using page-content for consistent styling */}
                  <h2>Activity Voting Demo</h2>
                  <AddActivityForm onAddSuggestion={handleAddSuggestion} />
                  {/* kiarie: Pass suggestions and the handleVote function to ActivitySuggestions */}
                  {/* kiarie: Note: for this iteration, handleVote is defined but not yet fully wired down to the button */}
                  <ActivitySuggestions
                    suggestions={mockSuggestions}
                    onVote={handleVote} // Pass handleVote here for the next iteration
                  />
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}

export default App;