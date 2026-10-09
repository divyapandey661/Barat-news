import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Bookmark, Share2 } from 'lucide-react';
import { NewsArticle } from '../types';
import { useNewsContext } from '../context/NewsContext';
import { ShareModal } from './ShareModal';

interface FeaturedNewsProps {
  leadArticle: NewsArticle;
  sideArticles: NewsArticle[];
}

export const FeaturedNews: React.FC<FeaturedNewsProps> = ({ leadArticle, sideArticles }) => {
  const { toggleBookmark, isBookmarked, language } = useNewsContext();
  const [shareOpen, setShareOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const bookmarked = isBookmarked(leadArticle.id);
  const leadUrl = `${window.location.origin}/news/${leadArticle.slug}`;

  const imageSource = imgError || !leadArticle.imageUrl
    ? '/src/assets/images/breaking_india_politics_1791541867462.jpg'
    : leadArticle.imageUrl;

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Left Side: Large Featured Lead Story */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="relative overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800 aspect-16/9 group">
              <img
                src={imageSource}
                alt={leadArticle.title}
                onError={() => setImgError(true)}
                referrerPolicy="no-referrer"
                loading="eager"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-red-600 text-white font-bold text-xs uppercase px-2.5 py-1 rounded-sm shadow-md">
                बड़ी खबर
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400 mb-2">
                <span>{leadArticle.category}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500 dark:text-slate-400 font-normal">{leadArticle.publishedAt}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500 dark:text-slate-400 font-normal">{leadArticle.readTime}</span>
              </div>

              <Link
                to={`/news/${leadArticle.slug}`}
                className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 leading-snug font-hindi transition-colors block"
              >
                {leadArticle.title}
              </Link>

              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-hindi leading-relaxed line-clamp-3">
                {leadArticle.summary}
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <Link
              to={`/news/${leadArticle.slug}`}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg transition-colors"
            >
              <span>{language === 'hi' ? 'पूरी खबर पढ़ें' : 'Read Full Story'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleBookmark(leadArticle)}
                className={`p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                  bookmarked ? 'text-red-600 border-red-300' : 'text-slate-500'
                }`}
                title={bookmarked ? 'बुकमार्क हटाएं' : 'बुकमार्क करें'}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => setShareOpen(true)}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                title="शेयर करें"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Multiple Smaller News Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 lg:pl-8 pt-6 lg:pt-0">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-2">
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white font-hindi flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-xs bg-red-600" />
              <span>शीर्ष सुर्खियां (Top Headlines)</span>
            </h3>
          </div>

          <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800/80">
            {sideArticles.slice(0, 3).map((article) => (
              <div key={article.id} className="pt-3 first:pt-0 group">
                <div className="flex gap-4">
                  <Link
                    to={`/news/${article.slug}`}
                    className="w-24 sm:w-28 h-20 shrink-0 overflow-hidden rounded bg-slate-100 dark:bg-slate-800"
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[11px] text-red-600 dark:text-red-400 font-semibold mb-1">
                      <span>{article.category}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500 dark:text-slate-400 font-normal">{article.readTime}</span>
                    </div>

                    <Link
                      to={`/news/${article.slug}`}
                      className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 line-clamp-2 leading-snug font-hindi transition-colors block"
                    >
                      {article.title}
                    </Link>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                      <Clock className="w-3 h-3" />
                      <span>{article.publishedAt.split(' ')[1] || article.publishedAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Notice Strip */}
          <div className="mt-5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 flex items-center justify-between">
            <span className="text-xs text-red-800 dark:text-red-300 font-hindi font-medium">
              पल-पल की ताज़ा खबरों के लिए लाइव टीवी देखें
            </span>
            <Link
              to="/live-tv"
              className="text-xs font-bold text-red-600 hover:text-red-700 dark:text-red-400 whitespace-nowrap ml-2 underline"
            >
              लाइव देखें →
            </Link>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={leadArticle.title}
        url={leadUrl}
      />
    </section>
  );
};
