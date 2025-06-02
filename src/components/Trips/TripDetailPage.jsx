import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Itinerary from '../Itinerary/Itinerary';
import '../../styles/TripsPage.css';

const TripDetailPage = ({ joinedTrips, onItineraryUpdate }) => {
    const { tripId } = useParams();
    const trip = joinedTrips.find(t => t.id.toString() === tripId);

    if (!trip) {
        return (
            <div>
                <p>Trip not found</p>
                <Link to="/joined-trips">Back to My Trips</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>{trip.name}</h1>
            <p>{trip.location}</p>

            <div style={{ margin: '20px 0' }}>
                <Link to="/joined-trips" style={{ marginRight: '10px' }}>
                    ← Back to My Trips
                </Link>
            </div>

            <Itinerary
                tripId={trip.id}
                itinerary={trip.itinerary || []}
                onItineraryUpdate={(updatedItinerary) => {
                    onItineraryUpdate(trip.id, updatedItinerary);
                }}
            />
        </div>
    );
};

export default TripDetailPage;