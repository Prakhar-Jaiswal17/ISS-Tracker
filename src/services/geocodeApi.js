/**
 * Reverse geocode coordinates to a location name
 * Uses BigDataCloud free API (no key required)
 */
export async function reverseGeocode(latitude, longitude) {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    if (!res.ok) return 'Unknown Location';
    const data = await res.json();

    if (data.locality && data.countryName) {
      return `${data.locality}, ${data.countryName}`;
    }
    if (data.city && data.countryName) {
      return `${data.city}, ${data.countryName}`;
    }
    if (data.countryName) {
      return data.countryName;
    }
    if (data.continent) {
      return `${data.continent} (Ocean)`;
    }
    return 'Over Ocean';
  } catch {
    return 'Unknown Location';
  }
}
