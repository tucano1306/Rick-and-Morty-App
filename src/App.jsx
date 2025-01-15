import { useState, useEffect } from 'react';
import LocationInfo from './components/LocationInfo';
import ResidentList from './components/ResidentList';
import ErrorMessage from './components/ErrorMessage';
import LocationIdSearch from './components/LocationIdSearch';
import LocationSearch from './components/LocationSearch';
import { useLocation } from './components/hooks/useLocation';
import GifGallery from './components/GifGallery';
import Pagination from './components/Pagination';
import './App.css';


function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const residentsPerPage = 8;

  const {
    location,
    loading,
    error,
    fetchLocation
  } = useLocation();

  useEffect(() => {
    const randomId = Math.floor(Math.random() * 126) + 1;
    fetchLocation(randomId);
  }, [fetchLocation]);

  const handleIdSearch = (id) => {
    fetchLocation(id);
    setCurrentPage(1);
  };

  const handleLocationSearch = async (locationId) => {
    fetchLocation(locationId);
    setCurrentPage(1);
  };
  

  const indexOfLastResident = currentPage * residentsPerPage;
  const indexOfFirstResident = indexOfLastResident - residentsPerPage;
  const currentResidents = location?.residents?.slice(
    indexOfFirstResident,
    indexOfLastResident
  ) || [];

  return (
    <div className="container">
      <header className="header">
        <h1 className="header__title">Rick and Morty Location Explorer</h1>
      </header>
      
      <div className="search-container">
        <LocationIdSearch onSearch={handleIdSearch} />
        <LocationSearch onLocationSelect={handleLocationSearch} />
      </div>

      {error && <ErrorMessage message={error} />}
      
      {loading ? (
        <div className="loading">Cargando...</div>
      ) : (
        location && (
          <>
            <LocationInfo location={location} />
            <ResidentList residents={currentResidents} />
            {location.residents?.length > residentsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(location.residents.length / residentsPerPage)}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )
      )}
      <GifGallery />
    </div>
  );
}

export default App;