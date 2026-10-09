import React, { useState } from 'react';
import { X as CloseIcon, Copy, Check, Share2 } from 'lucide-react';
import { useNewsContext } from '../context/NewsContext';

interface ShareModalProps {
  title: string;
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ title, url, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { language } = useNewsContext();

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: 'bg-emerald-600 hover:bg-emerald-700',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.679-.702c.974.553 1.77.816 2.781.816 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.8-5.767-5.8zm0 10.531c-.907 0-1.745-.253-2.47-.732l-.177-.116-1.579.414.421-1.54-.117-.186c-.538-.857-.822-1.637-.821-2.505.001-2.617 2.126-4.743 4.744-4.743 2.618 0 4.743 2.126 4.743 4.743 0 2.617-2.126 4.67-4.744 4.67z" />
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=BharatNews24x7`,
      color: 'bg-slate-900 hover:bg-black',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-600 hover:bg-blue-700',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'खबर साझा करें' : 'Share Article'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
            aria-label="Close"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
          {title}
        </p>

        <div className="grid grid-cols-3 gap-3 my-5">
          {shareOptions.map((opt) => (
            <a
              key={opt.name}
              href={opt.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center justify-center py-3 px-2 rounded-lg text-white text-xs font-medium transition-transform active:scale-95 ${opt.color}`}
            >
              <div className="mb-1">{opt.icon}</div>
              <span>{opt.name}</span>
            </a>
          ))}
        </div>

        <div className="relative flex items-center">
          <input
            type="text"
            readOnly
            value={url}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-lg py-2.5 pl-3 pr-24 focus:outline-hidden"
          />
          <button
            onClick={handleCopy}
            className="absolute right-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-md flex items-center gap-1.5 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'कॉपी हुआ' : 'Copied'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'कॉपी करें' : 'Copy'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
