import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto py-24 px-4 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto">
        <AlertTriangle className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-black font-hindi text-slate-900 dark:text-white">
        404 - पृष्ठ नहीं मिला
      </h1>
      <p className="text-sm text-slate-600 dark:text-slate-400 font-hindi">
        क्षमा करें, जिस पृष्ठ को आप ढूंढ रहे हैं वह मौजूद नहीं है या हटा दिया गया है।
      </p>
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold font-hindi transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>मुख्य पृष्ठ पर वापस जाएं</span>
        </Link>
      </div>
    </div>
  );
};
