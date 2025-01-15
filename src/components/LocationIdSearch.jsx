// components/LocationIdSearch.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

function LocationIdSearch({ onSearch }) {
  const [locationId, setLocationId] = useState('');
  const [error, setError] = useState('');

  const validateInput = (value) => {
    // Convertimos el valor a número
    const id = parseInt(value);
    
    // Validaciones
    if (value === '') {
      setError('Por favor ingresa un ID');
      return false;
    }
    if (isNaN(id)) {
      setError('Hey! Solo se permiten números');
      return false;
    }
    if (id < 1 || id > 126) {
      setError('Hey! you must provide an id from 1 to 126 🙄');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateInput(locationId)) {
      onSearch(parseInt(locationId));
      setLocationId(''); // Limpiamos el input después de una búsqueda exitosa
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setLocationId(value);
    validateInput(value); // Validamos mientras el usuario escribe
  };

  return (
    <form onSubmit={handleSubmit} className="location-search">
      <div className="location-search__container">
        <input
          type="text"
          value={locationId}
          onChange={handleChange}
          placeholder="Type a location ID..."
          className={`location-search__input ${error ? 'location-search__input--error' : ''}`}
        />
        <button type="submit" className="location-search__button">
          Search
        </button>
      </div>
      {error && (
        <div className="location-search__error">
          <span className="location-search__error-icon">❌</span>
          {error}
        </div>
      )}
    </form>
  );
}

LocationIdSearch.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default LocationIdSearch;