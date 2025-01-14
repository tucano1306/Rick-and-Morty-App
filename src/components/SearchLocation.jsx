import { useRef, useState } from 'react'; // Agregamos useState
import PropTypes from 'prop-types';

function SearchLocation({ searchTerm, setSearchTerm, suggestions, onLocationSelect }) {
  const searchInputRef = useRef(null);
  const [inputError, setInputError] = useState(''); // Definimos el estado para el error

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Validación de entrada
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