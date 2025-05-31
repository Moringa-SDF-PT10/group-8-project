import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/profile/ProtectedRoute"
import NavBar from "./components/profile/NavBar"
import LoginForm from "./components/profile/LoginForm"
import RegisterForm from "./components/profile/RegisterForm"
import ResetPasswordForm from "./components/profile/ResetPasswordForm"
import ProfileInfo from "./components/profile/ProfileInfo"
import "./styles/App.css"

function App() {
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
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}

//export default App



//votting jsx
import React, { useState } from 'react'; // Add useState
// import './App.css';
import DestinationSuggestions from './components/api_integration/DestinationSuggestions'; // Keep this if you want

// Import voting components
import AddActivityForm from './components/voting/AddActivityForm';
import ActivitySuggestions from './components/voting/ActivitySuggestions';

// Mock initial data for suggestions (will eventually come from backend/context)
const INITIAL_MOCK_SUGGESTIONS = [
    { id: 's1', name: 'Visit the Eiffel Tower', description: 'Iconic landmark in Paris.', suggestedBy: 'UserA', votes: 5 },
    { id: 's2', name: 'British Museum Tour', description: 'Explore history and culture.', suggestedBy: 'UserB', votes: 3 },
];


function App() {
    const [mockSuggestions, setMockSuggestions] = useState(INITIAL_MOCK_SUGGESTIONS);

    // Handler to add a new suggestion (will be passed to AddActivityForm)
    const handleAddSuggestion = (newSuggestionData) => {
        // In a real app, this would be an API call.
        // For mock, we generate an ID and add to local state.
        const newSuggestion = {
            ...newSuggestionData,
            id: `s${Date.now()}`, // Simple unique ID for mock
            suggestedBy: 'CurrentUser (Mock)', // Placeholder
            votes: 0
        };
        setMockSuggestions(prevSuggestions => [newSuggestion, ...prevSuggestions]);
        console.log("App: Added new suggestion", newSuggestion);
    };

    // Handler for voting (will be passed down to ActivitySuggestions -> Card -> VoteButton)
    const handleVote = (suggestionId) => {
        // In a real app, this would be an API call.
        // For mock, we update local state.
        setMockSuggestions(prevSuggestions =>
            prevSuggestions.map(s =>
                s.id === suggestionId ? { ...s, votes: (s.votes || 0) + 1 } : s
            )
        );
        console.log(`App: Voted for suggestion ID: ${suggestionId}`);
    };


    return (
        <div className="App">
            <header className="App-header">
                <h1>Trip Planner App (SPA)</h1>
            </header>
            <main>
                <DestinationSuggestions />
                <hr /> {/* Separator */}
                <h2>Voting System Demo</h2>
                <AddActivityForm onAddSuggestion={handleAddSuggestion} />
                <ActivitySuggestions suggestions={mockSuggestions} /* onVote={handleVote} will be passed later */ />
            </main>
        </div>
    );
}

export default App;