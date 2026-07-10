import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLang, LANGUAGES } from "../context/LanguageContext";

export default function Navbar({ page, setPage, onAuthClick }) {
  const { user, logout } = useAuth();
  const { lang, setLang, t } = useLang();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const handleLogout = () => { logout(); setPage("home"); setShowDropdown(false); };

  return (
    <nav style={{ background: "#0F1B3D", padding: "0 24px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => setPage("home")}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #FF9933, #FF6B00)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🇮🇳</div>
          <div>
            <div style={{ color: "white", fontWeight: 800, fontSize: 16, lineHeight: 1.1 }}>{t.appName}</div>
            <div style={{ color: "#FF9933", fontSize: 10, fontWeight: 600, letterSpacing: 1 }}>{t.tagline}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" }}>
          {/* Nav links */}
          {["home","schemes","checker"].map(p => (
            <button key={p} onClick={() => setPage(p)} style={{ padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", background: page === p ? "rgba(255,153,51,0.2)" : "transparent", color: page === p ? "#FF9933" : "white", transition: "all 0.2s" }}>
              {p === "home" ? t.nav_home : p === "schemes" ? t.nav_schemes : t.nav_checker}
            </button>
          ))}

          {/* Language Selector */}
          <div style={{ position: "relative" }}>
            <button onClick={() => { setShowLangMenu(!showLangMenu); setShowDropdown(false); }} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "7px 12px", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              {LANGUAGES.find(l => l.code === lang)?.flag} {LANGUAGES.find(l => l.code === lang)?.label} <span style={{ fontSize: 9 }}>▼</span>
            </button>
            {showLangMenu && (
              <>
                <div style={{ position: "fixed", inset: 0, zIndex: 150 }} onClick={() => setShowLangMenu(false)} />
                <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "white", borderRadius: 14, boxShadow: "0 8px 40px rgba(0,0,0,0.2)", minWidth: 170, overflow: "hidden", zIndex: 200 }}>
                  {LANGUAGES.map(l => (
                    <button key={l.code} onClick={() => { setLang(l.code); setShowLangMenu(false); }} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "11px 16px", border: "none", background: lang === l.code ? "#FFF7ED" : "transparent", color: lang === l.code ? "#FF6B00" : "#0F1B3D", fontWeight: lang === l.code ? 800 : 500, fontSize: 14, cursor: "pointer", textAlign: "left" }}>
                      <span style={{ fontSize: 18 }}>{l.flag}</span> {l.label} {lang === l.code && "✓"}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Auth */}
          {user ? (
            <div style={{ position: "relative" }}>
              <button onClick={() => { setShowDropdown(!showDropdown); setShowLangMenu(false); }} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,153,51,0.4)", borderRadius: 10, padding: "6px 12px", cursor: "pointer", color: "white", fontSize: 13, fontWeight: 600 }}>
                <div style={{ width: 26, height: 26, background: "linear-gradient(135deg,#FF9933,#FF6B00)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12 }}>{user.avatar}</div>
                {user.name} <span style={{ fontSize: 9 }}>{showDropdown ? "▲" : "▼"}</span>
              </button>
              {showDropdown && (
                <>
                  <div style={{ position: "fixed", inset: 0, zIndex: 150 }} onClick={() => setShowDropdown(false)} />
                  <div style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, background: "white", borderRadius: 14, boxShadow: "0 8px 40px rgba(0,0,0,0.2)", minWidth: 200, overflow: "hidden", zIndex: 200 }}>
                    <div style={{ padding: "16px 20px", background: "#F8FAFF", borderBottom: "1px solid #E0E7FF" }}>
                      <div style={{ fontWeight: 800, color: "#0F1B3D", fontSize: 15 }}>{user.name}</div>
                      <div style={{ fontSize: 12, color: "#64748B" }}>{user.email}</div>
                      <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 4 }}>{t.member_since} {user.joinedAt}</div>
                    </div>
                    <div style={{ padding: 8 }}>
                      {[{ label: "🎯 " + t.check_elig, action: () => { setPage("checker"); setShowDropdown(false); } }, { label: "📋 " + t.nav_schemes, action: () => { setPage("schemes"); setShowDropdown(false); } }].map(item => (
                        <button key={item.label} onClick={item.action} style={{ display: "block", width: "100%", padding: "10px 14px", textAlign: "left", background: "transparent", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, color: "#0F1B3D", cursor: "pointer" }}>{item.label}</button>
                      ))}
                      <div style={{ height: 1, background: "#E0E7FF", margin: "4px 0" }} />
                      <button onClick={handleLogout} style={{ display: "block", width: "100%", padding: "10px 14px", textAlign: "left", background: "transparent", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, color: "#C62828", cursor: "pointer" }}>🚪 {t.logout}</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button onClick={onAuthClick} style={{ marginLeft: 4, background: "linear-gradient(135deg,#FF9933,#FF6B00)", border: "none", borderRadius: 10, padding: "9px 18px", color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{t.login_btn}</button>
          )}
        </div>
      </div>
      <div style={{ height: 4, background: "linear-gradient(to right,#FF9933 33%,white 33%,white 66%,#138808 66%)", borderRadius: 2 }} />
    </nav>
  );
}
