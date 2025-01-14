import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchLocation = ({ searchTerm, setSearchTerm, suggestions, onLocationSelect }) => {
  const [error, setError] = useState('');

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.length === 0) {
      setError('');
    } else if (value.length < 2) {
      setError('Type at least 2 characters');
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search location..."
        className="search__input"
      />
      {error && <span className="search__error">{error}</span>}
      {suggestions.length > 0 && searchTerm && (
        <div className="search__suggestions">
          {suggestions.map((location) => (
            <div
              key={location.id}
              onClick={() => onLocationSelect(location.id)}
              className="search__suggestion-item"
            >
              {location.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

SearchLocation.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  suggestions: PropTypes.array.isRequired,
  onLocationSelect: PropTypes.func.isRequired
};

export default SearchLocation;