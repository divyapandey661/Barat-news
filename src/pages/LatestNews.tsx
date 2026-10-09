import React, { useState } from 'react';
import { Flame, Filter, RefreshCw } from 'lucide-react';
import { NewsCard } from '../components/NewsCard';
import { NewsCardSkeleton } from '../components/Loading';
import { useNews } from '../hooks/useNews';
import { CATEGORIES } from '../data/sampleNews';
import { useNewsContext } from '../context/NewsContext';

export const LatestNews: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { language } = useNewsContext();

  const { articles, loading, error, hasMore, loadMore, refetch } = useNews({
    category: selectedCategory === 'all' ? undefined : selectedCategory,
    pageSize: 6,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b-2 border-red-600 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Flame className="w-4 h-4" />
            <span>24x7 लाइव न्यूज़ फीड</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-hindi text-slate-900 dark:text-white">
            {language === 'hi' ? 'ताज़ा खबरें और मुख्य अपडेट्स' : 'Latest News & Breaking Updates'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-hindi mt-1">
            देश, दुनिया, राजनीति और अर्थव्यवस्था से जुड़ी हर ताज़ा जानकारी
          </p>
        </div>

        <button
          onClick={() => refetch()}
          className="self-start md:self-auto flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>ताज़ा करें (Refresh)</span>
        </button>
      </div>

      {/* Category Filter Pills (Interactive button elements per frontend-design skill) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
        <button
          onClick={() => setSelectedCategory('all')}
          className={`whitespace-nowrap px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors font-hindi ${
            selectedCategory === 'all'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          सभी खबरें (All)
        </button>
        {CATEGORIES.slice(2).map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`whitespace-nowrap px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors font-hindi ${
              selectedCategory === cat.slug
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {language === 'hi' ? cat.name : cat.englishName}
          </button>
        ))}
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-lg text-sm border border-red-200 dark:border-red-900 font-hindi">
          {error}
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} variant="standard" />
        ))}

        {loading && (
          <>
            <NewsCardSkeleton />
            <NewsCardSkeleton />
            <NewsCardSkeleton />
          </>
        )}
      </div>

      {/* Empty State */}
      {!loading && articles.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 font-hindi text-base">
            इस श्रेणी में फिलहाल कोई समाचार उपलब्ध नहीं है।
          </p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold font-hindi"
          >
            सभी खबरें देखें
          </button>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-4">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs sm:text-sm font-bold rounded-lg transition-colors font-hindi disabled:opacity-50"
          >
            {loading ? 'लोड हो रहा है...' : 'और खबरें लोड करें (Load More)'}
          </button>
        </div>
      )}
    </div>
  );
};
