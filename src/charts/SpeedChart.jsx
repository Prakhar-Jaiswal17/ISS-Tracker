import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';
import useStore from '../store/useStore';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      padding: '8px 12px',
      borderRadius: '8px',
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-soft)',
    }}>
      <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '2px' }}>{label}</p>
      <p style={{ fontSize: '14px', fontWeight: 700, color: '#ef4444' }}>
        {payload[0].value.toLocaleString()} km/h
      </p>
    </div>
  );
};

export default function SpeedChart() {
  const speedHistory = useStore((s) => s.issSpeedHistory);

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="card-header">
        <h3 className="card-title">ISS Speed Trend</h3>
      </div>

      <div className="chart-area">
        {speedHistory.length < 2 ? (
          <div className="chart-placeholder">
            Collecting speed data... ({speedHistory.length}/2 readings)
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
