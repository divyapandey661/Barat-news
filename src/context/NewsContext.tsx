import React, { createContext, useContext, useState, useEffect } from 'react';
import { NewsArticle } from '../types';

export type Language = 'hi' | 'en';
export type FontSize = 'normal' | 'large' | 'xlarge';

interface NewsContextType {
  bookmarks: NewsArticle[];
  toggleBookmark: (article: NewsArticle) => void;
  isBookmarked: (id: string) => boolean;
  clearBookmarks: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<NewsArticle[]>(() => {
    try {
      const saved = localStorage.getItem('bharat_news_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('bharat_news_lang') as Language) || 'hi';
  });

  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    return (localStorage.getItem('bharat_news_fontsize') as FontSize) || 'normal';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('bharat_news_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks:', e);
    }
  }, [bookmarks]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bharat_news_lang', lang);
  };

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    localStorage.setItem('bharat_news_fontsize', size);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const toggleBookmark = (article: NewsArticle) => {
    setBookmarks((prev) => {
      const exists = prev.some((item) => item.id === article.id);
      if (exists) {
        showToast(language === 'hi' ? 'खबर बुकमार्क से हटा दी गई' : 'Article removed from bookmarks');
        return prev.filter((item) => item.id !== article.id);
      } else {
        showToast(language === 'hi' ? 'खबर बुकमार्क में सुरक्षित कर ली गई' : 'Article saved to bookmarks');
        return [article, ...prev];
      }
    });
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some((item) => item.id === id);
  };

  const clearBookmarks = () => {
    setBookmarks([]);
    showToast(language === 'hi' ? 'सभी बुकमार्क हटा दिए गए' : 'All bookmarks cleared');
  };

  return (
    <NewsContext.Provider
      value={{
        bookmarks,
        toggleBookmark,
        isBookmarked,
        clearBookmarks,
        language,
        setLanguage,
        fontSize,
        setFontSize,
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast,
      }}
    >
      {children}
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center bg-slate-900 text-white px-5 py-3 rounded-lg shadow-xl text-sm border border-slate-700 animate-fade-in transition-all">
          <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2.5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </NewsContext.Provider>
  );
};

export const useNewsContext = (): NewsContextType => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNewsContext must be used within a NewsProvider');
  }
  return context;
};
