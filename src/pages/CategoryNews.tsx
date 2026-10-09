import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { NewsCard } from '../components/NewsCard';
import { TrendingNews } from '../components/TrendingNews';
import { CATEGORIES } from '../data/sampleNews';
import { useNews } from '../hooks/useNews';
import { useNewsContext } from '../context/NewsContext';

export const CategoryNews: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useNewsContext();

  const currentCategory = CATEGORIES.find(
    (c) => c.slug.toLowerCase() === (slug || '').toLowerCase()
  ) || {
    id: 'unknown',
    name: slug || 'समाचार',
    englishName: slug || 'News',
    slug: slug || 'news',
    description: 'श्रेणी के मुख्य समाचार और कवरेज',
  };

  const { articles, loading, error, hasMore, loadMore } = useNews({
    category: slug,
    pageSize: 8,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-hindi">
        <Link to="/" className="hover:text-red-600 transition-colors">होम</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 dark:text-slate-200 font-semibold">
          {language === 'hi' ? currentCategory.name : currentCategory.englishName}
        </span>
      </nav>

      {/* Category Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-xs border-l-4 border-l-red-600">
        <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider mb-2">
          <span>विशेष कवरेज</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-hindi text-slate-900 dark:text-white">
          {language === 'hi' ? currentCategory.name : currentCategory.englishName}
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 font-hindi max-w-2xl">
          {currentCategory.description}
        </p>
      </div>

      {/* Main Grid + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Category Feed */}
        <div className="lg:col-span-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200 font-hindi">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {articles.map((article) => (
              <NewsCard key={article.id} article={article} variant="standard" />
            ))}
          </div>

          {/* Empty state */}
          {!loading && articles.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 font-hindi text-base">
                वर्तमान में इस श्रेणी में कोई समाचार उपलब्ध नहीं है।
              </p>
              <Link
                to="/"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold font-hindi"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>मुख्य पृष्ठ पर लौटें</span>
              </Link>
            </div>
          )}

          {hasMore && (
            <div className="text-center pt-4">
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-6 py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-lg transition-colors font-hindi disabled:opacity-50"
              >
                {loading ? 'लोड हो रहा है...' : 'और समाचार देखें'}
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 sticky top-16">
          <TrendingNews />
        </div>
      </div>
    </div>
  );
};
