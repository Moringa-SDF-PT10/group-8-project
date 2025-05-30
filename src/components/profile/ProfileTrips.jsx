import { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/profileComponent.css"

const ProfileTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
        const mockTrips = response.data.map((post, index) => ({
          id: post.id,
          destination: `Destination ${index + 1}`,
          date: new Date(2025, index, 15).toLocaleDateString(),
        }));
        setTrips(mockTrips);
      } catch (err) {
        setError('Failed to load trips.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="card">
      <h2 className="card-title">Your Trips</h2>
      {loading && <p className="text">Loading trips...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && trips.length ? (
        <ul className="trip-list">
          {trips.map(trip => (
            <li key={trip.id} className="trip-item">
              <span className="text-bold">{trip.destination}</span> - {trip.date}
            </li>
          ))}
        </ul>
      ) : (
        !loading && !error && <p className="text">No trips found.</p>
      )}
    </div>
  );
};

export default ProfileTrips;