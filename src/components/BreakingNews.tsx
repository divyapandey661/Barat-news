import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Pause, Play, ChevronRight } from 'lucide-react';
import { BREAKING_HEADLINES } from '../data/sampleNews';
import { useNewsContext } from '../context/NewsContext';

export const BreakingNews: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const { language } = useNewsContext();

  return (
    <div className="bg-red-700 text-white border-y border-red-800 shadow-xs relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Breaking Badge Label */}
        <div className="bg-red-900 text-white px-3 sm:px-5 py-2.5 flex items-center gap-2 shrink-0 z-10 shadow-md">
          <AlertCircle className="w-4 h-4 text-amber-300 animate-pulse" />
          <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap">
            {language === 'hi' ? 'ब्रेकिंग न्यूज़' : 'BREAKING NEWS'}
          </span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white animate-ping" />
        </div>

        {/* Scrolling Ticker Track */}
        <div
          className="flex-1 overflow-hidden relative py-2 px-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`whitespace-nowrap inline-flex items-center gap-8 ${
              isPaused ? '' : 'animate-ticker'
            }`}
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {/* Duplicated for infinite seamless marquee */}
            {[...BREAKING_HEADLINES, ...BREAKING_HEADLINES].map((item, idx) => (
              <Link
                key={`${item.id}-${idx}`}
                to={`/news/${item.slug}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold hover:text-amber-200 transition-colors font-hindi group"
              >
                <ChevronRight className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-0.5 transition-transform" />
                <span>{item.text}</span>
                <span className="text-red-400 font-light mx-2">|</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Play/Pause control button */}
        <div className="hidden sm:flex items-center pr-3 shrink-0 z-10">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 rounded bg-red-800/80 hover:bg-red-900 text-white/90 hover:text-white transition-colors"
            title={isPaused ? 'टिकर शुरू करें' : 'टिकर रोकें'}
            aria-label={isPaused ? 'Resume ticker' : 'Pause ticker'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
