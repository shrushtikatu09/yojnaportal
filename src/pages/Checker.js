import { useState } from "react";
import SCHEMES from "../data/schemes";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LanguageContext";

const MAX_INCOME_LIMIT = 1500000; // ₹15 lakh — above this, no income-restricted schemes

export default function Checker({ setSelectedScheme, setShowSchemeModal, onAuthRequired }) {
  const { user } = useAuth();
  const { t } = useLang();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ age: "", gender: "", state: "", occupation: "", occupationOther: "", education: "", income: "", category: "" });
  const [matchedSchemes, setMatchedSchemes] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState("");
  const [incomeWarning, setIncomeWarning] = useState(false);

  // Step 2 validation — "other" occupation requires text
  const step2Valid = form.occupation && (form.occupation !== "other" || form.occupationOther.trim().length > 2);
  // All fields mandatory
  const step1Valid = form.age && form.gender;
  const step3Valid = form.education && form.income && form.category;

  const checkEligibility = () => {
    const age = parseInt(form.age);
    const income = parseInt(form.income) || 0;
    const highIncome = income > MAX_INCOME_LIMIT;
    setIncomeWarning(highIncome);

    const matched = SCHEMES.filter(s => {
      const e = s.eligibility;
      if (age < e.minAge || age > e.maxAge) return false;
      if (e.gender !== "all" && form.gender !== e.gender) return false;
      // Income check — if scheme has income limit AND user income exceeds it, skip
      if (e.income > 0 && income > e.income) return false;
      // If user income > govt max limit, skip all income-restricted schemes
      if (highIncome && e.income > 0) return false;
      // Occupation match
      const occ = form.occupation === "other" ? "any" : form.occupation;
      if (e.occupation !== "any" && occ && !e.occupation.includes(occ)) return false;
      return true;
    });

    setMatchedSchemes(matched);
    setStep(4);
    fetchAiInsight(matched);
  };

  const fetchAiInsight = async (schemes) => {
    if (schemes.length === 0) return;
    setAiLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 300,
          messages: [{ role: "user", content: `Person profile: Age: ${form.age}, Gender: ${form.gender}, Occupation: ${form.occupation === "other" ? form.occupationOther : form.occupation}, Income: ₹${form.income}/year, Education: ${form.education}, Category: ${form.category}, State: ${form.state}. Eligible schemes: ${schemes.slice(0,5).map(s => s.name).join(", ")}. Write a SHORT 2-sentence Hinglish (Hindi+English mix) recommendation telling which scheme to apply for FIRST and one key step to take. Be warm and motivating. No bullet points.` }]
        })
      });
      const data = await res.json();
      setAiInsight(data.content?.[0]?.text || "");
    } catch { setAiInsight("Aapke profile ke hisaab se yeh schemes sabse suitable hain! Sabse pehle eligibility confirm karke official website par apply karein."); }
    setAiLoading(false);
  };

  const reset = () => { setStep(1); setForm({ age:"",gender:"",state:"",occupation:"",occupationOther:"",education:"",income:"",category:"" }); setMatchedSchemes([]); setAiInsight(""); setIncomeWarning(false); };

  const STATES = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Other"];

  if (!user) {
    return (
      <div style={{ maxWidth: 480, margin: "80px auto", textAlign: "center", padding: "0 24px" }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>🔒</div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: "#0F1B3D", marginBottom: 12 }}>{t.login_required}</h2>
        <p style={{ color: "#64748B", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>{t.login_required_sub}</p>
        <button onClick={onAuthRequired} style={{ background: "linear-gradient(135deg,#FF9933,#FF6B00)", color: "white", border: "none", padding: "14px 36px", borderRadius: 12, fontSize: 16, fontWeight: 800, cursor: "pointer" }}>{t.login_to_continue}</button>
      </div>
    );
  }

  const steps = [{ id:1,label:t.step1,icon:"👤" },{ id:2,label:t.step2,icon:"🎓" },{ id:3,label:t.step3,icon:"💰" },{ id:4,label:t.step4,icon:"🎯" }];

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", paddingTop: 40 }}>
      <h1 style={{ fontSize: 28, fontWeight: 900, color: "#0F1B3D", marginBottom: 8 }}>{t.checker_title}</h1>
      <p style={{ color: "#64748B", marginBottom: 32, fontSize: 15 }}>
        {t.welcome} <strong style={{ color: "#FF9933" }}>{user.name}</strong>! {t.checker_sub}
      </p>

      {/* Progress */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
        {steps.map((s, i) => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", flex: i < 3 ? 1 : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, transition: "all 0.3s", background: step > s.id ? "#2D7A4F" : step === s.id ? "#FF9933" : "#E0E7FF", color: step >= s.id ? "white" : "#94A3B8" }}>
                {step > s.id ? "✓" : s.icon}
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", color: step === s.id ? "#FF9933" : "#94A3B8" }}>{s.label}</span>
            </div>
            {i < 3 && <div style={{ flex: 1, height: 2, background: step > s.id ? "#2D7A4F" : "#E0E7FF", margin: "0 8px", marginBottom: 22, transition: "background 0.3s" }} />}
          </div>
        ))}
      </div>

      <div style={{ background: "white", borderRadius: 20, padding: 32, boxShadow: "0 4px 24px rgba(15,27,61,0.08)", animation: "fadeUp 0.4s ease" }} key={step}>

        {/* STEP 1 — Personal Info */}
        {step === 1 && <>
          <h2 style={sh}>👤 {t.step1}</h2>
          <div style={{ display: "grid", gap: 20 }}>
            <Field label={t.age_field}>
              <input style={inp} type="number" min="0" max="100" placeholder="e.g. 22" value={form.age} onChange={e => setForm({...form, age: e.target.value})} />
            </Field>
            <Field label={t.gender_field}>
              <select style={inp} value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}>
                <option value="">{t.select_gender}</option>
                <option value="male">{t.male}</option>
                <option value="female">{t.female}</option>
                <option value="other">{t.other_gender}</option>
              </select>
            </Field>
            <Field label={t.state_field}>
              <select style={inp} value={form.state} onChange={e => setForm({...form, state: e.target.value})}>
                <option value="">{t.select_state}</option>
                {STATES.map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>
          <button style={{ ...btnMain, marginTop: 28, opacity: !step1Valid ? 0.5 : 1 }} disabled={!step1Valid} onClick={() => setStep(2)}>{t.next_btn}</button>
        </>}

        {/* STEP 2 — Education & Occupation */}
        {step === 2 && <>
          <h2 style={sh}>🎓 {t.step2}</h2>
          <div style={{ display: "grid", gap: 20 }}>
            <Field label={t.occupation_field}>
              <select style={inp} value={form.occupation} onChange={e => setForm({...form, occupation: e.target.value, occupationOther: ""})}>
                <option value="">{t.select_occ}</option>
                <option value="student">{t.student}</option>
                <option value="farmer">{t.farmer}</option>
                <option value="self-employed">{t.self_emp}</option>
                <option value="government">{t.govt_emp}</option>
                <option value="private">{t.pvt_emp}</option>
                <option value="unemployed">{t.unemployed}</option>
                <option value="other">{t.other_occ}</option>
              </select>
            </Field>

            {/* "Other" occupation — must fill text */}
            {form.occupation === "other" && (
              <Field label="📝 Apna Occupation Batayein *">
                <input style={{ ...inp, borderColor: form.occupationOther.trim().length < 3 ? "#FCA5A5" : "#E0E7FF" }}
                  placeholder={t.other_occupation_placeholder}
                  value={form.occupationOther}
                  onChange={e => setForm({...form, occupationOther: e.target.value})} />
                {form.occupationOther.trim().length < 3 && form.occupationOther.length > 0 && (
                  <div style={{ fontSize: 12, color: "#C62828", marginTop: 5 }}>⚠️ Kam se kam 3 characters likhna zaroori hai</div>
                )}
              </Field>
            )}

            <Field label={t.education_field}>
              <select style={inp} value={form.education} onChange={e => setForm({...form, education: e.target.value})}>
                <option value="">{t.select_edu}</option>
                <option value="none">{t.none_baby}</option>
                <option value="below_10th">{t.below_10th}</option>
                <option value="10th">{t.edu_10th}</option>
                <option value="12th">{t.edu_12th}</option>
                <option value="graduation">{t.graduation}</option>
                <option value="post-graduation">{t.post_grad}</option>
                <option value="diploma">{t.diploma}</option>
              </select>
            </Field>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            <button style={btnOutline} onClick={() => setStep(1)}>{t.back_btn}</button>
            <button style={{ ...btnMain, flex: 1, opacity: !step2Valid ? 0.5 : 1 }} disabled={!step2Valid} onClick={() => setStep(3)}>{t.next_btn}</button>
          </div>
        </>}

        {/* STEP 3 — Income & Category */}
        {step === 3 && <>
          <h2 style={sh}>💰 {t.step3}</h2>
          <div style={{ display: "grid", gap: 20 }}>
            <Field label={t.income_field + " *"}>
              <input style={inp} type="number" min="0" placeholder="e.g. 150000"
                value={form.income} onChange={e => setForm({...form, income: e.target.value})} />
              <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 6 }}>💡 {t.income_hint}</div>
              {parseInt(form.income) > MAX_INCOME_LIMIT && (
                <div style={{ marginTop: 8, padding: "8px 12px", background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 8, fontSize: 12, color: "#FF6B00", fontWeight: 600 }}>
                  {t.income_exceeded}
                </div>
              )}
            </Field>
            <Field label={t.category_field + " *"}>
              <select style={inp} value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                <option value="">{t.select_cat}</option>
                <option value="general">{t.general}</option>
                <option value="obc">{t.obc}</option>
                <option value="sc">{t.sc}</option>
                <option value="st">{t.st}</option>
                <option value="minority">{t.minority}</option>
                <option value="ews">{t.ews}</option>
              </select>
            </Field>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            <button style={btnOutline} onClick={() => setStep(2)}>{t.back_btn}</button>
            <button style={{ ...btnMain, flex: 1, opacity: !step3Valid ? 0.5 : 1 }} disabled={!step3Valid} onClick={checkEligibility}>{t.find_btn}</button>
          </div>
        </>}

        {/* STEP 4 — Results */}
        {step === 4 && <>
          <h2 style={sh}>{matchedSchemes.length > 0 ? `🎉 ${matchedSchemes.length} ${t.results_found}` : `😔 ${t.no_results}`}</h2>
          <p style={{ color: "#64748B", fontSize: 14, marginBottom: 20 }}>{t.results_sub}</p>

          {incomeWarning && (
            <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 12, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#FF6B00", fontWeight: 600 }}>
              {t.income_exceeded}
            </div>
          )}

          {aiLoading ? (
            <div style={{ background: "#F8F0FF", borderLeft: "4px solid #7C3AED", padding: 16, borderRadius: 12, marginBottom: 20, color: "#7C3AED", fontSize: 14, opacity: 0.75 }}>🤖 AI analysis ho rahi hai...</div>
          ) : aiInsight ? (
            <div style={{ background: "linear-gradient(135deg,#E8F0FE,#F3E8FF)", borderLeft: "4px solid #7C3AED", padding: "16px 20px", borderRadius: 12, marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#7C3AED", marginBottom: 8, letterSpacing: 1 }}>{t.ai_label}</div>
              <div style={{ fontSize: 14, color: "#1E1B4B", lineHeight: 1.75 }}>{aiInsight}</div>
            </div>
          ) : null}

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {matchedSchemes.map((s, i) => (
              <div key={s.id} onClick={() => { setSelectedScheme(s); setShowSchemeModal(true); }}
                style={{ border: `2px solid ${s.tagColor}30`, borderRadius: 14, padding: 18, background: "white", cursor: "pointer", transition: "all 0.2s", animation: `fadeUp 0.4s ease ${i * 70}ms both` }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 24px rgba(15,27,61,0.1)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <div>
                    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: `${s.tagColor}15`, color: s.tagColor, marginBottom: 6 }}>{s.tag}</span>
                    <div style={{ fontWeight: 800, fontSize: 15, color: "#0F1B3D", marginBottom: 3 }}>{s.name}</div>
                    <div style={{ fontSize: 13, color: "#2D7A4F", fontWeight: 700 }}>{s.amount}</div>
                  </div>
                  <div style={{ background: "#FF9933", color: "white", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>{t.view_detail}</div>
                </div>
              </div>
            ))}
          </div>

          {matchedSchemes.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#94A3B8" }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>🔍</div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{t.no_scheme_msg}</div>
            </div>
          )}

          <button style={{ ...btnOutline, width: "100%", marginTop: 24 }} onClick={reset}>{t.recheck}</button>
        </>}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#0F1B3D", marginBottom: 8 }}>{label}</label>
      {children}
    </div>
  );
}

const sh = { fontSize: 20, fontWeight: 800, color: "#0F1B3D", marginBottom: 24, marginTop: 0 };
const inp = { width: "100%", padding: "12px 16px", border: "2px solid #E0E7FF", borderRadius: 10, fontSize: 14, outline: "none", background: "white", color: "#0F1B3D", boxSizing: "border-box", fontFamily: "inherit", transition: "border 0.2s" };
const btnMain = { background: "linear-gradient(135deg,#FF9933,#FF6B00)", color: "white", border: "none", padding: "13px 28px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", width: "100%", transition: "all 0.2s" };
const btnOutline = { background: "transparent", border: "2px solid #0F1B3D", color: "#0F1B3D", padding: "11px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" };
