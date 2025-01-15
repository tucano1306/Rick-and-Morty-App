import { useState, useCallback } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLocation = useCallback(async (locationId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://rickandmortyapi.com/api/location/${locationId}`);
      
      if (!response.ok) {
        throw new Error('Error al cargar la ubicación');
      }

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
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      const response = await fetch(
        `https://rickandmortyapi.com/api/location/?name=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error('Error en la búsqueda');
      }

      const data = await response.json();
      setSuggestions(data.results || []);
    } catch (error) {
      setSuggestions([]);
      console.error('Error searching locations:', error);
    }
  }, []);

  const getRandomLocation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const randomId = Math.floor(Math.random() * 126) + 1;
      const response = await fetch(`https://rickandmortyapi.com/api/location/${randomId}`);
      
      if (!response.ok) {
        throw new Error('Error al cargar la ubicación aleatoria');
      }

      const data = await response.json();
      setLocation(data);
    } catch (error) {
      setError(error.message);
      setLocation(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    location,
    suggestions,
    loading,
    error,
    fetchLocation,
    searchLocations,
    getRandomLocation
  };
};

export default useLocation;