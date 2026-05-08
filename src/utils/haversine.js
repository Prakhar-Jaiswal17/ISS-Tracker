/**
 * Calculate distance between two lat/lng points using Haversine formula
 * @returns distance in kilometers
 */
export function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * Calculate speed in km/h given two positions and timestamps
 */
export function calculateSpeed(pos1, pos2) {
  if (!pos1 || !pos2) return 0;
  const distance = haversineDistance(
    pos1.latitude, pos1.longitude,
    pos2.latitude, pos2.longitude
  );
  const timeDiffHours = Math.abs(pos2.timestamp - pos1.timestamp) / 3600;
  if (timeDiffHours === 0) return 0;
  return distance / timeDiffHours;
}
