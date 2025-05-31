
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


import AddActivityForm from './components/voting/AddActivityForm';
import ActivitySuggestions from './components/voting/ActivitySuggestions';

const INITIAL_MOCK_SUGGESTIONS = [
    { id: 's1', name: 'Visit the Eiffel Tower', description: 'Iconic landmark in Paris.', suggestedBy: 'UserA', votes: 5 },
    { id: 's2', name: 'British Museum Tour', description: 'Explore history and culture.', suggestedBy: 'UserB', votes: 3 },
];

function App() {

  const [mockSuggestions, setMockSuggestions] = useState(INITIAL_MOCK_SUGGESTIONS);

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

                  <ActivitySuggestions
                    suggestions={mockSuggestions}
                    onVote={handleVote}
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