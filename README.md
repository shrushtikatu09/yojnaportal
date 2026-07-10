# 🇮🇳 YojnaPortal— Government Scheme Finder


Login on startup— App opens with login/signup first
8 Languages — English, Hindi, Marathi, Bengali, Tamil, Telugu, Gujarati, Kannada
25 Real Schemes — Education, Agriculture, Health, Business, Housing, Women, Senior Citizen, Divyang
Strict Eligibility— "Other" occupation requires text; income > ₹15L filters out income schemes
Baby/Infant option — in Education field for child schemes
Apply on Official Website— opens real govt site in new tab

 File Structure
```
src/
├── App.js                      ← Main hub, shows login on start
├── index.js                    ← Entry point
├── context/
│   ├── AuthContext.js          ← Login/Logout
│   └── LanguageContext.js      ← 8 language strings
├── data/
│   └── schemes.js              ← 25 real govt schemes
├── components/
│   ├── Navbar.js               ← Nav + language switcher + user menu
│   ├── AuthModal.js            ← Login/Signup popup
│   ├── SchemeCard.js           ← Scheme grid card
│   └── SchemeModal.js          ← Full detail + Apply button
└── pages/
    ├── Home.js                 ← Hero + PM section + quick actions
    ├── Schemes.js              ← Browse + filter all schemes
    └── Checker.js              ← 4-step eligibility checker with AI
```

 Setup (3 Commands)
```bash
cd Desktop/yojnaportal_v2
npm install
npm start
```

 Languages Supported
English · हिंदी · मराठी · বাংলা · தமிழ் · తెలుగు · ગુજરાતી · ಕನ್ನಡ

Switch language from the navbar dropdown — entire UI changes instantly!
