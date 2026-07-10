import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LanguageContext";

export default function AuthModal({ onClose }) {
  const { login, signup } = useAuth();
  const { t } = useLang();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setError(""); setLoading(true);
    setTimeout(() => {
      const result = mode === "login" ? login(form.email, form.password) : signup(form.name, form.email, form.password);
      if (result.success) onClose(); else setError(result.error);
      setLoading(false);
    }, 700);
  };

  const switchMode = () => { setMode(m => m === "login" ? "signup" : "login"); setError(""); setForm({ name: "", email: "", password: "" }); };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, backdropFilter: "blur(4px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: 24, width: "100%", maxWidth: 440, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.25)", animation: "fadeUp 0.3s ease" }}>
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg,#0F1B3D,#1E3A8A)", padding: "28px 32px 24px" }}>
          <div style={{ height: 4, background: "linear-gradient(to right,#FF9933 33%,white 33%,white 66%,#138808 66%)", borderRadius: 2, marginBottom: 20 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 28, marginBottom: 6 }}>🇮🇳</div>
              <h2 style={{ color: "white", fontSize: 22, fontWeight: 900, margin: 0 }}>{mode === "login" ? "Welcome Back!" : "Join YojnaPortal"}</h2>
              <p style={{ color: "#94A3B8", fontSize: 13, margin: "6px 0 0" }}>{mode === "login" ? "Login karein aur apni schemes dhundein" : "Free account banao — ek minute mein"}</p>
            </div>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 8, color: "white", fontSize: 20, cursor: "pointer", padding: "4px 10px", lineHeight: 1 }}>✕</button>
          </div>
        </div>

        <div style={{ padding: "28px 32px 32px" }}>
          {/* Tabs */}
          <div style={{ display: "flex", background: "#F0F4FF", borderRadius: 12, padding: 4, marginBottom: 24 }}>
            {["login","signup"].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(""); setForm({ name:"",email:"",password:"" }); }} style={{ flex: 1, padding: "9px", borderRadius: 9, border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer", background: mode === m ? "white" : "transparent", color: mode === m ? "#0F1B3D" : "#94A3B8", boxShadow: mode === m ? "0 2px 8px rgba(0,0,0,0.1)" : "none", transition: "all 0.2s" }}>
                {m === "login" ? "🔑 Login" : "✨ Sign Up"}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {mode === "signup" && (
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#0F1B3D", marginBottom: 8 }}>Full Name</label>
                <input style={inputStyle} placeholder="e.g. Rahul Sharma" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
            )}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#0F1B3D", marginBottom: 8 }}>Email Address</label>
              <input style={inputStyle} type="email" placeholder="aapka@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#0F1B3D", marginBottom: 8 }}>Password</label>
              <input style={inputStyle} type="password" placeholder="Min. 6 characters" value={form.password} onChange={e => setForm({...form, password: e.target.value})} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
            </div>
          </div>

          {error && <div style={{ marginTop: 14, padding: "10px 14px", background: "#FFF0F0", border: "1px solid #FECACA", borderRadius: 10, color: "#C62828", fontSize: 13, fontWeight: 600 }}>⚠️ {error}</div>}

          <button onClick={handleSubmit} disabled={loading} style={{ marginTop: 22, width: "100%", padding: 14, background: loading ? "#ccc" : "linear-gradient(135deg,#FF9933,#FF6B00)", color: "white", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s" }}>
            {loading ? "⏳ Please wait..." : mode === "login" ? "🔑 Login Karein" : "🚀 Account Banao"}
          </button>

          <div style={{ marginTop: 16, padding: "10px 14px", background: "#F0FFF4", border: "1px solid #BBF7D0", borderRadius: 10, fontSize: 12, color: "#2D7A4F", fontWeight: 600, textAlign: "center" }}>
            💡 Demo: koi bhi email + 6+ char password
          </div>

          <p style={{ textAlign: "center", fontSize: 13, color: "#64748B", marginTop: 18 }}>
            {mode === "login" ? "Naya account chahiye? " : "Pehle se account hai? "}
            <span onClick={switchMode} style={{ color: "#FF9933", fontWeight: 700, cursor: "pointer" }}>{mode === "login" ? "Sign Up karein" : "Login karein"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

const inputStyle = { width: "100%", padding: "13px 16px", border: "2px solid #E0E7FF", borderRadius: 12, fontSize: 15, outline: "none", background: "#FAFBFF", color: "#0F1B3D", boxSizing: "border-box", fontFamily: "inherit" };
