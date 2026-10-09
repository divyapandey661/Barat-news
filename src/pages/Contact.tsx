import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNewsContext } from '../context/NewsContext';

export const Contact: React.FC = () => {
  const { language } = useNewsContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError(language === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें।' : 'Please fill all required fields.');
      return;
    }
    setError('');
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b-2 border-red-600 pb-4">
        <h1 className="text-3xl sm:text-4xl font-black font-hindi text-slate-900 dark:text-white">
          {language === 'hi' ? 'संपर्क करें (Contact Us)' : 'Get in Touch'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 font-hindi mt-1">
          संपादकीय सुझाव, खबर की सूचना (News Tip), या विज्ञापन पूछताछ के लिए हमारी टीम से संपर्क करें
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <h2 className="text-xl font-bold font-hindi text-slate-900 dark:text-white mb-4">
            संदेश भेजें
          </h2>

          {submitted ? (
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-lg text-emerald-900 dark:text-emerald-200 font-hindi">
                संदेश सफलतापूर्वक प्राप्त हुआ
              </h3>
              <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 font-hindi">
                हमारे संपादक या सहायता टीम शीघ्र ही आपके दिए गए संपर्क विवरण पर प्रतिक्रिया देंगे।
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold font-hindi"
              >
                नया संदेश भेजें
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-hindi">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs flex items-center gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    आपका नाम *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="जैसे: राहुल शर्मा"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ईमेल पता *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@mail.com"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    फ़ोन नंबर (वैकल्पिक)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    विषय / श्रेणी
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="संपादकीय सुझाव / विज्ञापन"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  संदेश या खबर का विवरण *
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="अपना विस्तृत संदेश यहां लिखें..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>संदेश भेजें</span>
              </button>
            </form>
          )}
        </div>

        {/* Bureau Locations */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-lg font-hindi text-slate-900 dark:text-white border-b pb-2 border-slate-100 dark:border-slate-800">
              ब्यूरो कार्यालय (Bureau Offices)
            </h3>

            <div className="space-y-4 text-xs font-hindi">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">नई दिल्ली मुख्यालय</h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    भारत न्यूज़ मीडिया टावर, कस्तूरबा गांधी मार्ग, कनॉट प्लेस, नई दिल्ली - 110001
                  </p>
                  <p className="text-slate-500 mt-1">ईमेल: contact@bharatnews24x7.in</p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">उत्तर प्रदेश ब्यूरो (लखनऊ)</h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    प्रेस एन्क्लेव, हजरतगंज, लखनऊ, उत्तर प्रदेश - 226001
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">वित्तीय ब्यूरो (मुंबई)</h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    मेकर चैंबर्स, नरीमन पॉइंट, मुंबई, महाराष्ट्र - 400021
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Phone className="w-4 h-4 text-red-600" />
                <span>न्यूज़रूम हेल्पलाइन: 011-2345-6789</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Mail className="w-4 h-4 text-red-600" />
                <span>संपादकीय ईमेल: editor@bharatnews24x7.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
