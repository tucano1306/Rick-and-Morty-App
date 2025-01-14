import { useState, useCallback } from 'react';

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLocation = useCallback(async (locationId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://rickandmortyapi.com/api/location/${locationId}`);
      if (!response.ok) throw new Error('Location not found');
      const data = await response.json();
      setLocation(data);
    } catch (error) {
      setError(error.message);
      setLocation(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchLocations = useCallback(async (query) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/location/?name=${query}`
      );
      const data = await response.json();
      setSuggestions(data.results || []);
    } catch (error) {
      console.error('Error searching locations:', error);
      setSuggestions([]);
    }
  }, []);

  return {
    location,
    suggestions,
    loading,
    error,
    fetchLocation,
    searchLocations
  };
};

export default useLocation;