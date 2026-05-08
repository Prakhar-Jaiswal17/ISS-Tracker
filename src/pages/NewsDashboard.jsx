import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNews } from '../hooks/useNews';
import useStore from '../store/useStore';

const SOURCE_COLORS = [
  '#dc2626', '#2563eb', '#059669', '#d97706', '#7c3aed',
  '#db2777', '#0891b2', '#ea580c', '#4f46e5', '#16a34a',
];

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
    <div className="card">
      {/* Header */}
      <div className="card-header">
        <h2 className="card-title">Breaking News</h2>
        <button className="pill-btn" onClick={refetch}>Refresh</button>
      </div>

      {/* Search */}
      <div className="search-row">
        <form onSubmit={handleSearch} style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="Search title, source, author..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
        </form>
        <select
          value={newsSort}
          onChange={(e) => setNewsSort(e.target.value)}
          className="sort-select"
        >
          <option value="date">Sort by Date</option>
          <option value="source">Sort by Source</option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="error-box">
          <p>{error}</p>
          <button className="error-retry" onClick={refetch}>Try again</button>
        </div>
      )}

      {/* Articles */}
      {loading ? (
        <div className="news-list">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton-row">
              <div className="skeleton-thumb" />
              <div className="skeleton-lines">
                <div className="skeleton-line short" />
                <div className="skeleton-line full" />
              </div>
            </div>
          ))}
        </div>
      ) : sortedArticles.length > 0 ? (
        <div className="news-list">
          {sortedArticles.slice(0, 10).map((article, i) => {
            const isExpanded = expandedId === i;
            const color = SOURCE_COLORS[i % SOURCE_COLORS.length];
            return (
              <div
                key={article.url || i}
                className="news-row"
                style={{ borderColor: isExpanded ? color : undefined }}
                onClick={() => setExpandedId(isExpanded ? null : i)}
              >
                <div className="news-row-inner">
                  {/* Thumbnail */}
                  {article.image ? (
                    <img
                      src={article.image}
                      alt=""
                      className="news-thumb"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div
                      className="news-thumb-placeholder"
                      style={{ background: color + '15', color: color }}
                    >
                      {(article.source?.name || '?').charAt(0)}
                    </div>
                  )}

                  {/* Content */}
                  <div className="news-content">
                    <p className="news-source" style={{ color }}>
                      {article.source?.name}
                      <span className="news-date">
                        {new Date(article.publishedAt).toLocaleString()}
                      </span>
                    </p>
                    <h3 className={`news-title ${isExpanded ? 'expanded' : ''}`}>
                      {article.title}
                    </h3>
                  </div>

                  {/* Expand icon */}
                  <div
                    className="news-expand-btn"
                    style={{
                      background: isExpanded ? color : 'transparent',
                      color: isExpanded ? 'white' : color,
                    }}
                  >
                    <svg
                      width="14" height="14" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                      style={{
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.2s',
                      }}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="news-expanded-body">
                        {article.description && (
                          <p className="news-desc">{article.description}</p>
                        )}
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="news-link"
                          style={{ color }}
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
          })}
        </div>
      ) : !error ? (
        <div className="empty-state">No articles found.</div>
      ) : null}
    </div>
  );
}
