import React from 'react';
import "../../styles/Homepage.css"

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
            <button className='button' style={{ backgroundColor: '#1a4dab', color: 'white' }}>View Trips</button>
          </div>

          <div className="card">
            <h2>Vote on Activities</h2>
            <p>Suggest and vote on trip activities</p>
            <button className='button'>Suggest Activity</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
