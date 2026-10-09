import { useState, useEffect, useCallback } from 'react';
import { NewsArticle } from '../types';
import { getArticles, FetchArticlesParams } from '../services/newsApi';

export function useNews(initialParams: FetchArticlesParams = {}) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialParams.page || 1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [isRealApi, setIsRealApi] = useState<boolean>(false);

  const fetchNews = useCallback(async (params: FetchArticlesParams, append = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getArticles(params);
      setIsRealApi(response.isRealApi);
      setTotalResults(response.totalResults);

      if (append) {
        setArticles((prev) => [...prev, ...response.articles]);
      } else {
        setArticles(response.articles);
      }

      setHasMore(params.page ? params.page * (params.pageSize || 8) < response.totalResults : false);
    } catch (err: any) {
      setError(err?.message || 'समाचार लोड करने में असमर्थ। कृपया पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews({ ...initialParams, page: 1 }, false);
    setPage(1);
  }, [initialParams.category, initialParams.query]);

  const loadMore = () => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews({ ...initialParams, page: nextPage }, true);
  };

  return {
    articles,
    loading,
    error,
    hasMore,
    totalResults,
    isRealApi,
    loadMore,
    refetch: () => fetchNews({ ...initialParams, page: 1 }, false),
  };
}
