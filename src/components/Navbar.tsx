import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Flame, Video, Tv, Bookmark } from 'lucide-react';
import { useNewsContext } from '../context/NewsContext';

interface NavItem {
  name: string;
  englishName: string;
  path: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'होम', englishName: 'Home', path: '/' },
  { name: 'ताज़ा खबरें', englishName: 'Latest', path: '/latest', icon: <Flame className="w-3.5 h-3.5 text-amber-500 inline mr-1" /> },
  { name: 'देश', englishName: 'India', path: '/category/india' },
  { name: 'दुनिया', englishName: 'World', path: '/category/world' },
  { name: 'राजनीति', englishName: 'Politics', path: '/category/politics' },
  { name: 'उत्तर प्रदेश', englishName: 'UP', path: '/category/uttar-pradesh' },
  { name: 'क्राइम', englishName: 'Crime', path: '/category/crime' },
  { name: 'खेल', englishName: 'Sports', path: '/category/sports' },
  { name: 'मनोरंजन', englishName: 'Entertainment', path: '/category/entertainment' },
  { name: 'बिजनेस', englishName: 'Business', path: '/category/business' },
  { name: 'टेक्नोलॉजी', englishName: 'Tech', path: '/category/technology' },
  { name: 'शिक्षा', englishName: 'Education', path: '/category/education' },
  { name: 'वीडियो', englishName: 'Videos', path: '/videos', icon: <Video className="w-3.5 h-3.5 text-red-500 inline mr-1" /> },
  { name: 'लाइव टीवी', englishName: 'Live TV', path: '/live-tv', icon: <Tv className="w-3.5 h-3.5 text-red-600 inline mr-1" />, highlight: true },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, bookmarks } = useNewsContext();

  return (
    <nav className="sticky top-0 z-40 bg-slate-900 border-b border-red-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-11">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-white hover:text-red-400 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <span className="ml-2 text-white font-bold text-sm tracking-wide lg:hidden">
              मेनू
            </span>
          </div>

          {/* Mobile Direct Live TV badge */}
          <div className="flex items-center lg:hidden gap-2">
            <Link
              to="/live-tv"
              className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>लाइव</span>
            </Link>
          </div>

          {/* Desktop Navigation Links (Single-Line, zero wrap, high clarity) */}
          <div className="hidden lg:flex items-center justify-between w-full overflow-x-auto no-scrollbar py-1">
            <div className="flex items-center space-x-1 xl:space-x-2">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `whitespace-nowrap px-2.5 py-1.5 text-xs xl:text-sm font-semibold transition-colors duration-150 rounded-sm font-hindi ${
                      isActive
                        ? 'text-white bg-red-600 font-bold shadow-xs'
                        : item.highlight
                        ? 'text-red-400 hover:text-white hover:bg-red-700/80 font-bold'
                        : 'text-slate-200 hover:text-white hover:bg-slate-800'
                    }`
                  }
                >
                  {item.icon}
                  <span>{language === 'hi' ? item.name : item.englishName}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 pt-3 pb-6 space-y-1 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 pb-3 mb-2 border-b border-slate-800">
            <Link
              to="/live-tv"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 p-2.5 bg-red-600 text-white font-bold rounded-lg text-sm"
            >
              <Tv className="w-4 h-4" />
              <span>लाइव टीवी</span>
            </Link>
            <Link
              to="/bookmarks"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 p-2.5 bg-slate-800 text-slate-200 font-medium rounded-lg text-sm"
            >
              <Bookmark className="w-4 h-4" />
              <span>सहेजी गई ({bookmarks.length})</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-semibold rounded-md font-hindi ${
                    isActive
                      ? 'text-white bg-red-600 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`
                }
              >
                {item.icon}
                <span>{language === 'hi' ? item.name : item.englishName}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
