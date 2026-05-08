import { motion } from 'framer-motion';
import { useISSPosition } from '../hooks/useISSPosition';
import useStore from '../store/useStore';
import ISSMap from '../map/ISSMap';
import SkeletonLoader from '../components/SkeletonLoader';
import { formatNumber } from '../utils/formatters';

export default function ISSTracker() {
  const { refresh } = useISSPosition(15000);
  const position = useStore((s) => s.issPosition);
  const speed = useStore((s) => s.issSpeed);
  const location = useStore((s) => s.issLocation);
  const trackedCount = useStore((s) => s.trackedCount);

  return (
    <div
      className="rounded-2xl h-full"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
          ISS Live Tracking
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            className="px-4 py-1.5 rounded-md text-xs font-medium border transition-colors hover:opacity-80"
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              background: 'var(--bg-secondary)',
            }}
          >
            Refresh Now
          </button>
          <span
            className="px-4 py-1.5 rounded-md text-xs font-medium"
            style={{
              background: 'var(--bg-primary)',
              color: 'var(--text-secondary)',
            }}
          >
            Auto-Refresh: ON
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mx-6 mb-4 rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border-color)' }}>
        {position ? (
          <>
            <StatBox label="Latitude / Longitude" value={`${position.latitude.toFixed(3)}, ${position.longitude.toFixed(3)}`} />
            <StatBox label="Speed" value={`${formatNumber(speed, 2)} km/h`} />
            <StatBox label="Nearest Place" value={location} />
            <StatBox label="Tracked Positions" value={String(trackedCount)} />
          </>
        ) : (
          <>
            <StatBox label="Latitude / Longitude" value="Loading..." />
            <StatBox label="Speed" value="—" />
            <StatBox label="Nearest Place" value="—" />
            <StatBox label="Tracked Positions" value="0" />
          </>
        )}
      </div>

      {/* Map */}
      <div className="px-6 pb-6">
        <div className="rounded-lg overflow-hidden" style={{ height: '340px' }}>
          {position ? <ISSMap /> : <SkeletonLoader variant="map" />}
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div
      className="px-4 py-3"
      style={{
        borderRight: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
      }}
    >
      <p className="text-[11px] mb-0.5" style={{ color: 'var(--text-muted)' }}>
        {label}
      </p>
      <p className="text-sm font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>
        {value}
      </p>
    </div>
  );
}
