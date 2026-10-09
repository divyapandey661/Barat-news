import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2, AlertCircle, Shield, Award, PhoneCall } from 'lucide-react';
import { CATEGORIES } from '../data/sampleNews';
import { useNewsContext } from '../context/NewsContext';

export const Footer: React.FC = () => {
  const { language } = useNewsContext();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(language === 'hi' ? 'कृपया एक वैध ईमेल पता दर्ज करें।' : 'Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-8 border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Newsletter & Brand Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-stretch rounded overflow-hidden">
                <span className="bg-red-600 text-white font-black px-3 py-1 text-xl">भारत</span>
                <span className="bg-black text-white font-bold px-2 py-1 text-sm flex items-center border-l border-red-700">
                  <span className="text-amber-400 font-black">NEWS 24x7</span>
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-hindi leading-relaxed">
              भारत न्यूज़ 24x7 देश का प्रमुख डिजिटल हिंदी समाचार माध्यम है। हम राजनीति, अर्थव्यवस्था, खेल, मनोरंजन और वैश्विक घटनाओं की निष्पक्ष, तथ्यात्मक और 24 घंटे विश्वसनीय रिपोर्टिंग के लिए समर्पित हैं।
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-red-500" />
                <span>तथ्य-जांच प्रमाणित</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                <span>पत्रकारिता उत्कृष्टता</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900/80 p-6 rounded-xl border border-slate-800 flex flex-col justify-center">
            <h4 className="text-base font-bold text-white font-hindi flex items-center gap-2">
              <Mail className="w-5 h-5 text-red-500" />
              <span>{language === 'hi' ? 'दैनिक समाचार पत्र (न्यूज़लेटर) सदस्यता' : 'Subscribe to Daily Newsletter'}</span>
            </h4>
            <p className="text-xs text-slate-400 font-hindi mt-1">
              हर सुबह देश और दुनिया की शीर्ष 10 बड़ी खबरें सीधे आपके इनबॉक्स में।
            </p>

            {subscribed ? (
              <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm bg-emerald-950/40 p-3 rounded-lg border border-emerald-900">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="font-hindi">धन्यवाद! आप हमारे न्यूज़लेटर के लिए सफलतापूर्वक पंजीकृत हो गए हैं।</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    placeholder="अपना ईमेल पता दर्ज करें (example@mail.com)..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-hidden focus:border-red-500 font-hindi placeholder:text-slate-500"
                  />
                  {emailError && (
                    <div className="flex items-center gap-1 text-red-400 text-xs mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{emailError}</span>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors font-hindi whitespace-nowrap"
                >
                  सब्सक्राइब करें
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 py-8 border-b border-slate-800 text-xs font-hindi">
          <div>
            <h5 className="font-bold text-white text-sm mb-3 uppercase tracking-wider text-red-500">
              श्रेणियां
            </h5>
            <ul className="space-y-2">
              <li><Link to="/category/india" className="hover:text-white transition-colors">देश समाचार</Link></li>
              <li><Link to="/category/politics" className="hover:text-white transition-colors">राजनीति</Link></li>
              <li><Link to="/category/uttar-pradesh" className="hover:text-white transition-colors">उत्तर प्रदेश</Link></li>
              <li><Link to="/category/crime" className="hover:text-white transition-colors">क्राइम बुलेटिन</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white text-sm mb-3 uppercase tracking-wider text-red-500">
              बिजनेस व टेक
            </h5>
            <ul className="space-y-2">
              <li><Link to="/category/business" className="hover:text-white transition-colors">शेयर बाजार</Link></li>
              <li><Link to="/category/business" className="hover:text-white transition-colors">अर्थव्यवस्था</Link></li>
              <li><Link to="/category/technology" className="hover:text-white transition-colors">टेक्नोलॉजी</Link></li>
              <li><Link to="/category/technology" className="hover:text-white transition-colors">स्पेस व साइंस</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white text-sm mb-3 uppercase tracking-wider text-red-500">
              खेल व सिनेमा
            </h5>
            <ul className="space-y-2">
              <li><Link to="/category/sports" className="hover:text-white transition-colors">क्रिकेट अपडेट</Link></li>
              <li><Link to="/category/sports" className="hover:text-white transition-colors">अन्य खेल</Link></li>
              <li><Link to="/category/entertainment" className="hover:text-white transition-colors">बॉलीवुड</Link></li>
              <li><Link to="/category/entertainment" className="hover:text-white transition-colors">फिल्म समीक्षा</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white text-sm mb-3 uppercase tracking-wider text-red-500">
              मल्टीमीडिया
            </h5>
            <ul className="space-y-2">
              <li><Link to="/live-tv" className="hover:text-white transition-colors text-red-400 font-bold">लाइव टीवी प्रसारण</Link></li>
              <li><Link to="/videos" className="hover:text-white transition-colors">वीडियो समाचार</Link></li>
              <li><Link to="/#photo-gallery" className="hover:text-white transition-colors">फोटो गैलरी</Link></li>
              <li><Link to="/bookmarks" className="hover:text-white transition-colors">सहेजी गई खबरें</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white text-sm mb-3 uppercase tracking-wider text-red-500">
              कंपनी व संस्था
            </h5>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition-colors">हमारे बारे में (About Us)</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">संपर्क करें (Contact)</Link></li>
              <li><Link to="/about#editorial" className="hover:text-white transition-colors">संपादकीय नीति</Link></li>
              <li><Link to="/about#ethics" className="hover:text-white transition-colors">आचार संहिता</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white text-sm mb-3 uppercase tracking-wider text-red-500">
              कानूनी व नियम
            </h5>
            <ul className="space-y-2">
              <li><Link to="/about#privacy" className="hover:text-white transition-colors">गोपनीयता नीति (Privacy)</Link></li>
              <li><Link to="/about#terms" className="hover:text-white transition-colors">उपयोग की शर्तें</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">शिकायत निवारण</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">विज्ञापन अवसर</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Demo Disclosure */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-3 md:space-y-0">
          <div>
            <p className="font-hindi">
              © {new Date().getFullYear()} <span className="text-white font-bold">भारत न्यूज़ 24x7</span> (Bharat News 24x7). सर्वाधिकार सुरक्षित।
            </p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              प्रोटोटाइप डेमो संस्करण: सभी समाचार प्रदर्शन और वास्तुशिल्प परीक्षण के उद्देश्य से निर्मित हैं।
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 text-slate-400">
            <span className="text-xs text-slate-500 font-hindi">सोशल मीडिया पर जुड़ें:</span>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-slate-900 hover:bg-red-600 hover:text-white rounded transition-colors"
              aria-label="YouTube"
            >
              YT
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-slate-900 hover:bg-blue-600 hover:text-white rounded transition-colors"
              aria-label="Facebook"
            >
              FB
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-slate-900 hover:bg-black hover:text-white rounded transition-colors"
              aria-label="Twitter / X"
            >
              X
            </a>
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-slate-900 hover:bg-sky-600 hover:text-white rounded transition-colors"
              aria-label="Telegram"
            >
              TG
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
