import { useResidents } from './hooks/useResidents.js';
import PropTypes from 'prop-types';

function ResidentList({ residents }) {
  const { residents: residentData, loading, error } = useResidents(residents);

  if (loading) return <div className="loading">Loading residents...</div>;
  
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="residents">
      {residentData.length === 0 ? (
        <div className="no-residents">
          No residents found in this location
        </div>
      ) : (
        residentData.map((resident) => (
          <div key={resident.id} className="resident-card">
            <img
              src={resident.image}
              alt={resident.name}
              className="resident-card__image"
            />
            <div className="resident-card__content">
              <h3 className="resident-card__name">{resident.name}</h3>
              <div className={`status-indicator ${resident.status.toLowerCase()}`}>
                <span className="status-icon"></span>
                {resident.status}
              </div>
              <p className="resident-card__info">
                <span className="resident-card__label">Origin:</span>
                {resident.origin.name}
              </p>
              <p className="resident-card__info">
                <span className="resident-card__label">Episodes:</span>
                {resident.episode.length}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

ResidentList.propTypes = {
  residents: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ResidentList;