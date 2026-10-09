import axios from 'axios';
import { NewsArticle } from '../types';
import { SAMPLE_ARTICLES } from '../data/sampleNews';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY || '';
const API_BASE_URL = import.meta.env.VITE_NEWS_API_URL || 'https://newsapi.org/v2';

// Axios instance with timeout and standard headers
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface FetchArticlesParams {
  category?: string;
  query?: string;
  page?: number;
  pageSize?: number;
}

export interface ArticlesResponse {
  articles: NewsArticle[];
  totalResults: number;
  page: number;
  pageSize: number;
  isRealApi: boolean;
}

/**
 * Fetch news articles with category, search query, or pagination support.
 * Gracefully defaults to structured Hindi news dataset if no external API key is set or on error.
 */
export async function getArticles(params: FetchArticlesParams = {}): Promise<ArticlesResponse> {
  const { category, query, page = 1, pageSize = 8 } = params;

  // If user provided a real News API key, attempt real network request
  if (API_KEY && API_KEY !== 'MY_NEWS_API_KEY') {
    try {
      const response = await apiClient.get('/top-headlines', {
        params: {
          country: 'in',
          category: category && category !== 'all' && category !== 'home' ? category : undefined,
          q: query || undefined,
          page,
          pageSize,
          apiKey: API_KEY,
        },
      });

      if (response.data && response.data.articles) {
        // Map external API items to our NewsArticle interface
        const mappedArticles: NewsArticle[] = response.data.articles.map((item: any, idx: number) => ({
          id: `ext-${page}-${idx}`,
          slug: (item.title || `article-${idx}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60),
          title: item.title || 'शीर्ष समाचार',
          englishTitle: item.title,
          summary: item.description || item.content?.slice(0, 150) || 'विस्तृत समाचार पढ़ने के लिए क्लिक करें।',
          content: [
            item.content || item.description || 'समाचार की विस्तृत रिपोर्ट तैयार की जा रही है।',
            'भारत न्यूज़ 24x7 की टीम निष्पक्ष और तथ्यात्मक रिपोर्टिंग के लिए प्रतिबद्ध है।'
          ],
          category: category || 'ताज़ा खबरें',
          categorySlug: category || 'latest',
          imageUrl: item.urlToImage || '/src/assets/images/news_anchor_live_studio_1791541853405.jpg',
          imageCaption: item.source?.name ? `स्रोत: ${item.source.name}` : undefined,
          author: {
            name: item.author || 'भारत न्यूज़ डेस्क',
            role: 'संवाददाता'
          },
          publishedAt: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('hi-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }) : 'आज',
          readTime: '3 मिनट',
          tags: ['ताज़ा समाचार', 'भारत', 'अपडेट']
        }));

        return {
          articles: mappedArticles,
          totalResults: response.data.totalResults || mappedArticles.length,
          page,
          pageSize,
          isRealApi: true,
        };
      }
    } catch (error) {
      console.warn('Real News API request failed or rate-limited; falling back to local Hindi news repository:', error);
    }
  }

  // Fallback to local curated Hindi news repository
  let filtered = [...SAMPLE_ARTICLES];

  if (category && category !== 'all' && category !== 'home') {
    filtered = filtered.filter(
      (a) => a.categorySlug.toLowerCase() === category.toLowerCase() ||
             a.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (query && query.trim() !== '') {
    const q = query.toLowerCase().trim();
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  const startIdx = (page - 1) * pageSize;
  const paginatedArticles = filtered.slice(startIdx, startIdx + pageSize);

  return {
    articles: paginatedArticles,
    totalResults: filtered.length,
    page,
    pageSize,
    isRealApi: false,
  };
}

/**
 * Fetch a single article by slug or id
 */
export async function getArticleBySlug(slug: string): Promise<NewsArticle | null> {
  const found = SAMPLE_ARTICLES.find((a) => a.slug === slug || a.id === slug);
  return found || null;
}
