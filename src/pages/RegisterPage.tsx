import { useState } from "react";

interface RegisterPageProps {
  setPage: (page: string) => void;
}

export default function RegisterPage({ setPage }: RegisterPageProps) {
  const [step, setStep] = useState(1);
  return (
    <div className="auth-wrap">
      <div className="auth-side">
        <div className="auth-side-pattern" />
        <div className="auth-side-pattern2" />
        <div style={{ position: "relative", zIndex: 1, color: "white" }}>
          <div className="nav-logo-mark" style={{ marginBottom: 40, width: 50, height: 50, fontSize: 22 }}>N</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 36, fontWeight: 700, lineHeight: 1.2, marginBottom: 20 }}>Open Your Account in 3 Minutes</h2>
          {(["1", "2", "3"] as const).map((n) => {
            const labels: Record<string, string> = { "1": "Personal Details", "2": "Contact & ID Verification", "3": "Account Setup" };
            const done = step >= parseInt(n);
            const l = labels[n];
            return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: done ? "#1A56DB" : "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>{done ? "✓" : n}</div>
              <span style={{ color: done ? "white" : "rgba(255,255,255,0.5)", fontSize: 15, fontWeight: done ? 600 : 400 }}>{l}</span>
            </div>
          );})}
        </div>
      </div>
      <div className="auth-form-side">
        <div className="auth-form-box" style={{ maxWidth: 460 }}>
          {step === 1 && <>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 28 }}>Personal Information</h2>
            <div className="grid-2">
              <div className="form-group"><label className="form-label">First Name</label><input className="form-input" defaultValue="Adaeze" /></div>
              <div className="form-group"><label className="form-label">Last Name</label><input className="form-input" defaultValue="Okonkwo" /></div>
            </div>
            <div className="form-group"><label className="form-label">Date of Birth</label><input className="form-input" type="date" defaultValue="1992-05-15" /></div>
            <div className="form-group"><label className="form-label">Gender</label><select className="form-select"><option>Female</option><option>Male</option><option>Prefer not to say</option></select></div>
            <div className="form-group"><label className="form-label">Nationality</label><select className="form-select"><option>Nigerian</option><option>Other</option></select></div>
            <button className="btn btn-primary btn-block btn-lg" onClick={() => setStep(2)}>Continue →</button>
          </>}
          {step === 2 && <>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 28 }}>Contact & Verification</h2>
            <div className="form-group"><label className="form-label">Email Address</label><input className="form-input" type="email" defaultValue="ada.okonkwo@email.com" /></div>
            <div className="form-group"><label className="form-label">Phone Number</label><input className="form-input" defaultValue="+234 803 456 7890" /></div>
            <div className="form-group"><label className="form-label">NIN / BVN</label><input className="form-input" defaultValue="1234 5678 9012" /><div className="form-hint">Your BVN/NIN is required for regulatory compliance</div></div>
            <div className="form-group"><label className="form-label">ID Type</label><select className="form-select"><option>National ID Card</option><option>Passport</option><option>Driver's License</option></select></div>
            <div style={{ border: "2px dashed #E2E8F0", borderRadius: 12, padding: 24, textAlign: "center", marginBottom: 20, cursor: "pointer" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📎</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Upload ID Document</div>
              <div style={{ fontSize: 13, color: "#64748B" }}>JPG, PNG or PDF — max 5MB</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-secondary btn-block" onClick={() => setStep(1)}>← Back</button>
              <button className="btn btn-primary btn-block" onClick={() => setStep(3)}>Continue →</button>
            </div>
          </>}
          {step === 3 && <>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 28 }}>Set Up Account</h2>
            <div className="form-group"><label className="form-label">Choose Account Type</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[["Personal Savings", "Zero fees, 3.5% interest"], ["Personal Current", "Unlimited transactions"], ["Business Account", "For sole traders & companies"]].map(([t, d]) => (
                  <label key={t} style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, border: "1.5px solid #E2E8F0", borderRadius: 10, cursor: "pointer" }}>
                    <input type="radio" name="acct" defaultChecked={t === "Personal Savings"} />
                    <div><div style={{ fontWeight: 600 }}>{t}</div><div style={{ fontSize: 12, color: "#64748B" }}>{d}</div></div>
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group"><label className="form-label">Create Password</label><input className="form-input" type="password" placeholder="Min. 8 characters" /></div>
            <div className="form-group"><label className="form-label">Confirm Password</label><input className="form-input" type="password" /></div>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <input type="checkbox" id="terms" />
              <label htmlFor="terms" style={{ fontSize: 13, color: "#64748B" }}>I agree to the <span style={{ color: "#1A56DB" }}>Terms of Service</span> and <span style={{ color: "#1A56DB" }}>Privacy Policy</span></label>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-secondary btn-block" onClick={() => setStep(2)}>← Back</button>
              <button className="btn btn-primary btn-block" onClick={() => setPage("login")}>Open Account 🎉</button>
            </div>
          </>}
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <span style={{ fontSize: 14, color: "#64748B" }}>Already have an account? </span>
            <span style={{ fontSize: 14, color: "#1A56DB", fontWeight: 600, cursor: "pointer" }} onClick={() => setPage("login")}>Sign In</span>
          </div>
        </div>
      </div>
    </div>
  );
}
