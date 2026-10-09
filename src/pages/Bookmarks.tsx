import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, ArrowLeft } from 'lucide-react';
import { useNewsContext } from '../context/NewsContext';
import { NewsCard } from '../components/NewsCard';

export const Bookmarks: React.FC = () => {
  const { bookmarks, clearBookmarks, language } = useNewsContext();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b-2 border-red-600 gap-4">
        <div>
          <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Bookmark className="w-4 h-4 fill-current" />
            <span>व्यक्तिगत संग्रह</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-hindi text-slate-900 dark:text-white">
            {language === 'hi' ? 'सहेजे गए समाचार (Bookmarks)' : 'Saved News Articles'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-hindi mt-1">
            आपके द्वारा भविष्य में पढ़ने के लिए सुरक्षित किए गए लेख ({bookmarks.length})
          </p>
        </div>

        {bookmarks.length > 0 && (
          <button
            onClick={clearBookmarks}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-950/60 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 rounded-lg text-xs font-bold transition-colors font-hindi"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>सभी हटाएं (Clear All)</span>
          </button>
        )}
      </div>

      {/* Grid of Saved Articles */}
      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((article) => (
            <NewsCard key={article.id} article={article} variant="standard" />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-hindi">
            कोई सहेजी गई खबर नहीं मिली
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-hindi max-w-md mx-auto">
            खबर पढ़ते समय बुकमार्क आइकन पर क्लिक करके आप अपनी पसंदीदा खबरों को यहां बाद में पढ़ने के लिए सहेज सकते हैं।
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold font-hindi transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>ताज़ा खबरें देखें</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
