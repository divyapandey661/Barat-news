import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Flame, Radio, Hash } from 'lucide-react';
import { SAMPLE_ARTICLES, LIVE_BULLETINS } from '../data/sampleNews';
import { useNewsContext } from '../context/NewsContext';

export const TrendingNews: React.FC = () => {
  const { language } = useNewsContext();
  const trendingArticles = SAMPLE_ARTICLES.filter((a) => a.isTrending || (a.views && a.views > 30000)).slice(0, 5);

  const popularTags = [
    '#बजट2026', '#इसरो_मिशन', '#शेयर_बाजार', '#क्रिकेट_टेस्ट',
    '#संसद_सत्र', '#यूपी_एक्सप्रेसवे', '#एआई_टेक्नोलॉजी', '#ग्लोबल_समिट'
  ];

  return (
    <aside className="space-y-6">
      {/* Most Read / Trending Headlines */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white font-hindi flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-600" />
            <span>{language === 'hi' ? 'सबसे ज्यादा पढ़ी गई' : 'Most Read'}</span>
          </h3>
          <span className="text-xs text-red-600 dark:text-red-400 font-semibold uppercase tracking-wider">
            ट्रेंडिंग
          </span>
        </div>

        <div className="space-y-4">
          {trendingArticles.map((article, idx) => (
            <div key={article.id} className="flex items-start gap-3 group">
              <span className="font-black text-2xl lg:text-3xl text-slate-300 dark:text-slate-700 group-hover:text-red-600 transition-colors shrink-0 tabular-nums w-7 text-right">
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <Link
                  to={`/news/${article.slug}`}
                  className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 group-hover:text-red-600 dark:group-hover:text-red-400 font-hindi line-clamp-2 leading-snug transition-colors"
                >
                  {article.title}
                </Link>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  <span>{article.category}</span>
                  <span>·</span>
                  <span>{article.views ? `${(article.views / 1000).toFixed(0)}k दृश्य` : 'आज'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Speed Bulletins */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-500 animate-pulse" />
            <h3 className="font-extrabold text-sm sm:text-base font-hindi">
              {language === 'hi' ? 'स्पीड बुलेटिन' : 'Speed Bulletin'}
            </h3>
          </div>
          <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">
            LIVE
          </span>
        </div>

        <div className="space-y-3">
          {LIVE_BULLETINS.map((item) => (
            <div key={item.id} className="pb-3 border-b border-slate-800/80 last:border-0 last:pb-0">
              <span className="text-[10px] text-amber-400 font-bold block mb-0.5">{item.time}</span>
              <p className="text-xs text-slate-300 font-hindi leading-relaxed hover:text-white transition-colors">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics / Hashtags */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
          <Hash className="w-4 h-4 text-red-600" />
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white font-hindi">
            {language === 'hi' ? 'चर्चित विषय' : 'Trending Topics'}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {popularTags.map((tag) => (
            <Link
              key={tag}
              to={`/search?q=${encodeURIComponent(tag.replace('#', ''))}`}
              className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 rounded-md font-medium transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};
