import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/profile/ProtectedRoute";
import NavBar from "./components/profile/NavBar";
import LoginForm from "./components/profile/LoginForm";
import RegisterForm from "./components/profile/RegisterForm";
import ResetPasswordForm from "./components/profile/ResetPasswordForm";
import ProfileInfo from "./components/profile/ProfileInfo";
import MyTripsPage from "./components/Trips/MyTripsPage";
import JoinedTripsPage from './components/Trips/JoinedTripsPage';
import TripDetailPage from './components/Trips/TripDetailPage';
import HomePage from "./components/home/Hompage";
import "./styles/App.css";

import AddActivityForm from './components/voting/AddActivityForm';
import ActivitySuggestions from './components/voting/ActivitySuggestions';
import './components/voting/voting.css';

import DestinationSuggestions from './components/api_integration/DestinationSuggestions';

import Itinerary from './components/Itinerary/Itinerary.jsx';

const INITIAL_MOCK_SUGGESTIONS = [
  { id: 's1', name: 'Visit the Eiffel Tower', description: 'Iconic landmark in Paris.', suggestedBy: 'UserA', votes: 5 },
  { id: 's2', name: 'British Museum Tour', description: 'Explore history and culture.', suggestedBy: 'UserB', votes: 3 },
];

function App() {
  const [mockSuggestions, setMockSuggestions] = useState(INITIAL_MOCK_SUGGESTIONS);
  const { user } = useAuth();
  const [userVotes, setUserVotes] = useState({});
  const [joinedTrips, setJoinedTrips] = useState([]);

  const handleAddSuggestion = (newSuggestionData) => {
    const suggesterName = user ? user.name : 'Anonymous';
    const newSuggestion = {
      ...newSuggestionData,
      id: `s${Date.now()}`,
      suggestedBy: suggesterName,
      votes: 0
    };
    setMockSuggestions(prevSuggestions => [newSuggestion, ...prevSuggestions]);
  };

  const handleVote = (suggestionId) => {
    if (!user || !user.email) {
      alert("Please log in to vote or unvote.");
      return;
    }
    const votesForThisSuggestion = userVotes[suggestionId] || [];
    const hasVoted = votesForThisSuggestion.includes(user.email);

    if (hasVoted) {
      setMockSuggestions(prev =>
        prev.map(s =>
          s.id === suggestionId ? { ...s, votes: Math.max(0, (s.votes || 0) - 1) } : s
        )
      );
      setUserVotes(prev => ({
        ...prev,
        [suggestionId]: votesForThisSuggestion.filter(email => email !== user.email)
      }));
    } else {
      setMockSuggestions(prev =>
        prev.map(s =>
          s.id === suggestionId ? { ...s, votes: (s.votes || 0) + 1 } : s
        )
      );
      setUserVotes(prev => ({
        ...prev,
        [suggestionId]: [...votesForThisSuggestion, user.email]
      }));
    }
  };

  useEffect(() => {
    const savedTrips = localStorage.getItem('joinedTrips');
    if (savedTrips) {
      setJoinedTrips(JSON.parse(savedTrips));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('joinedTrips', JSON.stringify(joinedTrips));
  }, [joinedTrips]);

  const handleJoinTrip = useCallback((trip) => {
    setJoinedTrips(prev => {
      if (prev.some(joined => joined.id === trip.id)) {
        return prev;
      }
      return [...prev, { ...trip, itinerary: [] }];
    });
  }, []);

  const handleItineraryUpdate = (tripId, updatedItinerary) => {
    setJoinedTrips(prev =>
      prev.map(trip =>
        trip.id === tripId ? { ...trip, itinerary: updatedItinerary } : trip
      )
    );
  };

  return (
    <div className="app">
      <NavBar />
      <main className="main-content">
        <Routes>

          <Route path="/" element={<div className=""><ProtectedRoute><HomePage /></ProtectedRoute></div>} />
          <Route path="/about" element={<div className="page-content">About Us</div>} />
          <Route path="/contact" element={<div className="page-content">Contact Us</div>} />
          <Route path="/login" element={<div className="login-container"><LoginForm /></div>} />
          <Route path="/register" element={<div className="login-container"><RegisterForm /></div>} />
          <Route path="/reset-password" element={<div className="login-container"><ResetPasswordForm /></div>} />

          <Route path="/profile" element={
            <ProtectedRoute>
              <div className="page-content"><ProfileInfo /></div>
            </ProtectedRoute>
          } />

          <Route path="/trips" element={
            <ProtectedRoute>
              <MyTripsPage 
                joinedTrips={joinedTrips} 
                onJoinTrip={handleJoinTrip}
              />
            </ProtectedRoute>
          } />

          <Route path="/joined-trips" element={
            <JoinedTripsPage 
              joinedTrips={joinedTrips} 
            />
          } />

          <Route path="/trip/:tripId" element={
            <TripDetailPage 
              joinedTrips={joinedTrips}
              onItineraryUpdate={handleItineraryUpdate}
            />
          } />

          <Route path="/itinerary/:tripId" element={
            <ProtectedRoute>
              <div className="page-content">
                <Itinerary />
              </div>
            </ProtectedRoute>
          } />

          <Route path="/bookings" element={
            <ProtectedRoute>
              <div className="page-content">Bookings Page</div>
            </ProtectedRoute>
          } />

          <Route path="/settings" element={
            <ProtectedRoute>
              <div className="page-content">Settings Page</div>
            </ProtectedRoute>
          } />

          <Route path="/trip-activities-demo" element={
            <div className="page-content">
              <section className="destination-suggestions-section" style={{ marginBottom: '40px' }}>
                <h2>Find Destination Ideas</h2>
                <DestinationSuggestions />
              </section>
              <hr style={{ margin: "20px 0", borderColor: "#555" }} />
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
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;