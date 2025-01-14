import { useState, useEffect } from 'react';
import LocationInfo from './components/LocationInfo';
import ResidentList from './components/ResidentList';
import SearchLocation from './components/SearchLocation';
import ErrorMessage from './components/ErrorMessage';
import Pagination from './components/Pagination';
import useLocation from "./components/hooks/useLocation";
import './App.css';
import GifGallery from './components/GifGallery';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const residentsPerPage = 8;
  
  const { 
    location, 
    suggestions,
    loading, 
    error,
    fetchLocation,
    searchLocations 
  } = useLocation();

  
  useEffect(() => {
    const randomId = Math.floor(Math.random() * 126) + 1;
    fetchLocation(randomId);
  }, [fetchLocation]); 

  
  useEffect(() => {
    if (searchTerm.length >= 2) {
      searchLocations(searchTerm);
    }
  }, [searchTerm, searchLocations]); 

  const handleLocationSelect = async (locationId) => {
    setSearchTerm('');
    await fetchLocation(locationId);
    setCurrentPage(1);
  };

  const indexOfLastResident = currentPage * residentsPerPage;
  const indexOfFirstResident = indexOfLastResident - residentsPerPage;
  const currentResidents = location?.residents?.slice(
    indexOfFirstResident,
    indexOfLastResident
  ) || [];

  return (
    <>
      <div className="container">
        <header className="header">
          <h1 className="header__title">Rick and Morty Location Explorer</h1>
        </header>

        <SearchLocation
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          suggestions={suggestions}
          onLocationSelect={handleLocationSelect}
        />

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
      </div>
      <GifGallery />
    </>
  );
}

export default App;