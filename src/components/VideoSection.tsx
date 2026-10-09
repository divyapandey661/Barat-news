import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Video, X as CloseIcon, Eye, Clock } from 'lucide-react';
import { VIDEO_BULLETINS } from '../data/sampleNews';
import { useNewsContext } from '../context/NewsContext';

export const VideoSection: React.FC = () => {
  const { language } = useNewsContext();
  const [activeVideo, setActiveVideo] = useState<typeof VIDEO_BULLETINS[0] | null>(null);

  return (
    <section className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 my-8 border border-slate-800">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-600 rounded-lg text-white">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-hindi tracking-tight">
              {language === 'hi' ? 'वीडियो न्यूज़ बुलेटिन' : 'Video News Bulletins'}
            </h2>
            <p className="text-xs text-slate-400 font-hindi">
              ग्राउंड रिपोर्ट, स्टूडियो बहस और खास इंटरव्यू
            </p>
          </div>
        </div>

        <Link
          to="/videos"
          className="text-xs sm:text-sm font-bold text-red-500 hover:text-red-400 transition-colors font-hindi flex items-center gap-1"
        >
          <span>{language === 'hi' ? 'सभी वीडियो देखें' : 'View All Videos'}</span>
          <span>→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {VIDEO_BULLETINS.map((video) => (
          <div
            key={video.id}
            onClick={() => setActiveVideo(video)}
            className="group cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail Container with Play Overlay */}
              <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                />
                {/* Play Button Badge */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-red-600/95 group-hover:bg-red-600 group-hover:scale-110 flex items-center justify-center text-white shadow-lg transition-all">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-bold px-2 py-0.5 rounded-sm">
                  {video.duration}
                </div>

                <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-xs">
                  {video.category}
                </div>
              </div>

              {/* Title & Metadata */}
              <h3 className="mt-3 font-bold text-sm text-slate-100 group-hover:text-red-400 font-hindi line-clamp-2 leading-snug transition-colors">
                {video.title}
              </h3>
            </div>

            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{video.views} व्यूज</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{video.time}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-xl overflow-hidden max-w-3xl w-full border border-slate-800 shadow-2xl">
            <div className="p-4 flex items-center justify-between border-b border-slate-800">
              <h4 className="font-bold text-white text-sm sm:text-base font-hindi line-clamp-1">
                {activeVideo.title}
              </h4>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-16/9 bg-black">
              {/* Authorized Video Embed / Studio Broadcast feed */}
              <iframe
                src={`${activeVideo.videoEmbedUrl}?autoplay=1`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
              <span>अवधि: {activeVideo.duration} · श्रेणी: {activeVideo.category}</span>
              <button
                onClick={() => setActiveVideo(null)}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
