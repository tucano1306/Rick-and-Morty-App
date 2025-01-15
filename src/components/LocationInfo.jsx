// LocationInfo.jsx
import PropTypes from 'prop-types';

function LocationInfo({ location }) {
  // Agregamos una validación para cuando location es undefined
  if (!location) return null;

  return (
    <div className="location">
      <h2 className="location__title">
        {location.name}
      </h2>

      <div className="location__grid">
        <div className="location__info-item">
          <h3 className="location__info-label">Type:</h3>
          <p className="location__info-value">{location.type}</p>
        </div>

        <div className="location__info-item">
          <h3 className="location__info-label">Dimension:</h3>
          <p className="location__info-value">{location.dimension}</p>
        </div>

        <div className="location__info-item">
          <h3 className="location__info-label">Population:</h3>
          <p className="location__info-value">{location.residents.length}</p>
        </div>
      </div>
    </div>
  );
}

LocationInfo.propTypes = {
  location: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    dimension: PropTypes.string.isRequired,
    residents: PropTypes.array.isRequired
  })
};

export default LocationInfo;