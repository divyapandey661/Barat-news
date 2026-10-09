import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  Bookmark,
  Share2,
  ChevronLeft,
  ChevronRight,
  User,
  Eye,
  Type,
  ArrowLeft,
  Check,
  Copy,
} from 'lucide-react';
import { SAMPLE_ARTICLES } from '../data/sampleNews';
import { NewsArticle } from '../types';
import { useNewsContext } from '../context/NewsContext';
import { NewsCard } from '../components/NewsCard';
import { TrendingNews } from '../components/TrendingNews';
import { ShareModal } from '../components/ShareModal';

export const NewsDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toggleBookmark, isBookmarked, language, fontSize, setFontSize } = useNewsContext();
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [article, setArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    // Find article by slug or ID
    const found = SAMPLE_ARTICLES.find((a) => a.slug === slug || a.id === slug);
    if (found) {
      setArticle(found);
      // Update browser document title dynamically
      document.title = `${found.title} - भारत न्यूज़ 24x7`;
    } else {
      // Default to first article if not found
      setArticle(SAMPLE_ARTICLES[0]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!article) return null;

  const currentIndex = SAMPLE_ARTICLES.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? SAMPLE_ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < SAMPLE_ARTICLES.length - 1 ? SAMPLE_ARTICLES[currentIndex + 1] : null;

  const relatedArticles = SAMPLE_ARTICLES.filter(
    (a) => a.id !== article.id && (a.categorySlug === article.categorySlug || a.category === article.category)
  ).slice(0, 3);

  const bookmarked = isBookmarked(article.id);
  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Font size class mapping
  const contentFontSizeClass = {
    normal: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-loose',
    xlarge: 'text-xl sm:text-2xl leading-loose',
  }[fontSize];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-hindi">
        <Link to="/" className="hover:text-red-600 transition-colors">होम</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/category/${article.categorySlug}`} className="hover:text-red-600 transition-colors">
          {article.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-xs sm:max-w-md">
          {article.title}
        </span>
      </nav>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Article Container */}
        <article className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-8 shadow-xs space-y-6">
          {/* Header Metadata */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
              <Link to={`/category/${article.categorySlug}`} className="hover:underline">
                {article.category}
              </Link>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500 font-normal">{article.readTime}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight font-hindi">
              {article.title}
            </h1>

            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-hindi font-medium leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Reporter Byline & Utility Bar */}
          <div className="py-3 border-y border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center font-bold text-sm">
                <User className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900 dark:text-white block">
                  {article.author.name}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {article.author.role} · नई दिल्ली
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-red-600" />
                <span>प्रकाशित: {article.publishedAt}</span>
              </div>
              {article.updatedAt && (
                <div className="hidden sm:inline-block">
                  · अपडेट: {article.updatedAt}
                </div>
              )}
            </div>
          </div>

          {/* Interactive Utility Controls (Font Size, Bookmark, Share) */}
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
            {/* Font Size Adjuster */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500 dark:text-slate-400 mr-1 hidden sm:inline-block">
                फ़ॉन्ट आकार:
              </span>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded font-bold ${fontSize === 'normal' ? 'bg-red-600 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                title="सामान्य फ़ॉन्ट"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded font-bold ${fontSize === 'large' ? 'bg-red-600 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                title="बड़ा फ़ॉन्ट"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 rounded font-bold ${fontSize === 'xlarge' ? 'bg-red-600 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                title="अति बड़ा फ़ॉन्ट"
              >
                A++
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark(article)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  bookmarked
                    ? 'bg-red-600 text-white'
                    : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                <span>{bookmarked ? 'सहेजा गया' : 'बुकमार्क'}</span>
              </button>

              <button
                onClick={() => setShareOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-red-600" />
                <span>शेयर</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="p-1.5 rounded-md text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors"
                title="लिंक कॉपी करें"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              src={article.imageUrl}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-auto aspect-16/9 object-cover"
            />
            {article.imageCaption && (
              <p className="p-3 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 font-hindi">
                {article.imageCaption}
              </p>
            )}
          </div>

          {/* Full Article Content */}
          <div className={`space-y-5 text-slate-800 dark:text-slate-200 font-hindi ${contentFontSizeClass}`}>
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="tracking-normal leading-relaxed">
                {idx === 0 && (
                  <span className="font-extrabold text-slate-900 dark:text-white mr-1">
                    नई दिल्ली (भारत न्यूज़ 24x7 ब्यूरो):
                  </span>
                )}
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 font-hindi">
              संबंधित विषय व टैग:
            </span>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/search?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-700 dark:text-slate-300 hover:text-red-600 rounded-md text-xs font-medium font-hindi transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Share Bar */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-sm font-bold text-slate-900 dark:text-white font-hindi">
              इस खबर को अपने मित्रों के साथ साझा करें:
            </span>
            <div className="flex items-center gap-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title)}%20${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-black hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors"
              >
                X (Twitter)
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Previous / Next Article Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 font-hindi">
            {prevArticle ? (
              <Link
                to={`/news/${prevArticle.slug}`}
                className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-red-500 transition-colors group block text-left"
              >
                <span className="text-xs text-slate-400 flex items-center gap-1 group-hover:text-red-600">
                  <ChevronLeft className="w-3.5 h-3.5" /> पिछली खबर
                </span>
                <p className="mt-1 font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-red-600">
                  {prevArticle.title}
                </p>
              </Link>
            ) : <div />}

            {nextArticle ? (
              <Link
                to={`/news/${nextArticle.slug}`}
                className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-red-500 transition-colors group block text-right"
              >
                <span className="text-xs text-slate-400 flex items-center justify-end gap-1 group-hover:text-red-600">
                  अगली खबर <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <p className="mt-1 font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-red-600">
                  {nextArticle.title}
                </p>
              </Link>
            ) : <div />}
          </div>
        </article>

        {/* Sidebar */}
        <div className="lg:col-span-4 sticky top-16 space-y-6">
          <TrendingNews />
        </div>
      </div>

      {/* Related News Section */}
      {relatedArticles.length > 0 && (
        <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b-2 border-red-600">
            <h3 className="text-xl font-black font-hindi text-slate-900 dark:text-white">
              संबंधित खबरें (Related News)
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <NewsCard key={rel.id} article={rel} variant="standard" />
            ))}
          </div>
        </section>
      )}

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={article.title}
        url={currentUrl}
      />
    </div>
  );
};
