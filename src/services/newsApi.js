const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

// In production (Vercel), use the rewrite proxy to avoid CORS.
// In dev, Vite proxy handles it.
const BASE_URL = '/api/news';

/**
 * Fetch top headlines from GNews.io
 * Limited to 10 articles max to stay within free-tier rate limits
 */
export async function fetchNews({ category = 'general', query = '', max = 10 } = {}) {
  const params = new URLSearchParams({
    max: String(Math.min(max, 10)),
    lang: 'en',
    apikey: API_KEY || '',
  });

  let url;
  if (query) {
    params.set('q', query);
    url = `${BASE_URL}/search?${params.toString()}`;
  } else {
    params.set('category', category);
    url = `${BASE_URL}/top-headlines?${params.toString()}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    if (res.status === 429) {
      throw new Error('API rate limit reached. Please wait a moment before refreshing.');
    }
    throw new Error(body.errors?.[0] || `News API error: ${res.status}`);
  }

  const data = await res.json();
  return {
    articles: (data.articles || []).filter((a) => a.title && a.title !== '[Removed]'),
    totalResults: data.totalArticles || 0,
  };
}
