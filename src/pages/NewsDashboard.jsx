import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNews } from '../hooks/useNews';
import useStore from '../store/useStore';
import SkeletonLoader from '../components/SkeletonLoader';

export default function NewsDashboard() {
  const { refetch } = useNews();
  const articles = useStore((s) => s.newsArticles);
  const loading = useStore((s) => s.newsLoading);
  const error = useStore((s) => s.newsError);
  const setQuery = useStore((s) => s.setNewsQuery);
  const newsSort = useStore((s) => s.newsSort);
  const setNewsSort = useStore((s) => s.setNewsSort);

  const [searchInput, setSearchInput] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchInput);
  };

  const sortedArticles = useMemo(() => {
    let sorted = [...articles];
    if (newsSort === 'date') {
      sorted.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    } else if (newsSort === 'source') {
      sorted.sort((a, b) => (a.source?.name || '').localeCompare(b.source?.name || ''));
    }
    return sorted;
  }, [articles, newsSort]);

  return (
    <div
      className="rounded-2xl"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
          Breaking News
        </h2>
        <button
          onClick={refetch}
          className="px-4 py-1.5 rounded-md text-xs font-medium border transition-colors hover:opacity-80"
          style={{
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
            background: 'var(--bg-secondary)',
          }}
        >
          Refresh
        </button>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-3 px-6 pb-5">
        <form onSubmit={handleSearch} className="flex-1">
          <input
            type="text"
            placeholder="Search title, source, author..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none"
            style={{
              background: 'var(--bg-primary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
          />
        </form>
        <select
          value={newsSort}
          onChange={(e) => setNewsSort(e.target.value)}
          className="px-4 py-2.5 rounded-lg text-sm border outline-none cursor-pointer"
          style={{
            background: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
          }}
        >
          <option value="date">Sort by Date</option>
          <option value="source">Sort by Source</option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="mx-6 mb-4 p-4 rounded-lg border text-sm" style={{ borderColor: '#fca5a5', background: '#fef2f2', color: '#991b1b' }}>
          <p>{error}</p>
          <button onClick={refetch} className="mt-2 text-xs font-semibold underline">
            Try again
          </button>
        </div>
      )}

      {/* Articles List */}
      <div className="px-6 pb-6">
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-xl animate-pulse" style={{ background: 'var(--bg-primary)' }}>
                <div className="w-16 h-16 rounded-lg shrink-0" style={{ background: 'var(--border-color)' }} />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-3 rounded w-1/3" style={{ background: 'var(--border-color)' }} />
                  <div className="h-4 rounded w-full" style={{ background: 'var(--border-color)' }} />
                </div>
              </div>
            ))}
          </div>
        ) : sortedArticles.length > 0 ? (
          <div className="flex flex-col gap-2">
            {sortedArticles.slice(0, 10).map((article, i) => {
              const isExpanded = expandedId === i;
              return (
                <NewsRow
                  key={article.url || i}
                  article={article}
                  index={i}
                  isExpanded={isExpanded}
                  onToggle={() => setExpandedId(isExpanded ? null : i)}
                />
              );
            })}
          </div>
        ) : !error ? (
          <div className="py-12 text-center">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              No articles found.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ===== Individual News Row ===== */
function NewsRow({ article, index, isExpanded, onToggle }) {
  const sourceColors = [
    '#dc2626', '#2563eb', '#059669', '#d97706', '#7c3aed',
    '#db2777', '#0891b2', '#ea580c', '#4f46e5', '#16a34a',
  ];
  const sourceColor = sourceColors[index % sourceColors.length];

  return (
    <div
      className="rounded-xl border transition-all cursor-pointer"
      style={{
        borderColor: isExpanded ? sourceColor : 'var(--border-color)',
        background: 'var(--bg-secondary)',
      }}
      onClick={onToggle}
    >
      {/* Main Row */}
      <div className="flex items-center gap-3 p-3">
        {/* Thumbnail */}
        {article.image ? (
          <img
            src={article.image}
            alt=""
            className="w-16 h-16 rounded-lg object-cover shrink-0"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <div
            className="w-16 h-16 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold"
            style={{ background: sourceColor + '15', color: sourceColor }}
          >
            {(article.source?.name || '?').charAt(0)}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wide mb-0.5" style={{ color: sourceColor }}>
            {article.source?.name}
            <span className="ml-2 font-normal normal-case tracking-normal" style={{ color: 'var(--text-muted)' }}>
              {new Date(article.publishedAt).toLocaleString()}
            </span>
          </p>
          <h3
            className="text-sm font-semibold leading-snug"
            style={{
              color: 'var(--text-primary)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: isExpanded ? 'unset' : 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {article.title}
          </h3>
        </div>

        {/* Expand / Collapse Icon */}
        <div
          className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center transition-colors"
          style={{
            background: isExpanded ? sourceColor : 'transparent',
            color: isExpanded ? 'white' : sourceColor,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1">
              {article.description && (
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                  {article.description}
                </p>
              )}
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-semibold hover:underline"
                style={{ color: sourceColor }}
                onClick={(e) => e.stopPropagation()}
              >
                Read full article →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
