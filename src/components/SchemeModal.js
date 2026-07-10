import { useLang } from "../context/LanguageContext";

export default function SchemeModal({ scheme, onClose }) {
  const { lang, t } = useLang();
  if (!scheme) return null;

  const name = lang !== "en" && scheme[`name_${lang}`] ? scheme[`name_${lang}`] : scheme.name;
  const ministry = lang !== "en" && scheme[`ministry_${lang}`] ? scheme[`ministry_${lang}`] : scheme.ministry;
  const description = lang !== "en" && scheme[`description_${lang}`] ? scheme[`description_${lang}`] : scheme.description;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, backdropFilter: "blur(3px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: 24, padding: 32, maxWidth: 560, width: "100%", maxHeight: "88vh", overflowY: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.2)", animation: "fadeUp 0.3s ease" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, textTransform: "uppercase", background: `${scheme.tagColor}18`, color: scheme.tagColor, marginBottom: 10 }}>{scheme.tag}</span>
            <h2 style={{ fontSize: 21, fontWeight: 900, color: "#0F1B3D", lineHeight: 1.3, margin: 0 }}>{name}</h2>
            <div style={{ fontSize: 13, color: "#64748B", marginTop: 5 }}>🏛️ {ministry}</div>
          </div>
          <button onClick={onClose} style={{ background: "#F1F5F9", border: "none", borderRadius: 10, color: "#64748B", fontSize: 18, cursor: "pointer", padding: "6px 11px", lineHeight: 1, flexShrink: 0 }}>✕</button>
        </div>

        <div style={{ height: 4, background: "linear-gradient(to right,#FF9933 33%,white 33%,white 66%,#138808 66%)", borderRadius: 2, marginBottom: 20 }} />

        <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.85, marginBottom: 22 }}>{description}</p>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          <div style={{ background: "#F0FFF4", borderRadius: 12, padding: 16, border: "1px solid #BBF7D0" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#2D7A4F", marginBottom: 5 }}>💰 {t.benefit}</div>
            <div style={{ fontWeight: 800, color: "#0F1B3D", fontSize: 15 }}>{scheme.amount}</div>
          </div>
          <div style={{ background: "#FFF7ED", borderRadius: 12, padding: 16, border: "1px solid #FED7AA" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#FF6B00", marginBottom: 5 }}>📅 {t.deadline_lbl}</div>
            <div style={{ fontWeight: 800, color: "#0F1B3D", fontSize: 15 }}>{scheme.deadline}</div>
          </div>
        </div>

        {/* Documents */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#0F1B3D", marginBottom: 14 }}>{t.req_docs}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {scheme.documents.map((doc, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#F8FAFC", borderRadius: 10, fontSize: 14, color: "#334155", border: "1px solid #E8F0FE" }}>
                <span style={{ color: "#2D7A4F", fontWeight: 800, fontSize: 16 }}>✓</span>{doc}
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility badges */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#0F1B3D", marginBottom: 12 }}>{t.eligibility_lbl}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <span style={{ padding: "6px 14px", background: "#E8F0FE", borderRadius: 20, fontSize: 13, color: "#1565C0", fontWeight: 600 }}>
              {t.age_lbl}: {scheme.eligibility.minAge}–{scheme.eligibility.maxAge} yrs
            </span>
            {scheme.eligibility.income > 0 && (
              <span style={{ padding: "6px 14px", background: "#FFF0F0", borderRadius: 20, fontSize: 13, color: "#C62828", fontWeight: 600 }}>
                {t.income_lbl} &lt; ₹{scheme.eligibility.income.toLocaleString("en-IN")}
              </span>
            )}
            <span style={{ padding: "6px 14px", background: "#F0FFF4", borderRadius: 20, fontSize: 13, color: "#2D7A4F", fontWeight: 600 }}>
              {scheme.eligibility.gender === "all" ? t.all_genders : scheme.eligibility.gender === "female" ? t.female_only : t.male_only}
            </span>
            <span style={{ padding: "6px 14px", background: "#FFF7ED", borderRadius: 20, fontSize: 13, color: "#FF6B00", fontWeight: 600 }}>{scheme.category}</span>
          </div>
        </div>

        {/* APPLY BUTTON — opens official website */}
        <a href={scheme.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
          <button style={{ width: "100%", padding: "16px 20px", background: "linear-gradient(135deg,#FF9933,#FF6B00)", color: "white", border: "none", borderRadius: 14, fontSize: 16, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.2s", boxShadow: "0 4px 20px rgba(255,153,51,0.35)" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            {t.apply_btn}
            <span style={{ fontSize: 12, background: "rgba(255,255,255,0.25)", padding: "3px 10px", borderRadius: 20 }}>↗ {scheme.link.replace("https://","")}</span>
          </button>
        </a>

        <p style={{ textAlign: "center", fontSize: 12, color: "#94A3B8", marginTop: 12 }}>
          ↗ Opens official government website in a new tab
        </p>
      </div>
    </div>
  );
}
