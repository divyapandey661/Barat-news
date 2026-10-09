import React from 'react';
import { Shield, Award, Users, Target, CheckCircle, Scale } from 'lucide-react';
import { useNewsContext } from '../context/NewsContext';

export const About: React.FC = () => {
  const { language } = useNewsContext();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Hero Intro */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-950/60 text-red-600 px-3.5 py-1.5 rounded-full text-xs font-bold font-hindi">
          <span>भारत का अग्रणी डिजिटल न्यूज़ चैनल</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-hindi text-slate-900 dark:text-white">
          भारत न्यूज़ 24x7 के बारे में (About Us)
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-hindi max-w-3xl mx-auto leading-relaxed">
          निष्पक्ष, निर्भीक और जनहितैषी पत्रकारिता की मशाल। हम भारत और दुनिया भर के करोड़ों पाठकों और दर्शकों तक 24 घंटे विश्वसनीय और तथ्यात्मक समाचार पहुंचाने के लिए समर्पित हैं।
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg font-hindi text-slate-900 dark:text-white">
            100% तथ्य-जांच (Fact Check)
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-hindi leading-relaxed">
            प्रत्येक समाचार को प्रकाशित करने से पूर्व हमारी विशेष जांच टीम द्वारा दोहरे सत्यापन के बाद ही जारी किया जाता है।
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg font-hindi text-slate-900 dark:text-white">
            निष्पक्ष एवं स्वतंत्र
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-hindi leading-relaxed">
            हम किसी भी राजनीतिक दल या कॉर्पोरेट दबाव से मुक्त होकर केवल आम नागरिक और संविधान के प्रति उत्तरदायी हैं।
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg font-hindi text-slate-900 dark:text-white">
            जनसरोकार एवं विकास
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-hindi leading-relaxed">
            शिक्षा, रोजगार, स्वास्थ्य, विज्ञान और पर्यावरण से जुड़े विषयों को हमारी कवरेज में सदैव सर्वोच्च प्राथमिकता दी जाती है।
          </p>
        </div>
      </div>

      {/* Editorial Policy */}
      <section id="editorial" className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 font-hindi">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white border-b pb-3 border-slate-100 dark:border-slate-800">
          हमारी संपादकीय नीति (Editorial Policy)
        </h2>
        <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            1. <strong>सत्यता और सटीकता:</strong> भारत न्यूज़ 24x7 की संपादकीय नीति का मूल आधार सटीक और सत्यापित सूचना है। अफवाहों, अपुष्ट दावों या सनसनीखेज शीर्षकों को हमारे मंच पर कोई स्थान नहीं दिया जाता।
          </p>
          <p>
            2. <strong>सुधार और स्पष्टीकरण:</strong> यदि अनजाने में किसी रिपोर्ट में कोई तथ्यात्मक त्रुटि होती है, तो उसे तत्काल सार्वजनिक स्पष्टीकरण के साथ संशोधित किया जाता है।
          </p>
          <p>
            3. <strong>निजता का सम्मान:</strong> हम किसी भी जांच या रिपोर्टिंग के दौरान कानून के दायरे में रहकर व्यक्तिगत गरिमा और निजता का पूर्ण सम्मान करते हैं।
          </p>
        </div>
      </section>

      {/* Privacy Policy */}
      <section id="privacy" className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 font-hindi">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white border-b pb-3 border-slate-100 dark:border-slate-800">
          गोपनीयता नीति (Privacy Policy)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          भारत न्यूज़ 24x7 अपने उपयोगकर्ताओं के डेटा और गोपनीयता का पूरा सम्मान करता है। हम किसी भी तृतीय पक्ष को आपकी व्यक्तिगत जानकारी विक्रय नहीं करते हैं। हमारी वेबसाइट पर सुरक्षित सत्र और मानक एन्क्रिप्शन प्रोटोकॉल का उपयोग किया जाता है।
        </p>
      </section>
    </div>
  );
};
