import React, { useState, useEffect } from 'react';
import './DestinationSuggestions.css';

// --- MOCK DATA (Structure remains, imageUrl will be dynamic) ---
const MOCK_CITY_SUGGESTIONS = [
    { name: "Paris, France", href: "mock_paris_href", searchKeyword: "Paris city" },
    { name: "London, United Kingdom", href: "mock_london_href", searchKeyword: "London city" },
    { name: "Tokyo, Japan", href: "mock_tokyo_href", searchKeyword: "Tokyo city" },
    { name: "New York, New York, United States", href: "mock_newyork_href", searchKeyword: "New York City" },
    { name: "Rome, Italy", href: "mock_rome_href", searchKeyword: "Rome city" }
];

// Base details, imageUrl will be added dynamically
const MOCK_CITY_DETAILS_BASE = {
    "mock_paris_href": {
        name: "Paris (Mock)",
        full_name: "Paris, Ile-de-France, France",
        population: 2148271,
        summary: "<p>Mock Data: Paris, France, is among the top cities with a <b>free business environment</b>...</p>",
        searchKeyword: "Paris city skyline" // More specific keyword for better image
    },
    "mock_london_href": {
        name: "London (Mock)",
        full_name: "London, England, United Kingdom",
        population: 8982000,
        summary: "<p>Mock Data: London, United Kingdom, is among the top cities with a <b>free business environment</b>...</p>",
        searchKeyword: "London city landmarks"
    },
    "mock_tokyo_href": {
        name: "Tokyo (Mock)",
        full_name: "Tokyo, Japan",
        population: 13929286,
        summary: "<p>Mock Data: Tokyo, Japan, is known for its blend of ultramodern and traditional architecture...</p>",
        searchKeyword: "Tokyo city night"
    },
    "mock_newyork_href": {
        name: "New York (Mock)",
        full_name: "New York, New York, United States",
        population: 8399000,
        summary: "<p>Mock Data: New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean...</p>",
        searchKeyword: "New York City skyline"
    },
    "mock_rome_href": {
        name: "Rome (Mock)",
        full_name: "Rome, Lazio, Italy",
        population: 2872800,
        summary: "<p>Mock Data: Rome, Italy’s capital, is a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art...</p>",
        searchKeyword: "Rome ancient ruins"
    }
};
// --- END OF MOCK DATA ---

const DestinationSuggestions = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCityHref, setSelectedCityHref] = useState(null);
    const [cityDetails, setCityDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setSelectedCityHref(null);
        setCityDetails(null);
    };

    const fetchCitySuggestions = async (query) => {
        if (!query || query.length < 2) {
            setSuggestions([]);
            return;
        }
        setIsLoading(true);
        setError(null);
        console.log(`MOCK API: Simulating search for city suggestions with query: "${query}"`);
        await new Promise(resolve => setTimeout(resolve, 300));

        try {
            const filteredSuggestions = MOCK_CITY_SUGGESTIONS.filter(s =>
                s.name.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } catch (err) {
            console.error("Error processing mock city suggestions:", err);
            setError("Error processing mock data.");
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCityDetails = async (cityHref) => {
        if (!cityHref) return;
        setIsLoading(true);
        setError(null);
        setCityDetails(null);
        console.log(`MOCK API: Simulating fetch for city details with href: "${cityHref}"`);
        await new Promise(resolve => setTimeout(resolve, 400));

        try {
            const baseDetails = MOCK_CITY_DETAILS_BASE[cityHref];
            if (baseDetails) {
                // --- DYNAMIC IMAGE URL GENERATION ---
                const imageKeyword = baseDetails.searchKeyword || baseDetails.name.replace(' (Mock)', ''); // Use specific keyword or fallback to city name
                const imageUrl = `https://source.unsplash.com/600x400/?${encodeURIComponent(imageKeyword)}`;
                // --- END OF DYNAMIC IMAGE URL GENERATION ---

                setCityDetails({
                    ...baseDetails,
                    imageUrl: imageUrl // Add the dynamically generated Unsplash URL
                });
            } else {
                console.warn(`Mock details not found for href: ${cityHref}`);
                setError(`Mock details not found for: ${cityHref.replace('mock_', '').replace('_href', '')}`);
                setCityDetails(null);
            }
        } catch (err) {
            console.error("Error fetching mock city details:", err);
            setError(err.message);
            setCityDetails(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm.trim() && searchTerm.length >= 2) {
                fetchCitySuggestions(searchTerm);
            } else {
                setSuggestions([]);
            }
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    useEffect(() => {
        if (selectedCityHref) {
            fetchCityDetails(selectedCityHref);
        }
    }, [selectedCityHref]);

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.name.replace(' (Mock)', ''));
        setSuggestions([]);
        setSelectedCityHref(suggestion.href);
    };

    return (
        <div className="destination-suggestions-container">
            <h2>Find Destination Ideas</h2>
            <input
                type="text"
                placeholder="Search for a city (min 2 chars)..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />

            {isLoading && <p>Loading...</p>}
            {error && <p className="error-message">Error: {error}</p>}

            {suggestions.length > 0 && !selectedCityHref && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.href}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="suggestion-item"
                        >
                            {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}

            {cityDetails && (
                <div className="city-details-card">
                    <h3>{cityDetails.name}</h3>
                    {cityDetails.population && <p>Population: {cityDetails.population.toLocaleString()}</p>}
                    {/* The key change for the image: */}
                    {cityDetails.imageUrl && (
                        <img
                            src={cityDetails.imageUrl}
                            alt={`Image of ${cityDetails.name.replace(' (Mock)', '')}`} // Cleaner alt text
                            className="city-image"
                            // Add a key to force re-render if the keyword changes for the same city (though unlikely with current setup)
                            // key={cityDetails.imageUrl}
                        />
                    )}
                    {cityDetails.summary && (
                        <div className="city-summary" dangerouslySetInnerHTML={{ __html: cityDetails.summary }} />
                    )}
                </div>
            )}
        </div>
    );
};

export default DestinationSuggestions;