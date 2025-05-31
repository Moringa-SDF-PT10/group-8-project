// src/components/api_integration/DestinationSuggestions.jsx
import React, { useState, useEffect } from 'react';
import './DestinationSuggestions.css';

const DestinationSuggestions = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null); // Will store the full country object
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCountrySuggestions = async (query) => {
        if (!query || query.length < 2) {
            setSuggestions([]);
            setSelectedCountry(null);
            return;
        }
        setIsLoading(true);
        setError(null);
        setSelectedCountry(null);

        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(query)}`);
            if (!response.ok) {
                if (response.status === 404) {
                    setSuggestions([]); // Country not found
                    throw new Error(`Country not found for "${query}"`);
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setSuggestions(data.map(country => ({
                name: country.name.common,
                officialName: country.name.official,
                cca3: country.cca3 // Unique country code, good for key
            })));
        } catch (err) {
            console.error("Error fetching country suggestions:", err);
            setError(err.message);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCountryDetails = async (countryName) => { // We search again to get the full object
        if (!countryName) return;
        setIsLoading(true);
        setError(null);
        try {

            const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data && data.length > 0) {
                setSelectedCountry(data[0]); 
            } else {
                throw new Error(`Details not found for ${countryName}`);
            }
        } catch (err) {
            console.error("Error fetching country details:", err);
            setError(err.message);
            setSelectedCountry(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm.trim() && searchTerm.length >= 2) {
                fetchCountrySuggestions(searchTerm);
            } else {
                setSuggestions([]);
                setSelectedCountry(null);
            }
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.name); // Fill search bar
        setSuggestions([]); // Clear suggestions list
        fetchCountryDetails(suggestion.name); // Fetch details for the clicked common name
    };

    return (
        <div className="destination-suggestions-container">
            <h2>Choose a country to visit</h2>
            <input
                type="text"
                placeholder="Search for a country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            {isLoading && <p className="loading-message">Loading...</p>}
            {error && !selectedCountry && <p className="error-message">Error: {error}</p>} {/* Show error only if no country is selected */}


            {suggestions.length > 0 && !selectedCountry && (
                <ul className="suggestions-list">
                    {suggestions.map((country) => (
                        <li
                            key={country.cca3}
                            onClick={() => handleSuggestionClick(country)}
                            className="suggestion-item"
                        >
                            {country.name} ({country.officialName})
                        </li>
                    ))}
                </ul>
            )}

            {selectedCountry && (
                <div className="city-details-card"> {/* Reusing class name, but it's country details now */}
                    <h3>{selectedCountry.name.common}</h3>
                    <p><strong>Official Name:</strong> {selectedCountry.name.official}</p>
                    {selectedCountry.flags && selectedCountry.flags.png && (
                        <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} className="city-image" />
                    )}
                    <p><strong>Capital:</strong> {selectedCountry.capital ? selectedCountry.capital.join(', ') : 'N/A'}</p>
                    <p><strong>Region:</strong> {selectedCountry.region} ({selectedCountry.subregion})</p>
                    <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
                    <p><strong>Languages:</strong> {selectedCountry.languages ? Object.values(selectedCountry.languages).join(', ') : 'N/A'}</p>
                    {selectedCountry.currencies && Object.values(selectedCountry.currencies).length > 0 && (
                        <p><strong>Currency:</strong> {Object.values(selectedCountry.currencies)[0].name} ({Object.values(selectedCountry.currencies)[0].symbol})</p>
                    )}
                    {selectedCountry.maps && (
                        <p>
                            <a href={selectedCountry.maps.googleMaps} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
                            {' | '}
                            <a href={selectedCountry.maps.openStreetMaps} target="_blank" rel="noopener noreferrer">View on OpenStreetMap</a>
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DestinationSuggestions;