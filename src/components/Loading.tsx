import React from 'react';

export const NewsCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-slate-200 dark:bg-slate-800" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-4/5" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
        <div className="pt-2 flex justify-between items-center">
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
          <div className="h-6 w-6 bg-slate-200 dark:bg-slate-800 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const ArticleDetailsSkeleton: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6 animate-pulse">
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/6" />
      <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-11/12" />
      <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
      <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
      <div className="space-y-4 pt-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-4/5" />
      </div>
    </div>
  );
};
