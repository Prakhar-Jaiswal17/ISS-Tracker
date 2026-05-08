import { useState, useCallback, useEffect } from 'react';
import { fetchNews } from '../services/newsApi';
import { getCache, setCache } from '../utils/cache';
import useStore from '../store/useStore';

export function useNews() {
  const category = useStore((s) => s.newsCategory);
  const query = useStore((s) => s.newsQuery);
  const setNewsArticles = useStore((s) => s.setNewsArticles);
  const setNewsLoading = useStore((s) => s.setNewsLoading);
  const setNewsError = useStore((s) => s.setNewsError);
  const [loaded, setLoaded] = useState(false);

  const loadNews = useCallback(async (force = false) => {
    const cacheKey = `news_${category}_${query}`;

    if (!force) {
      const cached = getCache(cacheKey);
      if (cached) {
        setNewsArticles(cached);
        setNewsLoading(false);
        setLoaded(true);
        return;
      }
    }

    setNewsLoading(true);
    setNewsError(null);

    try {
      const { articles } = await fetchNews({ category, query });
      setNewsArticles(articles);
      setCache(cacheKey, articles, 15); // 15 min cache
      setLoaded(true);
    } catch (err) {
      setNewsError(err.message);
      console.error('News fetch error:', err);
    } finally {
      setNewsLoading(false);
    }
  }, [category, query, setNewsArticles, setNewsLoading, setNewsError]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  return { refetch: () => loadNews(true), loaded };
}
