import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import ISSMarker from './ISSMarker';
import TrajectoryPath from './TrajectoryPath';
import useStore from '../store/useStore';
import { useTheme } from '../context/ThemeContext';
import 'leaflet/dist/leaflet.css';

function MapUpdater({ position }) {
  const map = useMap();
  const hasSetView = useRef(false);

  useEffect(() => {
    if (position && !hasSetView.current) {
      map.setView([position.latitude, position.longitude], 3, { animate: true });
      hasSetView.current = true;
    }
  }, [position, map]);

  return null;
}

export default function ISSMap() {
  const position = useStore((s) => s.issPosition);
  const history = useStore((s) => s.issHistory);
  const { theme } = useTheme();

  // Standard OpenStreetMap for light mode (matches reference), CARTO dark for dark mode
  const lightTile = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const darkTile = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

  const lightAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const darkAttribution = '&copy; <a href="https://carto.com/">CARTO</a>';

  return (
    <MapContainer
      center={position ? [position.latitude, position.longitude] : [0, 0]}
      zoom={3}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%', borderRadius: '8px' }}
      worldCopyJump={true}
    >
      <TileLayer
        attribution={theme === 'dark' ? darkAttribution : lightAttribution}
        url={theme === 'dark' ? darkTile : lightTile}
      />
      <MapUpdater position={position} />
      {position && <ISSMarker position={position} />}
      {history.length > 1 && <TrajectoryPath positions={history} />}
    </MapContainer>
  );
}
