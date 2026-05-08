import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import useStore from '../store/useStore';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="p-2 rounded-lg shadow-md border"
      style={{
        background: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
      }}
    >
      <p className="text-[10px] mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</p>
      <p className="text-sm font-bold" style={{ color: '#ef4444' }}>
        {payload[0].value.toLocaleString()} km/h
      </p>
    </div>
  );
};

export default function SpeedChart() {
  const speedHistory = useStore((s) => s.issSpeedHistory);

  return (
    <div
      className="rounded-2xl h-full flex flex-col"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      <h3
        className="text-lg font-bold px-6 pt-6 pb-4"
        style={{ color: 'var(--text-primary)' }}
      >
        ISS Speed Trend
      </h3>

      <div className="px-4 pb-4" style={{ height: '400px' }}>
        {speedHistory.length < 2 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Collecting speed data... ({speedHistory.length}/2 readings)
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={speedHistory} margin={{ top: 5, right: 10, bottom: 20, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 9, fill: 'var(--text-muted)' }}
                angle={-45}
                textAnchor="end"
                stroke="var(--border-color)"
              />
              <YAxis
                tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
                stroke="var(--border-color)"
                domain={['dataMin - 500', 'dataMax + 500']}
                tickFormatter={(v) => v.toLocaleString()}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                height={30}
                iconType="plainline"
                formatter={() => (
                  <span style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>
                    ISS Speed (km/h)
                  </span>
                )}
              />
              <Line
                type="linear"
                dataKey="speed"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#ef4444', stroke: '#fff', strokeWidth: 2 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
