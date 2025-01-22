import { useRef, useState } from 'react'; 
import PropTypes from 'prop-types';


function SearchLocation({ onSearch }) {


  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Type a location ID..."
        className="search-input"
        value={locationId}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Type a location name..."
        className="search-input"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
      {error && <div className="search-error">{error}</div>}
    </div>
  );
}

function SearchLocation({ searchTerm, setSearchTerm, suggestions, onLocationSelect }) {
  const searchInputRef = useRef(null);
  const [inputError, setInputError] = useState(''); 

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    
    if (value.length === 1) {
      setInputError('Ingresa al menos 2 caracteres para buscar');
    } else {
      setInputError('');
    }
  };

  return (
    <div className="search">
      <input
        ref={searchInputRef}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        className={`search__input ${inputError ? 'search__input--error' : ''}`}
        placeholder="Search location..."
        aria-label="Search locations"
      />
      {inputError && (
        <div className="search__error">{inputError}</div>
      )}
      {suggestions.length > 0 && searchTerm && (
        <div className="search__suggestions">
          {suggestions.map((location) => (
            <div
              key={location.id}
              onClick={() => onLocationSelect(location.id)}
              className="search__suggestion-item"
              role="button"
              tabIndex={0}
            >
              {location.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

SearchLocation.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  suggestions: PropTypes.array.isRequired,
  onLocationSelect: PropTypes.func.isRequired
};

export default SearchLocation;