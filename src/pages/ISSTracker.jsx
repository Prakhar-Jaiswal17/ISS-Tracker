import { useISSPosition } from '../hooks/useISSPosition';
import useStore from '../store/useStore';
import ISSMap from '../map/ISSMap';
import { formatNumber } from '../utils/formatters';

export default function ISSTracker() {
  const { refresh } = useISSPosition(15000);
  const position = useStore((s) => s.issPosition);
  const speed = useStore((s) => s.issSpeed);
  const location = useStore((s) => s.issLocation);
  const trackedCount = useStore((s) => s.trackedCount);

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header">
        <h2 className="card-title">ISS Live Tracking</h2>
        <div className="card-actions">
          <button className="pill-btn" onClick={refresh}>Refresh Now</button>
          <span className="pill-label">Auto-Refresh: ON</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-box">
          <p className="stat-label">Latitude / Longitude</p>
          <p className="stat-value">
            {position ? `${position.latitude.toFixed(3)}, ${position.longitude.toFixed(3)}` : 'Loading...'}
          </p>
        </div>
        <div className="stat-box">
          <p className="stat-label">Speed</p>
          <p className="stat-value">
            {position ? `${formatNumber(speed, 2)} km/h` : '--'}
          </p>
        </div>
        <div className="stat-box">
          <p className="stat-label">Nearest Place</p>
          <p className="stat-value">{location || '--'}</p>
        </div>
        <div className="stat-box">
          <p className="stat-label">Tracked Positions</p>
          <p className="stat-value">{trackedCount}</p>
        </div>
      </div>

      {/* Map */}
      <div className="map-wrap">
        {position ? <ISSMap /> : (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
            Loading map...
          </div>
        )}
      </div>
    </div>
  );
}
