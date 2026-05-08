// Use proxy to avoid CORS/mixed-content issues
const ISS_POSITION_URL = '/api/iss/iss-now.json';
const ASTROS_URL = '/api/iss/astros.json';

/**
 * Fetch current ISS position
 */
export async function fetchISSPosition() {
  const res = await fetch(ISS_POSITION_URL);
  if (!res.ok) throw new Error(`ISS API error: ${res.status}`);
  const data = await res.json();
  return {
    latitude: parseFloat(data.iss_position.latitude),
    longitude: parseFloat(data.iss_position.longitude),
    timestamp: data.timestamp,
  };
}

/**
 * Fetch people currently in space
 */
export async function fetchAstronauts() {
  const res = await fetch(ASTROS_URL);
  if (!res.ok) throw new Error(`Astros API error: ${res.status}`);
  const data = await res.json();
  return {
    number: data.number,
    people: data.people,
  };
}
