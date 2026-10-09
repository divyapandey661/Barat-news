import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, AlertCircle, ArrowLeft } from 'lucide-react';
import { NewsCard } from '../components/NewsCard';
import { NewsCardSkeleton } from '../components/Loading';
import { useNews } from '../hooks/useNews';
import { CATEGORIES } from '../data/sampleNews';
import { useNewsContext } from '../context/NewsContext';

export const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { language } = useNewsContext();

  useEffect(() => {
    setSearchInput(queryParam);
  }, [queryParam]);

  const { articles, loading, error } = useNews({
    query: queryParam,
    category: selectedCategory === 'all' ? undefined : selectedCategory,
    pageSize: 12,
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Search Header Form */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs">
        <h1 className="text-xl sm:text-2xl font-black font-hindi text-slate-900 dark:text-white mb-4">
          {language === 'hi' ? 'समाचार खोजें (News Search)' : 'Search News Articles'}
        </h1>

        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="शीर्षक, कीवर्ड या राजनेता का नाम लिखें (उदा. बजट, संसद, क्रिकेट)..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white font-hindi focus:outline-hidden focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm transition-colors font-hindi whitespace-nowrap"
          >
            खोजें (Search)
          </button>
        </form>

        {/* Category Filters */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs text-slate-500 font-hindi shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> श्रेणी:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`whitespace-nowrap px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              selectedCategory === 'all'
                ? 'bg-red-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            सभी
          </button>
          {CATEGORIES.slice(2).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`whitespace-nowrap px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {language === 'hi' ? cat.name : cat.englishName}
            </button>
          ))}
        </div>
      </div>

      {/* Query Stats */}
      {queryParam && (
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 font-hindi">
          <span>
            "<strong>{queryParam}</strong>" के लिए खोज परिणाम: {articles.length} समाचार प्राप्त हुए
          </span>
        </div>
      )}

      {/* Results Grid */}
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

      {/* No Results Found */}
      {!loading && articles.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-hindi">
            कोई संबंधित समाचार नहीं मिला
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-hindi max-w-md mx-auto">
            "{queryParam}" के लिए कोई परिणाम नहीं मिला। कृपया अन्य शब्द, श्रेणी या सामान्य कीवर्ड आजमाएं।
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold font-hindi transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>मुख्य पृष्ठ पर वापस जाएं</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
