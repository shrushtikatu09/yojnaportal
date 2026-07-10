import { useLang } from "../context/LanguageContext";

export default function SchemeCard({ scheme, delay, onClick }) {
  const { lang, t } = useLang();
  const name = lang !== "en" && scheme[`name_${lang}`] ? scheme[`name_${lang}`] : scheme.name;
  const description = lang !== "en" && scheme[`description_${lang}`] ? scheme[`description_${lang}`] : scheme.description;

  return (
    <div onClick={onClick}
      style={{ background: "white", borderRadius: 16, padding: 24, border: `2px solid ${scheme.tagColor}20`, cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", animation: `fadeUp 0.5s ease ${delay}ms both` }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(15,27,61,0.14)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", background: `${scheme.tagColor}15`, color: scheme.tagColor }}>{scheme.tag}</span>
        <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600 }}>{scheme.deadline}</span>
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0F1B3D", marginBottom: 8, lineHeight: 1.35 }}>{name}</h3>
      <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.7, marginBottom: 16 }}>{description.slice(0, 95)}...</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600 }}>{t.benefit}</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#2D7A4F" }}>{scheme.amount}</div>
        </div>
        <div style={{ fontSize: 13, color: "#FF9933", fontWeight: 700 }}>{t.view_details} →</div>
      </div>
    </div>
  );
}
