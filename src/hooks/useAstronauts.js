import { useEffect, useCallback } from 'react';
import { fetchAstronauts } from '../services/issApi';
import { getCache, setCache } from '../utils/cache';
import useStore from '../store/useStore';

export function useAstronauts() {
  const setAstronauts = useStore((s) => s.setAstronauts);

  const loadAstronauts = useCallback(async () => {
    // Check cache first (5 min TTL)
    const cached = getCache('astronauts');
    if (cached) {
      setAstronauts(cached);
      return;
    }

    try {
      const data = await fetchAstronauts();
      setAstronauts(data);
      setCache('astronauts', data, 5);
    } catch (err) {
      console.error('Astronauts fetch error:', err);
    }
  }, [setAstronauts]);

  useEffect(() => {
    loadAstronauts();
  }, [loadAstronauts]);

  return { refresh: loadAstronauts };
}
