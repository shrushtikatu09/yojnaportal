import { useState } from "react";
import SchemeCard from "../components/SchemeCard";
import SCHEMES, { CATEGORIES } from "../data/schemes";
import { useLang } from "../context/LanguageContext";

export default function Schemes({ searchQuery, setSearchQuery, setSelectedScheme, setShowSchemeModal }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { t } = useLang();

  const filtered = SCHEMES.filter(s => {
    const matchCat = selectedCategory === "All" || s.category === selectedCategory;
    const matchQ = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <>
      <div style={{ padding: "32px 0 24px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#0F1B3D", marginBottom: 8 }}>{t.all_schemes}</h1>
        <p style={{ color: "#64748B", fontSize: 15 }}>{t.all_schemes_sub}</p>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 240 }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}>🔍</span>
          <input style={{ width: "100%", padding: "12px 16px 12px 42px", border: "2px solid #E0E7FF", borderRadius: 10, fontSize: 14, outline: "none", background: "white", color: "#0F1B3D", boxSizing: "border-box", fontFamily: "inherit" }}
            placeholder={t.search_placeholder} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: "8px 18px", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", border: `2px solid ${selectedCategory === cat ? "#0F1B3D" : "#E0E7FF"}`, background: selectedCategory === cat ? "#0F1B3D" : "white", color: selectedCategory === cat ? "white" : "#64748B" }}>{cat}</button>
        ))}
      </div>

      <div style={{ marginBottom: 16, color: "#64748B", fontSize: 14, fontWeight: 600 }}>{filtered.length} {t.schemes_found}</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: 20 }}>
        {filtered.map((s, i) => (
          <SchemeCard key={s.id} scheme={s} delay={i * 50} onClick={() => { setSelectedScheme(s); setShowSchemeModal(true); }} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 0", color: "#94A3B8" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Koi scheme nahi mili</div>
          <div style={{ fontSize: 14, marginTop: 6 }}>Search ya filter change karein</div>
        </div>
      )}
    </>
  );
}
