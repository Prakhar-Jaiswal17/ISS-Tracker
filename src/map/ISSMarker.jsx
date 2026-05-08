import { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { formatCoord } from '../utils/formatters';

const issIconHtml = `
<div class="iss-marker">
  <div class="iss-radar-ring"></div>
  <div class="iss-radar-ring"></div>
  <div class="iss-radar-ring"></div>
  <svg class="iss-marker-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="28" y="20" width="8" height="24" rx="2" fill="#3b82f6"/>
    <rect x="12" y="28" width="40" height="8" rx="2" fill="#60a5fa"/>
    <rect x="8" y="26" width="10" height="12" rx="1" fill="#93c5fd" opacity="0.8"/>
    <rect x="46" y="26" width="10" height="12" rx="1" fill="#93c5fd" opacity="0.8"/>
    <circle cx="32" cy="32" r="4" fill="#22c55e"/>
    <rect x="30" y="16" width="4" height="6" rx="1" fill="#8b5cf6"/>
    <rect x="30" y="42" width="4" height="6" rx="1" fill="#8b5cf6"/>
  </svg>
</div>
`;

export default function ISSMarker({ position }) {
  const icon = useMemo(
    () =>
      L.divIcon({
        html: issIconHtml,
        className: '',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      }),
    []
  );

  return (
    <Marker position={[position.latitude, position.longitude]} icon={icon}>
      <Popup>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>
          <strong style={{ fontSize: '14px' }}>International Space Station</strong>
          <br />
          <span>Lat: {formatCoord(position.latitude, 'lat')}</span>
          <br />
          <span>Lng: {formatCoord(position.longitude, 'lng')}</span>
        </div>
      </Popup>
    </Marker>
  );
}
