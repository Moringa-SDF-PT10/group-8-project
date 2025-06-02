import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/TripsPage.css';

const JoinedTripsPage = ({ joinedTrips, onSelectTrip }) => {
    return (
        <div className='joined-trips-container'>
            <h1>My Joined Trips</h1>
            <Link to="/trips" style={{ display: 'block', marginBottom: '20px' }}>
                ← Back to Search
            </Link>

            {joinedTrips.length === 0 ? (
                <p>You haven't joined any trips yet.</p>
            ) : (
                <ul className='joined-trips-list'>
                    {joinedTrips.map(trip => (
                        <li key={trip.id} style={{ marginBottom: '20px', padding:'10px', margin: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                            <h3>{trip.name}</h3>
                            <p>{trip.location}</p>
                            {trip.image && <img src={trip.image} alt={trip.name} width="400" height="250" border="1px solid #fff" />}
                            <div style={{ marginTop: '10px' }}>
                                <Link
                                    to={`/trip/${trip.id}`}
                                    style={{ padding: '8px', marginRight: '10px' }}
                                >
                                    View Itinerary
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default JoinedTripsPage;