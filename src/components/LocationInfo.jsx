import PropTypes from 'prop-types';

const LocationInfo = ({ location }) => {
  if (!location) return null;

  return (
    <div className="location">
      <h2 className="location__title">{location.name}</h2>
      <div className="location__grid">
        <div className="location__info-item">
          <p className="location__info-label">Type:</p>
          <p className="location__info-value">{location.type}</p>
        </div>
        <div className="location__info-item">
          <p className="location__info-label">Dimension:</p>
          <p className="location__info-value">{location.dimension}</p>
        </div>
        <div className="location__info-item">
          <p className="location__info-label">Residents:</p>
          <p className="location__info-value">{location.residents?.length || 0}</p>
        </div>
      </div>
    </div>
  );
};


LocationInfo.propTypes = {
  location: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    dimension: PropTypes.string.isRequired,
    residents: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export default LocationInfo;