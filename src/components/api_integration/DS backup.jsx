import React, { useState, useEffect } from 'react'; // Added useEffect
// import './DestinationSuggestions.css';

const DestinationSuggestions = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]); // To store API results
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Function to fetch city suggestions
    const fetchCitySuggestions = async (query) => {
        if (!query || query.length < 2) { // Basic validation
            setSuggestions([]);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://api.teleport.org/api/cities/?search=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const searchResults = data._embedded?.['city:search-results'] || [];
            setSuggestions(searchResults.map(result => ({
                name: result.matching_full_name,
                href: result._links['city:item'].href
            })));
        } catch (err) {
            console.error("Error fetching city suggestions:", err);
            setError(err.message);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch suggestions when searchTerm changes (basic, no debounce yet)
    useEffect(() => {
        if (searchTerm) {
            fetchCitySuggestions(searchTerm);
        } else {
            setSuggestions([]); // Clear suggestions if search term is empty
        }
    }, [searchTerm]);


    return (
        <div className="destination-suggestions-container">
            <h2>Find Destination Ideas</h2>
            <input
                type="text"
                placeholder="Search for a city..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />

            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.href}
                            // onClick will be added later
                            className="suggestion-item"
                        >
                            {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DestinationSuggestions;