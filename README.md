# भारत न्यूज़ 24x7 (Bharat News 24x7) – Hindi News Channel Website

एक आधुनिक, तीव्र और उत्तरदायी (responsive) हिंदी न्यूज़ चैनल वेब पोर्टल, जो देश-विदेश, राजनीति, उत्तर प्रदेश, खेल, मनोरंजन, व्यापार, प्रौद्योगिकी और अपराध की ताज़ा खबरें प्रस्तुत करता है।

---

## 1. परियोजना की मुख्य विशेषताएं (Key Features)

- **मूल ब्रांड पहचान (Original Branding):** BHARAT NEWS 24x7 / भारत न्यूज़ 24x7.
- **ब्रेकिंग न्यूज़ टिकर (Breaking News Ticker):** लाल पृष्ठभूमि पर गतिशील स्क्रॉलिंग हेडलाइंस, माउस ले जाने पर स्वतः ठहराव (pause on hover).
- **लाइव टीवी प्रसारण (Live TV Hub):** स्टूडियो लाइव विजुअल्स, ब्रेकिंग लोअर-थर्ड ग्राफिक्स, आज का शो शेड्यूल और दर्शक चैट।
- **मल्टी-कैटेगरी कवरेज:** देश, दुनिया, राजनीति, उत्तर प्रदेश, खेल, मनोरंजन, बिजनेस, टेक्नोलॉजी, शिक्षा, क्राइम।
- **लेख विवरण पृष्ठ (News Details Page):** बड़े हिंदी शीर्षक, रिपोर्टर बाइलाइन, पढ़ने का समय, फ़ॉन्ट आकार नियंत्रण (A / A+ / A++), संबंधित समाचार, व्हाट्सएप / एक्स / फेसबुक शेयरिंग।
- **सहेजी गई खबरें (Bookmarks):** लोकल स्टोरेज (LocalStorage) आधारित ऑफलाइन बुकमार्क सिस्टम।
- **खोज सुविधा (Search & Filtering):** गतिशील कीवर्ड एवं श्रेणी आधारित त्वरित खोज।
- **डार्क / लाइट मोड (Dark & Light Theme):** पाठक की आंखों के अनुकूल थीम स्विचिंग।
- **फोटो गैलरी एवं लाइटबॉक्स (Photo Gallery & Lightbox):** उच्च-गुणवत्ता समाचार चित्रों का फुलस्क्रीन व्यूअर।
- **वीडियो बुलेटिन (Video Bulletins):** प्राइम टाइम डिबेट और ग्राउंड रिपोर्ट वीडियो।

---

## 2. तकनीकी संरचना (Tech Stack)

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4, Google Fonts (Mukta & Hind Devanagari Typography)
- **Routing:** React Router DOM (v7)
- **Icons:** Lucide React
- **API Client:** Axios
- **State Management:** Context API (ThemeContext & NewsContext) + LocalStorage

---

## 3. प्रोजेक्ट फोल्डर संरचना (Project Structure)

