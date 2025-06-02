import React, { useState, useEffect } from 'react';
import Itinerary from '../Itinerary/Itinerary';
import { Link } from 'react-router-dom';
import '../../styles/TripsPage.css'; 

const TripsPage = ({ joinedTrips, onJoinTrip }) => {
    const [destinations, setDestinations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('paris');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const RESULTS_PER_PAGE = 10;

    const fetchDestinations = async () => {
        if (!searchQuery) return;
        setLoading(true);
        const offset = currentPage * RESULTS_PER_PAGE;
        const url = `https://travel-advisor.p.rapidapi.com/locations/search?query=${encodeURIComponent(searchQuery)}&limit=${RESULTS_PER_PAGE}&offset=${offset}&units=km&currency=USD&sort=relevance&lang=en_US`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '275d2bb079mshce7ea84f9d52042p1dfb3ajsn27b544e68b50',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);

            const transformedData = result.data.map((item, index) => ({
                id: offset + index + 1,
                name: item.result_object.name,
                location: item.result_object.location_string,
                description: item.result_object.description || 'No description',
                image: item.result_object.photo?.images?.medium?.url,
            }));

            setDestinations(transformedData);
            setTotalResults(result.paging?.total_results || (offset + transformedData.length));
        } catch (error) {
            console.error('Error fetching data:', error);
            setDestinations([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDestinations();
    }, [currentPage, searchQuery]); // Updated to fetch when searchQuery or page changes

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(0); // Reset page and trigger fetch via useEffect
    };

    const handleSelectTrip = (trip) => {
        setSelectedTrip(trip);
    };

    return (
        <div className='trips-page-container'>
            <h1 className=''>Search Destinations</h1>
            <div style={{ marginBottom: '20px' }}>
                <Link to="/joined-trips">View My Joined Trips ({joinedTrips.length})</Link>
            </div>

            <form onSubmit={handleSearch} className='search-form' >
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter destination (e.g., Paris)"
                    style={{ padding: '10px', marginTop:'14px' , width: '300px', fontSize: '15px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ padding: '10px', marginLeft: '15px' }}>Search</button>
            </form>

            {loading ? <p>Loading...</p> : (
                destinations.length > 0 ? (
                    <ul className='destination-list'>
                        {destinations.map(dest => (
                            <li key={dest.id} style={{ marginBottom: '20px' , padding:'10px', margin: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                                <h3>{dest.name}</h3>
                                <p>{dest.location}</p>
                                {/* <p>{dest.description}</p> */}
                                <div>
                                  {dest.image && <img src={dest.image} alt={dest.name} width="400" height="250" border="1px solid black"/>}
                                </div>
                                <button
                                    onClick={() =>{ 
                                      console.log('Button clicked for:', dest.id);
                                      onJoinTrip(dest)
                                    }}

                                    disabled={joinedTrips.some(joined => joined.id === dest.id)}
                                    style={{ marginTop: '10px', padding: '8px' }}
                                    className='join-trip-button'
                                >
                                    {joinedTrips.some(joined => joined.id.toString() === dest.id.toString()) 
                                    ? 'Added' 
                                    : 'Add Trip'
                                    }

                                </button>
                            </li>
                        ))}
                    </ul>
                ) : <p>No destinations found. Try a different search.</p>
            )}

            {destinations.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <button
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                        style={{ padding: '10px', marginRight: '10px' }}
                    >
                        Previous
                    </button>
                    <span style={{ textAlign:'center', alignItems:'center', justifyItems:'center', display:'flex'}}>Page {currentPage + 1}</span>
                    <button
                        disabled={(currentPage + 1) * RESULTS_PER_PAGE >= totalResults}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        style={{ padding: '10px' }}
                    >
                        Next
                    </button>
                </div>
            )}
            
            {selectedTrip && (
                <div style={{ marginTop: '40px', border: '1px solid #ccc', padding: '20px' }}>
                    <h2>Itinerary for {selectedTrip.name}</h2>
                    <button onClick={() => setSelectedTrip(null)}>Back to Trips</button>
                    <Itinerary
                        tripId={selectedTrip.id}
                        itinerary={selectedTrip.itinerary}
                        onItineraryUpdate={(updatedItinerary) => {
                            setJoinedTrips(prev =>
                                prev.map(trip =>
                                    trip.id === selectedTrip.id
                                        ? { ...trip, itinerary: updatedItinerary }
                                        : trip
                                )
                            );
                            setSelectedTrip(prev => ({ ...prev, itinerary: updatedItinerary }));
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default TripsPage;