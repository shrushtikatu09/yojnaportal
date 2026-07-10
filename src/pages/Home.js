import SchemeCard from "../components/SchemeCard";
import SCHEMES from "../data/schemes";
import { useLang } from "../context/LanguageContext";

export default function Home({ setPage, setSearchQuery, setSelectedScheme, setShowSchemeModal }) {
  const { t } = useLang();

  return (
    <>
      {/* ── HERO ── */}
      <div style={{ background: "linear-gradient(135deg,#0F1B3D 0%,#1E3A8A 100%)", borderRadius: "0 0 32px 32px", padding: "60px 40px 50px", marginBottom: 40, color: "white", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, background: "radial-gradient(circle,rgba(255,153,51,0.15) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 200, height: 200, background: "radial-gradient(circle,rgba(19,136,8,0.1) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", background: "rgba(255,153,51,0.2)", border: "1px solid rgba(255,153,51,0.4)", borderRadius: 20, padding: "6px 16px", fontSize: 12, color: "#FF9933", fontWeight: 700, marginBottom: 20, letterSpacing: 1 }}>
            🇮🇳 BHARAT SARKAR · OFFICIAL SCHEMES DATABASE
          </div>
          <h1 style={{ fontSize: "clamp(26px,5vw,46px)", fontWeight: 900, lineHeight: 1.15, marginBottom: 16, maxWidth: 580 }}>
            {t.hero_title1}<br /><span style={{ color: "#FF9933" }}>{t.hero_title2}</span>
          </h1>
          <p style={{ fontSize: 16, color: "#94A3B8", marginBottom: 36, maxWidth: 500, lineHeight: 1.75 }}>{t.hero_sub}</p>

          <div style={{ display: "flex", gap: 12, maxWidth: 580, marginBottom: 40 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>🔍</span>
              <input style={{ width: "100%", padding: "13px 16px 13px 48px", border: "2px solid #E0E7FF", borderRadius: 12, fontSize: 15, outline: "none", background: "white", color: "#0F1B3D", boxSizing: "border-box", fontFamily: "inherit" }}
                placeholder={t.search_placeholder}
                onChange={e => { setSearchQuery(e.target.value); if (e.target.value) setPage("schemes"); }} />
            </div>
            <button onClick={() => setPage("schemes")} style={{ background: "linear-gradient(135deg,#FF9933,#FF6B00)", color: "white", border: "none", padding: "12px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>{t.search_btn}</button>
          </div>

          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            {[["25+", t.stats_schemes],["9", t.stats_cat],["1Cr+", t.stats_citizens],["24/7", t.stats_avail]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 30, fontWeight: 800, color: "#FF9933" }}>{n}</div>
                <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PM MODI SECTION ── */}
      <div style={{ background: "linear-gradient(135deg,#0F1B3D,#1a2f5e)", borderRadius: 24, padding: "32px 36px", marginBottom: 40, display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", right: -20, top: -20, width: 200, height: 200, background: "radial-gradient(circle,rgba(255,153,51,0.12),transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        {/* PM photo placeholder */}
        <div style={{ flexShrink: 0, textAlign: "center" }}>
          <div style={{ width: 110, height: 110, borderRadius: "50%", background: "linear-gradient(135deg,#FF9933,#FF6B00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, border: "4px solid rgba(255,153,51,0.4)", margin: "0 auto 10px" }}>👤</div>
          <div style={{ color: "#FF9933", fontWeight: 800, fontSize: 14 }}>Narendra Modi</div>
          <div style={{ color: "#64748B", fontSize: 12 }}>Prime Minister of India</div>
        </div>

        <div style={{ flex: 1, minWidth: 260 }}>
          <div style={{ fontSize: 11, color: "#FF9933", fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>🎙️ {t.pm_section}</div>
          <blockquote style={{ color: "white", fontSize: 16, lineHeight: 1.85, fontStyle: "italic", margin: "0 0 20px", borderLeft: "3px solid #FF9933", paddingLeft: 16 }}>
            "Sabka Saath, Sabka Vikas, Sabka Vishwas — Har nagrik tak sarkari yojnaon ka labh pahunchana hamara sankalp hai. Is portal ke zariye aap apna haq pa sakte hain."
          </blockquote>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="https://www.pmindia.gov.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button style={{ background: "linear-gradient(135deg,#FF9933,#FF6B00)", color: "white", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>🌐 PM India Website ↗</button>
            </a>
            <a href="https://www.youtube.com/@narendramodi" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button style={{ background: "rgba(255,0,0,0.15)", border: "1px solid rgba(255,0,0,0.3)", color: "#ff6b6b", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>▶ Watch on YouTube</button>
            </a>
          </div>
        </div>

        {/* Key Initiatives */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 180 }}>
          {[["🏠","PM Awas Yojana"],["🌾","PM Kisan"],["🏥","Ayushman Bharat"],["💡","Digital India"]].map(([icon, name]) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "8px 14px" }}>
              <span style={{ fontSize: 18 }}>{icon}</span>
              <span style={{ color: "white", fontSize: 13, fontWeight: 600 }}>{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── QUICK ACTIONS ── */}
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0F1B3D", marginBottom: 20 }}>{t.quick_actions}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 48 }}>
        {[
          { icon: "🎯", title: t.check_elig, desc: t.check_elig_desc, action: () => setPage("checker"), color: "#FF9933" },
          { icon: "📚", title: t.edu_schemes, desc: t.edu_desc, action: () => setPage("schemes"), color: "#1565C0" },
          { icon: "🌾", title: t.farm_schemes, desc: t.farm_desc, action: () => setPage("schemes"), color: "#2D7A4F" },
          { icon: "🏥", title: t.health_schemes, desc: t.health_desc, action: () => setPage("schemes"), color: "#C62828" },
        ].map(item => (
          <div key={item.title} onClick={item.action} style={{ background: "white", borderRadius: 16, padding: 24, border: `2px solid ${item.color}20`, cursor: "pointer", transition: "transform 0.2s,box-shadow 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(15,27,61,0.12)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#0F1B3D", marginBottom: 6 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>{item.desc}</div>
            <div style={{ marginTop: 16, color: item.color, fontSize: 13, fontWeight: 700 }}>{t.explore}</div>
          </div>
        ))}
      </div>

      {/* ── LATEST SCHEMES (no "Featured" — show newest 6) ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0F1B3D" }}>🆕 Latest Schemes</h2>
        <button onClick={() => setPage("schemes")} style={{ background: "transparent", border: "2px solid #FF9933", color: "#FF9933", borderRadius: 10, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>View All →</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
        {SCHEMES.slice(0, 6).map((s, i) => (
          <SchemeCard key={s.id} scheme={s} delay={i * 80} onClick={() => { setSelectedScheme(s); setShowSchemeModal(true); }} />
        ))}
      </div>
    </>
  );
}
