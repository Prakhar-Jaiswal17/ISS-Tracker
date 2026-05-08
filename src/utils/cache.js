/**
 * localStorage cache helpers with TTL support
 */

const CACHE_PREFIX = 'sid_cache_';

/**
 * Set a cached value with TTL in minutes
 */
export function setCache(key, data, ttlMinutes = 15) {
  const item = {
    data,
    expiry: Date.now() + ttlMinutes * 60 * 1000,
  };
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item));
  } catch (e) {
    console.warn('Cache write failed:', e);
  }
}

/**
 * Get a cached value, returns null if expired or missing
 */
export function getCache(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const item = JSON.parse(raw);
    if (Date.now() > item.expiry) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return item.data;
  } catch (e) {
    return null;
  }
}

/**
 * Remove a cached value
 */
export function removeCache(key) {
  localStorage.removeItem(CACHE_PREFIX + key);
}

/**
 * Clear all SID cache entries
 */
export function clearAllCache() {
  Object.keys(localStorage)
    .filter((k) => k.startsWith(CACHE_PREFIX))
    .forEach((k) => localStorage.removeItem(k));
}
