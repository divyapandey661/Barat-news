import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { BreakingNews } from '../components/BreakingNews';
import { FeaturedNews } from '../components/FeaturedNews';
import { NewsCard } from '../components/NewsCard';
import { TrendingNews } from '../components/TrendingNews';
import { VideoSection } from '../components/VideoSection';
import { PhotoGallery } from '../components/PhotoGallery';
import { SAMPLE_ARTICLES } from '../data/sampleNews';
import { useNewsContext } from '../context/NewsContext';

export const Home: React.FC = () => {
  const { language } = useNewsContext();

  const leadArticle = SAMPLE_ARTICLES[0];
  const sideArticles = SAMPLE_ARTICLES.slice(1, 4);

  // Group articles for category-wise sections
  const indiaArticles = SAMPLE_ARTICLES.filter((a) => a.categorySlug === 'india' || a.categorySlug === 'politics');
  const upArticles = SAMPLE_ARTICLES.filter((a) => a.categorySlug === 'uttar-pradesh');
  const businessArticles = SAMPLE_ARTICLES.filter((a) => a.categorySlug === 'business');
  const techArticles = SAMPLE_ARTICLES.filter((a) => a.categorySlug === 'technology');
  const sportsArticles = SAMPLE_ARTICLES.filter((a) => a.categorySlug === 'sports');
  const entertainmentArticles = SAMPLE_ARTICLES.filter((a) => a.categorySlug === 'entertainment');

  return (
    <div className="space-y-8">
      {/* Breaking News Ticker */}
      <BreakingNews />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Main Headlines Section */}
        <FeaturedNews leadArticle={leadArticle} sideArticles={sideArticles} />

        {/* 2-Column Core Layout: Primary News Feeds + Trending Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* National & Politics News Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b-2 border-red-600">
                <h2 className="text-xl sm:text-2xl font-black font-hindi text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-red-600 inline-block rounded-xs" />
                  <span>{language === 'hi' ? 'देश एवं राजनीति' : 'National & Politics'}</span>
                </h2>
                <Link
                  to="/category/india"
                  className="text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 dark:text-red-400 font-hindi flex items-center gap-1 group"
                >
                  <span>{language === 'hi' ? 'सभी देखें' : 'View All'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {indiaArticles.map((article) => (
                  <NewsCard key={article.id} article={article} variant="standard" />
                ))}
                {/* Fallback to other articles if empty */}
                {indiaArticles.length < 2 && SAMPLE_ARTICLES.slice(4, 6).map((article) => (
                  <NewsCard key={article.id} article={article} variant="standard" />
                ))}
              </div>
            </section>

            {/* Uttar Pradesh News Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b-2 border-red-600">
                <h2 className="text-xl sm:text-2xl font-black font-hindi text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-red-600 inline-block rounded-xs" />
                  <span>{language === 'hi' ? 'उत्तर प्रदेश खास' : 'Uttar Pradesh Special'}</span>
                </h2>
                <Link
                  to="/category/uttar-pradesh"
                  className="text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 dark:text-red-400 font-hindi flex items-center gap-1 group"
                >
                  <span>{language === 'hi' ? 'सभी देखें' : 'View All'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {upArticles.length > 0 ? (
                upArticles.map((article) => (
                  <NewsCard key={article.id} article={article} variant="horizontal" />
                ))
              ) : (
                <NewsCard article={SAMPLE_ARTICLES[3]} variant="horizontal" />
              )}
            </section>

            {/* Business & Economy Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b-2 border-red-600">
                <h2 className="text-xl sm:text-2xl font-black font-hindi text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-red-600 inline-block rounded-xs" />
                  <span>{language === 'hi' ? 'बिजनेस एवं बाजार' : 'Business & Markets'}</span>
                </h2>
                <Link
                  to="/category/business"
                  className="text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 dark:text-red-400 font-hindi flex items-center gap-1 group"
                >
                  <span>{language === 'hi' ? 'सभी देखें' : 'View All'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {businessArticles.map((article) => (
                  <NewsCard key={article.id} article={article} variant="standard" />
                ))}
                {techArticles.slice(0, 1).map((article) => (
                  <NewsCard key={article.id} article={article} variant="standard" />
                ))}
              </div>
            </section>

            {/* Sports & Entertainment Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Sports Column */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-300 dark:border-slate-700">
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white font-hindi">
                    खेल समाचार
                  </h3>
                  <Link to="/category/sports" className="text-xs font-bold text-red-600 hover:underline">
                    अधिक →
                  </Link>
                </div>
                {sportsArticles.length > 0 ? (
                  sportsArticles.map((article) => (
                    <NewsCard key={article.id} article={article} variant="compact" />
                  ))
                ) : (
                  <NewsCard article={SAMPLE_ARTICLES[5]} variant="compact" />
                )}
              </div>

              {/* Entertainment Column */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-300 dark:border-slate-700">
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white font-hindi">
                    मनोरंजन व सिनेमा
                  </h3>
                  <Link to="/category/entertainment" className="text-xs font-bold text-red-600 hover:underline">
                    अधिक →
                  </Link>
                </div>
                {entertainmentArticles.length > 0 ? (
                  entertainmentArticles.map((article) => (
                    <NewsCard key={article.id} article={article} variant="compact" />
                  ))
                ) : (
                  <NewsCard article={SAMPLE_ARTICLES[4]} variant="compact" />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 sticky top-16">
            <TrendingNews />
          </div>
        </div>

        {/* Video News Section */}
        <VideoSection />

        {/* Photo Gallery Section */}
        <PhotoGallery />
      </div>
    </div>
  );
};
