import { useState } from 'react';
import PropTypes from 'prop-types';

function LocationSearch({ onLocationSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchLocations = async (query) => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://rickandmortyapi.com/api/location/?name=${query}`
      );
      const data = await response.json();
      setSuggestions(data.results || []);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };
  

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    await searchLocations(value);
  };

  const handleSelect = (location) => {
    onLocationSelect(location);
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <div className="location-search">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Type a location name..."
        className="location-search__input"
      />

      {loading && (
        <div className="location-search__loading">Searching locations...</div>
      )}

      {suggestions.length > 0 && (
        <div className="location-search__suggestions">
          {suggestions.map((location) => (
            <div
              key={location.id}
              onClick={() => handleSelect(location)}
              className="location-search__suggestion-item"
            >
              {location.name}
              <span className="location-search__suggestion-type">
                {location.type}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

LocationSearch.propTypes = {
  onLocationSelect: PropTypes.func.isRequired
};

export default LocationSearch;