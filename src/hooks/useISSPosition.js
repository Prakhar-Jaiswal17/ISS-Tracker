import { useEffect, useRef, useCallback } from 'react';
import { fetchISSPosition } from '../services/issApi';
import { reverseGeocode } from '../services/geocodeApi';
import useStore from '../store/useStore';

export function useISSPosition(intervalMs = 15000) {
  const updateISSPosition = useStore((s) => s.updateISSPosition);
  const setISSLocation = useStore((s) => s.setISSLocation);
  const intervalRef = useRef(null);
  const isMounted = useRef(true);
  const backoffRef = useRef(intervalMs);

  const fetchAndUpdate = useCallback(async () => {
    try {
      const position = await fetchISSPosition();
      if (!isMounted.current) return;
      updateISSPosition(position);
      backoffRef.current = intervalMs; // reset backoff on success

      // Reverse geocode (non-blocking)
      reverseGeocode(position.latitude, position.longitude)
        .then((location) => {
          if (isMounted.current) setISSLocation(location);
        });
    } catch (err) {
      // On 429, increase backoff to avoid hammering the API
      if (err.message.includes('429')) {
        backoffRef.current = Math.min(backoffRef.current * 2, 120000);
        console.warn(`ISS API rate limited. Retrying in ${backoffRef.current / 1000}s`);
      } else {
        console.error('ISS fetch error:', err);
      }
    }
  }, [updateISSPosition, setISSLocation, intervalMs]);

  useEffect(() => {
    isMounted.current = true;
    fetchAndUpdate();

    // Use dynamic interval via setTimeout chain
    const tick = () => {
      intervalRef.current = setTimeout(async () => {
        await fetchAndUpdate();
        if (isMounted.current) tick();
      }, backoffRef.current);
    };
    tick();

    return () => {
      isMounted.current = false;
      clearTimeout(intervalRef.current);
    };
  }, [fetchAndUpdate]);

  return { refresh: fetchAndUpdate };
}
