import { Polyline } from 'react-leaflet';

export default function TrajectoryPath({ positions }) {
  // Take last 15 positions for trajectory
  const recent = positions.slice(-15);
  const coords = recent.map((p) => [p.latitude, p.longitude]);

  return (
    <Polyline
      positions={coords}
      pathOptions={{
        color: '#3b82f6',
        weight: 2.5,
        opacity: 0.7,
        dashArray: '8, 6',
        lineCap: 'round',
        lineJoin: 'round',
      }}
    />
  );
}
