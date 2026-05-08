export default function LiveIndicator({ active = true, label = 'LIVE' }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: active ? '#22c55e' : '#ef4444' }}
        />
        {active && (
          <div
            className="absolute inset-0 w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: active ? '#22c55e' : '#ef4444', opacity: 0.5 }}
          />
        )}
      </div>
      <span
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: active ? '#22c55e' : '#ef4444' }}
      >
        {label}
      </span>
    </div>
  );
}
