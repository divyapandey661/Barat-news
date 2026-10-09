import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Share2, Clock, Eye } from 'lucide-react';
import { NewsArticle } from '../types';
import { useNewsContext } from '../context/NewsContext';
import { ShareModal } from './ShareModal';

interface NewsCardProps {
  article: NewsArticle;
  variant?: 'standard' | 'horizontal' | 'compact' | 'lead';
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, variant = 'standard' }) => {
  const { toggleBookmark, isBookmarked } = useNewsContext();
  const [shareOpen, setShareOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const bookmarked = isBookmarked(article.id);
  const articleUrl = `${window.location.origin}/news/${article.slug}`;

  // Resilient fallback image or gradient backdrop
  const imageSource = imgError || !article.imageUrl
    ? '/src/assets/images/news_anchor_live_studio_1791541853405.jpg'
    : article.imageUrl;

  if (variant === 'compact') {
    return (
      <article className="group py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
        <div className="flex gap-3">
          <Link to={`/news/${article.slug}`} className="w-20 h-16 sm:w-24 sm:h-20 shrink-0 overflow-hidden rounded bg-slate-100 dark:bg-slate-800">
            <img
              src={imageSource}
              alt={article.title}
              onError={() => setImgError(true)}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] text-red-600 dark:text-red-400 font-semibold mb-1">
              <span>{article.category}</span>
              <span className="text-slate-400 dark:text-slate-600">·</span>
              <span className="text-slate-500 dark:text-slate-400 font-normal">{article.readTime}</span>
            </div>
            <Link
              to={`/news/${article.slug}`}
              className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 hover:text-red-600 dark:hover:text-red-400 line-clamp-2 leading-snug font-hindi transition-colors"
            >
              {article.title}
            </Link>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              <Clock className="w-3 h-3" />
              <span>{article.publishedAt.split(' ')[1] || article.publishedAt}</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className="group bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          <Link
            to={`/news/${article.slug}`}
            className="md:col-span-5 h-48 md:h-full min-h-[160px] overflow-hidden bg-slate-100 dark:bg-slate-800 relative"
          >
            <img
              src={imageSource}
              alt={article.title}
              onError={() => setImgError(true)}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          <div className="md:col-span-7 p-4 sm:p-5 flex flex-col justify-between">
            <div>
              {/* Unboxed clean metadata kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400 mb-1.5">
                <span>{article.category}</span>
                <span className="text-slate-400 dark:text-slate-600">·</span>
                <span className="text-slate-500 dark:text-slate-400 font-normal">{article.publishedAt}</span>
              </div>

              <Link
                to={`/news/${article.slug}`}
                className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 line-clamp-2 leading-snug font-hindi transition-colors"
              >
                {article.title}
              </Link>

              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 font-hindi leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {article.author.name}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(article)}
                  className={`p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                    bookmarked ? 'text-red-600' : 'text-slate-500 hover:text-slate-700'
                  }`}
                  title={bookmarked ? 'बुकमार्क हटाएं' : 'बुकमार्क करें'}
                  aria-label="Save bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => setShareOpen(true)}
                  className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 transition-colors"
                  title="शेयर करें"
                  aria-label="Share article"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <ShareModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          title={article.title}
          url={articleUrl}
        />
      </article>
    );
  }

  // Standard vertical card
  return (
    <article className="group bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        {/* Card Thumbnail */}
        <Link
          to={`/news/${article.slug}`}
          className="block h-48 overflow-hidden bg-slate-100 dark:bg-slate-800 relative"
        >
          <img
            src={imageSource}
            alt={article.title}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400 mb-1.5">
            <span>{article.category}</span>
            <span className="text-slate-400 dark:text-slate-600">·</span>
            <span className="text-slate-500 dark:text-slate-400 font-normal">{article.readTime}</span>
          </div>

          <Link
            to={`/news/${article.slug}`}
            className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 line-clamp-2 leading-snug font-hindi transition-colors"
          >
            {article.title}
          </Link>

          <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 font-hindi leading-relaxed">
            {article.summary}
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 pt-0">
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.publishedAt}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleBookmark(article)}
              className={`p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                bookmarked ? 'text-red-600' : 'text-slate-500 hover:text-slate-700'
              }`}
              title={bookmarked ? 'बुकमार्क हटाएं' : 'बुकमार्क करें'}
              aria-label="Save bookmark"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => setShareOpen(true)}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 transition-colors"
              title="शेयर करें"
              aria-label="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={article.title}
        url={articleUrl}
      />
    </article>
  );
};
