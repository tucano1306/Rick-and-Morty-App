import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ResidentList({ residents }) {
  const [residentData, setResidentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResidents = async () => {
      setLoading(true);
      try {
        const data = await Promise.all(
          residents.map(async (url) => {
            const response = await fetch(url);
            return response.json();
          })
        );
        setResidentData(data);
      } catch (error) {
        console.error('Error fetching residents:', error);
      } finally {
        setLoading(false);
      }
    };

    if (residents.length > 0) {
      fetchResidents();
    }
  }, [residents]);

  if (loading) return <div className="loading">Loading residents...</div>;

  return (
    <div className="residents">
      {residentData.map((resident) => (
        <div key={resident.id} className="resident-card">
          <div className="resident-card__image-container">
            <img
              src={resident.image}
              alt={resident.name}
              className="resident-card__image"
            />
            <span className={`resident-card__status ${resident.status.toLowerCase()}`}>
              {resident.status}
            </span>
          </div>
          <div className="resident-card__content">
            <h3 className="resident-card__name">{resident.name}</h3>
            <div className="resident-card__info">
              <p className="resident-card__label">Specie:</p>
              <p className="resident-card__value">{resident.species}</p>
            </div>
            <div className="resident-card__info">
              <p className="resident-card__label">Origin:</p>
              <p className="resident-card__value">{resident.origin.name}</p>
            </div>
            <div className="resident-card__info">
              <p className="resident-card__label">Episodes:</p>
              <p className="resident-card__value">{resident.episode.length}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

ResidentList.propTypes = {
  residents: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ResidentList;  