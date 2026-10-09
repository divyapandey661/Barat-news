import React, { useState } from 'react';
import { Radio, Tv, Volume2, Users, Calendar, AlertCircle, Share2, Play } from 'lucide-react';
import { LIVE_BULLETINS } from '../data/sampleNews';
import { useNewsContext } from '../context/NewsContext';
import { ShareModal } from '../components/ShareModal';

export const LiveTV: React.FC = () => {
  const { language } = useNewsContext();
  const [streamActive, setStreamActive] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'schedule'>('schedule');
  const [chatMessage, setChatMessage] = useState('');
  const [chatList, setChatList] = useState([
    { id: 1, user: 'राजेश वर्मा', text: 'बजट और इन्फ्रास्ट्रक्चर पर बहुत अच्छी रिपोर्टिंग।' },
    { id: 2, user: 'प्रिया शर्मा', text: 'इसरो का कवरेज बहुत ही प्रेरणादायक है!' },
    { id: 3, user: 'विनीत कुमार', text: 'संसद सत्र के लाइव विजुअल्स स्पष्ट दिख रहे हैं।' },
  ]);

  const programSchedule = [
    { time: '09:00 - 10:00', title: 'देश की बात', host: 'संजय त्रिपाठी', live: false },
    { time: '10:00 - 11:30', title: 'स्पीड 100: सुपरफास्ट बुलेटिन', host: 'अमित गर्ग', live: false },
    { time: '11:30 - 13:00', title: 'लाइव रिपोर्ट: संसद से ग्राउंड ज़ीरो', host: 'रोहिणी शर्मा', live: true },
    { time: '13:00 - 14:00', title: 'विशेष लंच टाइम विश्लेषण', host: 'पूजा सक्सेना', live: false },
    { time: '19:00 - 20:00', title: 'दंगल प्राइम टाइम डिबेट', host: 'विपिन अवस्थी', live: false },
    { time: '21:00 - 22:00', title: 'भारत का महामुकाबला', host: 'विक्रम राठौर', live: false },
  ];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      setChatList((prev) => [
        ...prev,
        { id: Date.now(), user: 'आप (दर्शक)', text: chatMessage.trim() },
      ]);
      setChatMessage('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b-2 border-red-600 gap-4">
        <div>
          <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>24x7 निरंतर सीधा प्रसारण</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-hindi text-slate-900 dark:text-white flex items-center gap-3">
            <span>भारत न्यूज़ 24x7 - लाइव टीवी</span>
            <span className="bg-red-600 text-white text-xs font-black px-2.5 py-0.5 rounded-sm uppercase tracking-wider">
              LIVE
            </span>
          </h1>
        </div>

        <button
          onClick={() => setShareOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>लाइव स्ट्रीम साझा करें</span>
        </button>
      </div>

      {/* Main Broadcast Player Area & Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Stream Player */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative aspect-16/9 bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            {streamActive ? (
              <div className="relative w-full h-full">
                {/* High-Tech Studio Live Stream Feed */}
                <img
                  src="/src/assets/images/news_anchor_live_studio_1791541853405.jpg"
                  alt="Bharat News 24x7 Live TV Stream"
                  className="w-full h-full object-cover"
                />

                {/* Broadcast Graphics Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600/90 text-white text-xs font-extrabold px-3 py-1 rounded-sm shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <span>लाइव प्रसारण (LIVE ON AIR)</span>
                </div>

                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-md flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>42,890 दर्शक ऑनलाइन</span>
                </div>

                {/* TV Lower Third Graphics */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 sm:p-6 flex flex-col justify-end">
                  <div className="bg-red-600 text-white font-black text-xs sm:text-sm px-3 py-1 rounded-xs inline-block self-start shadow-sm mb-1">
                    सीधा प्रसारण: संसद व ग्लोबल समिट
                  </div>
                  <h2 className="text-white text-base sm:text-xl font-black font-hindi drop-shadow-md">
                    विशेष विश्लेषण: भारत की कूटनीतिक जीत और वैश्विक आर्थिक सम्मेलन पर दिनभर की बड़ी बहस
                  </h2>
                </div>
              </div>
            ) : (
              /* Professional Placeholder if stream is offline */
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-slate-900 text-slate-300">
                <Tv className="w-16 h-16 text-slate-600 mb-3" />
                <h3 className="text-lg font-bold text-white font-hindi">लाइव प्रसारण तैयार हो रहा है</h3>
                <p className="text-xs text-slate-400 max-w-md mt-1 font-hindi">
                  हमारा अगला लाइव बुलेटिन 13:00 IST पर शुरू होगा। आप पिछले वीडियो बुलेटिन देख सकते हैं।
                </p>
                <button
                  onClick={() => setStreamActive(true)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold font-hindi flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>प्रसारण पुनः लोड करें</span>
                </button>
              </div>
            )}
          </div>

          {/* Under-player ticker bar */}
          <div className="bg-red-600 text-white rounded-lg p-3 text-xs sm:text-sm font-hindi flex items-center justify-between">
            <span className="font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              लाइव अपडेट:
            </span>
            <span className="truncate mx-2 font-medium">
              नई दिल्ली से संवाददाता संजय त्रिपाठी लाइव मौजूद हैं। सरकार ने आर्थिक रोडमैप जारी किया।
            </span>
            <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded-sm whitespace-nowrap">
              HD 1080p
            </span>
          </div>
        </div>

        {/* Side Panel: Schedule & Live Chat */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs flex flex-col h-[520px]">
          {/* Tab Header */}
          <div className="grid grid-cols-2 border-b border-slate-200 dark:border-slate-800 text-xs font-bold font-hindi">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`py-3 flex items-center justify-center gap-1.5 transition-colors ${
                activeTab === 'schedule'
                  ? 'bg-red-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>आज का शेड्यूल</span>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-3 flex items-center justify-center gap-1.5 transition-colors ${
                activeTab === 'chat'
                  ? 'bg-red-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>लाइव दर्शक चैट</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'schedule' ? (
            <div className="p-4 overflow-y-auto space-y-3 flex-1 font-hindi">
              {programSchedule.map((prog, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border transition-all ${
                    prog.live
                      ? 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-900'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-slate-500 dark:text-slate-400">{prog.time}</span>
                    {prog.live && (
                      <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-xs">
                        अभी लाइव
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {prog.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    एंकर: {prog.host}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col h-full justify-between p-4">
              <div className="overflow-y-auto space-y-3 flex-1 font-hindi pr-1">
                {chatList.map((chat) => (
                  <div key={chat.id} className="text-xs bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-red-600 dark:text-red-400 block mb-0.5">
                      {chat.user}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">{chat.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="अपनी राय लिखें..."
                  className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-hidden font-hindi"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold font-hindi"
                >
                  भेजें
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title="भारत न्यूज़ 24x7 - लाइव टीवी देखें"
        url={window.location.href}
      />
    </div>
  );
};
