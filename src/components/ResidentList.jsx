import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ResidentList = ({ residents }) => {
  const [residentData, setResidentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResidents = async () => {
      setLoading(true);
      try {
        if (!residents || residents.length === 0) {
          setResidentData([]);
          return;
        }
        
        const data = await Promise.all(
          residents.map(async (url) => {
            const response = await fetch(url);
            return response.json();
          })
        );
        setResidentData(data);
      } catch (error) {
        console.error('Error fetching residents:', error);
        setResidentData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, [residents]); 

  if (loading) return <div className="loading">Loading residents...</div>;

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
};

ResidentList.propTypes = {
  residents: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ResidentList;