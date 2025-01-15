import { useState, useCallback, useEffect } from 'react';

export const useResidents = (residentUrls = []) => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResidents = useCallback(async (urls) => {
    try {
      setLoading(true);
      setError(null);

      if (!urls || urls.length === 0) {
        setResidents([]);
        return;
      }

      const promises = urls.map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error al cargar residente: ${response.status}`);
        }
        return response.json();
      });

      const data = await Promise.all(promises);
      setResidents(data);
    } catch (error) {
      setError(error.message);
      setResidents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResidents(residentUrls);
  }, [residentUrls, fetchResidents]);

  return {
    residents,
    loading,
    error,
    fetchResidents
  };
};