```text
bharat-news-24x7/
├── index.html                  # HTML5 एंट्री पॉइंट (Google Fonts & SEO Meta)
├── metadata.json               # AI Studio मेटाडेटा
├── package.json                # निर्भरताएं व स्क्रिप्ट्स
├── tsconfig.json               # टाइपस्क्रिप्ट कॉन्फ़िगरेशन
├── vite.config.ts              # विट बिल्ड टूल कॉन्फ़िगरेशन
├── .env.example                # पर्यावरण चर टेम्पलेट
├── src/
│   ├── main.tsx                # रिएक्ट रूट माउंट
│   ├── App.tsx                 # मुख्य राउटर और प्रोवाइडर ट्री
│   ├── index.css               # वैश्विक शैलियाँ एवं देवनागरी टाइपोग्राफी
│   ├── types/
│   │   └── index.ts            # टाइपस्क्रिप्ट इंटरफेस (NewsArticle, Category, etc.)
│   ├── context/
│   │   ├── ThemeContext.tsx    # डार्क/लाइट थीम प्रदाता
│   │   └── NewsContext.tsx     # बुकमार्क, भाषा और प्राथमिकताएं
│   ├── services/
│   │   └── newsApi.ts          # Axios API क्लाइंट और डेटा फ़िल्टरिंग
│   ├── hooks/
│   │   └── useNews.ts          # समाचार लोड, पेजिंग व सर्च हुक
│   ├── data/
│   │   └── sampleNews.ts       # समृद्ध स्थानीय हिंदी समाचार डेटासेट
│   ├── components/
│   │   ├── Header.tsx          # चैनल लोगो, लाइव क्लॉक, सर्च व एक्शन बार
│   │   ├── Navbar.tsx          # स्टिकी नेविगेशन मेनू और मोबाइल ड्रॉअर
│   │   ├── BreakingNews.tsx    # लाल ब्रेकिंग न्यूज़ टिकर
│   │   ├── FeaturedNews.tsx    # मुख्य सुर्खी और टॉप 3 स्टोरी ग्रिड
│   │   ├── NewsCard.tsx        # पुनः प्रयोज्य न्यूज़ कार्ड
│   │   ├── TrendingNews.tsx    # ट्रेंडिंग समाचार और स्पीड बुलेटिन साइडबार
│   │   ├── VideoSection.tsx    # वीडियो न्यूज़ गैलरी व प्लेयर मॉडल
│   │   ├── PhotoGallery.tsx    # फोटो गैलरी व लाइटबॉक्स व्यूअर
│   │   ├── Loading.tsx         # स्केलेटन लोडिंग स्टेट्स
│   │   ├── ShareModal.tsx      # व्हाट्सएप, एक्स व सोशल शेयर डायलॉग
│   │   ├── BackToTop.tsx       # स्मूथ बैक-टू-टॉप बटन
│   │   └── Footer.tsx          # विस्तृत फुटर, न्यूज़लेटर व नीतियां
│   └── pages/
│       ├── Home.tsx            # मुख्य होमपेज
│       ├── LatestNews.tsx      # ताज़ा खबरें फीड व लोड मोर पेजिंग
│       ├── CategoryNews.tsx    # श्रेणी विशेष समाचार (/category/:slug)
│       ├── NewsDetails.tsx     # समाचार विवरण पृष्ठ (/news/:slug)
│       ├── LiveTV.tsx          # लाइव टीवी प्रसारण पृष्ठ
│       ├── Videos.tsx          # वीडियो समाचार हब
│       ├── SearchResults.tsx   # खोज परिणाम पृष्ठ
│       ├── Bookmarks.tsx       # सहेजी गई खबरें
│       ├── About.tsx           # हमारे बारे में व संपादकीय नीति
│       ├── Contact.tsx         # संपर्क सूत्र व ब्यूरो कार्यालय
│       └── NotFound.tsx        # 404 त्रुटि पृष्ठ
```

---

## 4. शुरू करने की मार्गदर्शिका (Getting Started Guide)

### चरण 1: Vite React प्रोजेक्ट बनाएं
```bash
npm create vite@latest bharat-news-24x7 -- --template react-ts
cd bharat-news-24x7
```

### चरण 2: आवश्यक पैकेज स्थापित करें
```bash
npm install react-router-dom axios lucide-react @tailwindcss/vite tailwindcss
```

### चरण 3: पर्यावरण चर (.env) कॉन्फ़िगर करें
`.env.example` को कॉपी करके `.env` बनाएं:
```bash
cp .env.example .env
```
यदि आपके पास NewsAPI.org या अन्य न्यूज़ API की कुंजी है, तो जोड़ें:
```env
VITE_NEWS_API_KEY="your_actual_api_key"
VITE_NEWS_API_URL="https://newsapi.org/v2"
```
*(नोट: यदि कुंजी नहीं दी जाती है, तो ऐप स्वतः समृद्ध स्थानीय हिंदी डेटाबेस का उपयोग करता है)*

### चरण 4: डेवलपमेंट सर्वर चलाएं
```bash
npm run dev
```
ब्राउज़र में `http://localhost:3000` खोलें।

### चरण 5: प्रोडक्शन बिल्ड तैयार करें
```bash
npm run build
npm run preview
```

---

## 5. वास्तविक न्यूज़ API जोड़ना (Integrating Real News APIs)

`src/services/newsApi.ts` में Axios आधारित क्लाइंट पहले से तैयार है। 
1. **NewsAPI.org:** `VITE_NEWS_API_KEY` सेट करने पर यह स्वतः भारत (`country=in`) की सुर्खियां प्राप्त करता है।
2. **GNews / Mediastack / Custom Node.js Backend:** आप केवल `newsApi.ts` में URL और हेडर बदल सकते हैं।
3. **स्थानीय फ़ॉलबैक (Graceful Fallback):** नेटवर्क अनुपलब्ध होने या सीमा समाप्त होने पर उपयोगकर्ताओं को कभी खाली स्क्रीन नहीं दिखती; विश्वसनीय डेटा हमेशा उपलब्ध रहता है।

---

## 6. लाइसेंस
© Bharat News 24x7. शैक्षणिक एवं प्रदर्शन उपयोग हेतु विकसित।
