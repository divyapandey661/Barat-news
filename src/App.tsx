/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { NewsProvider } from './context/NewsContext';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { Home } from './pages/Home';
import { LatestNews } from './pages/LatestNews';
import { CategoryNews } from './pages/CategoryNews';
import { NewsDetails } from './pages/NewsDetails';
import { LiveTV } from './pages/LiveTV';
import { Videos } from './pages/Videos';
import { SearchResults } from './pages/SearchResults';
import { Bookmarks } from './pages/Bookmarks';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <NewsProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-red-600 selection:text-white">
            {/* Channel Header */}
            <Header />

            {/* Sticky Navigation Bar */}
            <Navbar />

            {/* Main Application Body */}
            <main className="flex-1 pb-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/latest" element={<LatestNews />} />
                <Route path="/category/:slug" element={<CategoryNews />} />
                <Route path="/news/:slug" element={<NewsDetails />} />
                <Route path="/live-tv" element={<LiveTV />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Back to top floating button */}
            <BackToTop />

            {/* Channel Footer */}
            <Footer />
          </div>
        </BrowserRouter>
      </NewsProvider>
    </ThemeProvider>
  );
}
