import React from 'react';
import "../../styles/Homepage.css"
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {

  return (
    <div>
      <div className="container">
        <h1>Welcome to Group Travel Planner</h1>
        <br />
        <p>Plan your trips together with ease.</p>
        <button className='button' style={{ backgroundColor: 'green', color: 'white' }}>Get Started</button>

        <div className="card-container">
          <div className="card">
            <h2>My Trips</h2>
            <p>View and manage your trips.</p>
            <Link to="/trips" style={{ backgroundColor: '#1a4dab', color: 'white' }} className='button'>Trips</Link>
          </div>

          <div className="card">
            <h2>Vote on Activities</h2>
            <p>Suggest and vote on trip activities</p>
            <Link to="/itinerary" style={{ backgroundColor: '#1a4dab', color: 'white' }} className='button'>Suggest Activity</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
