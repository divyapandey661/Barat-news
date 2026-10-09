import React, { useState } from 'react';
import { Video, Play, Eye, Clock, X as CloseIcon } from 'lucide-react';
import { VIDEO_BULLETINS } from '../data/sampleNews';
import { useNewsContext } from '../context/NewsContext';

export const Videos: React.FC = () => {
  const { language } = useNewsContext();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeVideo, setActiveVideo] = useState<typeof VIDEO_BULLETINS[0] | null>(null);

  const filteredVideos = selectedFilter === 'all'
    ? VIDEO_BULLETINS
    : VIDEO_BULLETINS.filter((v) => v.category === selectedFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b-2 border-red-600 pb-4">
        <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider mb-1">
          <Video className="w-4 h-4" />
          <span>वीडियो हब</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-hindi text-slate-900 dark:text-white">
          {language === 'hi' ? 'विशेष वीडियो बुलेटिन एवं इंटरव्यू' : 'Video Bulletins & Interviews'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-hindi mt-1">
          सभी बड़ी घटनाओं का वीडियो विश्लेषण और जमीनी हकीकत
        </p>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {['all', 'देश', 'टेक्नोलॉजी', 'बिजनेस', 'मनोरंजन'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`whitespace-nowrap px-4 py-1.5 text-xs font-bold rounded-lg transition-colors font-hindi ${
              selectedFilter === cat
                ? 'bg-red-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat === 'all' ? 'सभी वीडियो (All)' : cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => setActiveVideo(video)}
            className="group cursor-pointer bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/9 bg-slate-900">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-0.5 rounded-sm">
                  {video.duration}
                </span>
                <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-xs">
                  {video.category}
                </span>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 font-hindi line-clamp-2 leading-snug transition-colors">
                  {video.title}
                </h3>
              </div>
            </div>

            <div className="p-4 pt-0 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
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

      {/* Video Modal */}
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
              <iframe
                src={`${activeVideo.videoEmbedUrl}?autoplay=1`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
              <span>श्रेणी: {activeVideo.category} · अवधि: {activeVideo.duration}</span>
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
    </div>
  );
};
