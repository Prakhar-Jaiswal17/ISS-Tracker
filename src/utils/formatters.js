/**
 * Format a Unix timestamp to readable date/time
 */
export function formatTimestamp(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

/**
 * Format a date string to readable format
 */
export function formatDate(dateString) {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format number with commas
 */
export function formatNumber(num, decimals = 2) {
  if (num === null || num === undefined) return '—';
  return Number(num).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format coordinates to display string
 */
export function formatCoord(value, type) {
  if (value === null || value === undefined) return '—';
  const num = Number(value);
  const dir = type === 'lat'
    ? (num >= 0 ? 'N' : 'S')
    : (num >= 0 ? 'E' : 'W');
  return `${Math.abs(num).toFixed(4)}° ${dir}`;
}

/**
 * Truncate text with ellipsis
 */
export function truncate(str, maxLen = 120) {
  if (!str) return '';
  return str.length > maxLen ? str.slice(0, maxLen) + '…' : str;
}

/**
 * Time ago string
 */
export function timeAgo(dateString) {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
