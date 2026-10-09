import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { PHOTO_GALLERY } from '../data/sampleNews';
import { GalleryPhoto } from '../types';
import { useNewsContext } from '../context/NewsContext';

export const PhotoGallery: React.FC = () => {
  const { language } = useNewsContext();
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % PHOTO_GALLERY.length);
    }
  };

  const prevPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + PHOTO_GALLERY.length) % PHOTO_GALLERY.length);
    }
  };

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 my-8 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500 rounded-lg text-white">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-hindi text-slate-900 dark:text-white tracking-tight">
              {language === 'hi' ? 'फोटो गैलरी' : 'Photo Gallery'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-hindi">
              तस्वीरों में देखें देश और दुनिया की अहम घटनाएं
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {PHOTO_GALLERY.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => openLightbox(index)}
            className="group cursor-pointer relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800"
          >
            <img
              src={photo.imageUrl}
              alt={photo.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
              <span className="text-[10px] text-amber-300 font-semibold mb-1 uppercase tracking-wide">
                {photo.category}
              </span>
              <p className="text-white text-xs font-bold font-hindi line-clamp-2 leading-snug">
                {photo.title}
              </p>
            </div>
            {/* Zoom icon */}
            <div className="absolute top-2 right-2 bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 p-2 text-white hover:text-red-400 text-lg transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevPhoto}
              className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Current Photo Frame */}
            <div className="w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-xl bg-black">
              <img
                src={PHOTO_GALLERY[activePhotoIndex].imageUrl}
                alt={PHOTO_GALLERY[activePhotoIndex].title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Caption & Credits */}
            <div className="w-full mt-4 p-4 bg-slate-900/90 text-white rounded-xl border border-slate-800 text-center">
              <h3 className="font-bold text-base sm:text-lg font-hindi">
                {PHOTO_GALLERY[activePhotoIndex].title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-300 font-hindi">
                {PHOTO_GALLERY[activePhotoIndex].caption}
              </p>
              <div className="mt-2 text-xs text-amber-400 font-medium">
                फोटो: {PHOTO_GALLERY[activePhotoIndex].photographer} · ({activePhotoIndex + 1} / {PHOTO_GALLERY.length})
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
