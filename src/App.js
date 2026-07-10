import { useState, useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { LangProvider, useLang } from "./context/LanguageContext";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import AuthModal from "./components/AuthModal";
import SchemeModal from "./components/SchemeModal";
import Home from "./pages/Home";
import Schemes from "./pages/Schemes";
import Checker from "./pages/Checker";

function AppInner() {
  const { user } = useAuth();
  const { t } = useLang();
  const [page, setPage] = useState("home");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSchemeModal, setShowSchemeModal] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Show login modal on first load if not logged in
  useEffect(() => {
    if (!user) setShowAuthModal(true);
  }, []);

  // When user logs in, close modal
  useEffect(() => {
    if (user) setShowAuthModal(false);
  }, [user]);

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh", background: "#F0F4FF" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F1F5F9; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
        select, input { font-family: inherit; }
        select:focus, input:focus { border-color: #FF9933 !important; box-shadow: 0 0 0 3px rgba(255,153,51,0.15); }
      `}</style>

      <Navbar page={page} setPage={setPage} onAuthClick={() => setShowAuthModal(true)} />

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 60px" }}>
        {page === "home" && <Home setPage={setPage} setSearchQuery={setSearchQuery} setSelectedScheme={setSelectedScheme} setShowSchemeModal={setShowSchemeModal} />}
        {page === "schemes" && <Schemes searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSelectedScheme={setSelectedScheme} setShowSchemeModal={setShowSchemeModal} />}
        {page === "checker" && <Checker setSelectedScheme={setSelectedScheme} setShowSchemeModal={setShowSchemeModal} onAuthRequired={() => setShowAuthModal(true)} />}
      </main>

      <footer style={{ background: "#0F1B3D", color: "#64748B", textAlign: "center", padding: "28px 24px", fontSize: 13 }}>
        <div style={{ height: 4, background: "linear-gradient(to right,#FF9933 33%,white 33%,white 66%,#138808 66%)", borderRadius: 2, maxWidth: 200, margin: "0 auto 18px" }} />
        <div style={{ fontWeight: 700, color: "#94A3B8", marginBottom: 6 }}>{t.footer_copy}</div>
        <div>{t.footer_sub}</div>
      </footer>

      {showAuthModal && <AuthModal onClose={() => { if (user) setShowAuthModal(false); }} />}
      {showSchemeModal && selectedScheme && <SchemeModal scheme={selectedScheme} onClose={() => { setShowSchemeModal(false); setSelectedScheme(null); }} />}
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </LangProvider>
  );
}
