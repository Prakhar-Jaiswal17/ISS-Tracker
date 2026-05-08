export default function SkeletonLoader({ variant = 'card', count = 1 }) {
  const variants = {
    card: (
      <div className="glass-static p-5">
        <div className="skeleton h-4 w-3/4 mb-3" />
        <div className="skeleton h-3 w-1/2 mb-2" />
        <div className="skeleton h-3 w-full mb-2" />
        <div className="skeleton h-3 w-2/3" />
      </div>
    ),
    stat: (
      <div className="glass-static p-4">
        <div className="flex items-center gap-3">
          <div className="skeleton w-10 h-10 rounded-lg" />
          <div className="flex-1">
            <div className="skeleton h-3 w-16 mb-2" />
            <div className="skeleton h-5 w-24" />
          </div>
        </div>
      </div>
    ),
    text: (
      <div>
        <div className="skeleton h-3 w-full mb-2" />
        <div className="skeleton h-3 w-4/5 mb-2" />
        <div className="skeleton h-3 w-3/5" />
      </div>
    ),
    newsCard: (
      <div className="glass-static overflow-hidden">
        <div className="skeleton h-48 w-full rounded-none" />
        <div className="p-4">
          <div className="skeleton h-5 w-3/4 mb-2" />
          <div className="skeleton h-3 w-1/2 mb-3" />
          <div className="skeleton h-3 w-full mb-1" />
          <div className="skeleton h-3 w-2/3 mb-3" />
          <div className="skeleton h-8 w-24 rounded-lg" />
        </div>
      </div>
    ),
    map: (
      <div className="glass-static h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="skeleton w-16 h-16 rounded-full mx-auto mb-3" />
          <div className="skeleton h-3 w-32 mx-auto" />
        </div>
      </div>
    ),
  };

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>{variants[variant] || variants.card}</div>
      ))}
    </>
  );
}
