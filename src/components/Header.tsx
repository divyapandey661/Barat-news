import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Sun, Moon, Bookmark, Radio, User, Clock, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNewsContext } from '../context/NewsContext';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { bookmarks, language, setLanguage } = useNewsContext();
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      if (language === 'hi') {
        const days = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
        const months = ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];
        const dayName = days[now.getDay()];
        const day = now.getDate();
        const monthName = months[now.getMonth()];
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        setCurrentDateTime(`${dayName}, ${day} ${monthName} ${year} | ${hours}:${minutes}:${seconds} IST`);
      } else {
        const formatted = now.toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        setCurrentDateTime(`${formatted} IST`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [language]);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(quickQuery.trim())}`);
      setSearchOpen(false);
      setQuickQuery('');
    }
  };

  return (
    <>
      {/* Top Utility Ribbon */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span className="font-hindi tracking-wide font-medium">{currentDateTime}</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <button
                onClick={() => setLanguage('hi')}
                className={`transition-colors font-medium ${language === 'hi' ? 'text-red-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                हिंदी
              </button>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`transition-colors font-medium ${language === 'en' ? 'text-red-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                English
              </button>
            </div>

            {/* Weather / Location Snippet */}
            <span className="hidden md:inline-block text-slate-400">
              नई दिल्ली 28°C · लखनऊ 29°C · मुंबई 31°C
            </span>
          </div>
        </div>
      </div>

      {/* Main Channel Brand Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-8 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo Lockup */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-hidden">
            <div className="flex items-stretch rounded-md overflow-hidden shadow-sm">
              <div className="bg-red-600 text-white font-extrabold px-3 py-1.5 text-xl sm:text-2xl tracking-tighter flex items-center">
                भारत
              </div>
              <div className="bg-slate-950 text-white font-bold px-3 py-1.5 text-sm sm:text-base flex flex-col justify-center leading-none tracking-wider border-l border-red-700">
                <span className="text-red-500 text-[10px] tracking-widest font-black uppercase">NEWS</span>
                <span className="text-amber-400 text-xs sm:text-sm font-black">24x7</span>
              </div>
            </div>
            <div className="hidden lg:flex flex-col">
              <span className="text-[11px] font-bold tracking-widest uppercase text-slate-900 dark:text-slate-100">
                BHARAT NEWS 24x7
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-hindi">
                देश का सबसे भरोसेमंद हिंदी न्यूज़ नेटवर्क
              </span>
            </div>
          </Link>

          {/* Right Action Island */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Live TV Button */}
            <Link
              to="/live-tv"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-sm active:scale-95 transition-all"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              <span>लाइव टीवी</span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </Link>

            {/* Quick Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Search"
              title="खबरें खोजें"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Saved Articles / Bookmarks */}
            <Link
              to="/bookmarks"
              className="relative p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Bookmarks"
              title="सहेजी गई खबरें"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarks.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </Link>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'लाइट मोड' : 'डार्क मोड'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* User Profile / Login */}
            <button
              onClick={() => setShowProfileModal(true)}
              className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="User Profile"
              title="उपयोगकर्ता खाता"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Search Dropdown Bar */}
        {searchOpen && (
          <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <form onSubmit={handleQuickSearch} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="खबर, विषय या राजनेता का नाम खोजें (उदा: बजट, इसरो, क्रिकेट)..."
                  value={quickQuery}
                  onChange={(e) => setQuickQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-4 py-2 text-sm focus:outline-hidden focus:border-red-500 font-hindi"
                />
              </div>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors font-hindi"
              >
                खोजें
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                रद्द करें
              </button>
            </form>
          </div>
        )}
      </header>

      {/* User Account / Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center font-bold">
                  BN
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">दर्शक प्रोफ़ाइल</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">भारत न्यूज़ 24x7 पाठक क्लब</p>
                </div>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-500 dark:text-slate-400">सहेजी गई खबरें</span>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{bookmarks.length} लेख बुकमार्क हैं</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-500 dark:text-slate-400">पसंदीदा भाषा</span>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {language === 'hi' ? 'हिंदी (Hindi)' : 'अंग्रेजी (English)'}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-500 dark:text-slate-400">सक्रिय थीम</span>
                <p className="text-sm font-semibold text-slate-900 dark:text-white capitalize">
                  {theme === 'dark' ? 'डार्क थीम (Dark Mode)' : 'लाइट थीम (Light Mode)'}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowProfileModal(false)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
