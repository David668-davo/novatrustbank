import { useState } from "react";

interface LoginPageProps {
  setPage: (page: string) => void;
  setLoggedIn: (value: boolean) => void;
}

export default function LoginPage({ setPage, setLoggedIn }: LoginPageProps) {
  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("ada.okonkwo@email.com");
  const [pass, setPass] = useState("••••••••");
  const [bio, setBio] = useState(false);

  if (step === "2fa") return (
    <div className="auth-wrap">
      <div className="auth-side">
        <div className="auth-side-pattern" />
        <div className="auth-side-pattern2" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="nav-logo-mark" style={{ marginBottom: 40, width: 50, height: 50, fontSize: 22 }}>N</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginBottom: 16 }}>Security First</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 36, fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: 16 }}>Two-Factor Authentication</h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.7 }}>Your account is protected with multi-layer security. Enter the code sent to your registered device.</p>
        </div>
      </div>
      <div className="auth-form-side">
        <div className="auth-form-box">
          <div style={{ fontSize: 40, marginBottom: 16 }}>📱</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Verify Your Identity</h2>
          <p style={{ color: "#64748B", fontSize: 14, marginBottom: 8 }}>A 6-digit code was sent to your phone</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#1A56DB", marginBottom: 24 }}>+234 *** *** 7291</p>
          <div className="two-fa-box">
            {[1,2,3,4,5,6].map(i => <input key={i} className="two-fa-input" maxLength={1} defaultValue={i === 1 ? "4" : i === 2 ? "8" : ""} />)}
          </div>
          <button className="btn btn-primary btn-block btn-lg" onClick={() => { setLoggedIn(true); setPage("dashboard"); }}>Verify & Sign In</button>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <span style={{ fontSize: 14, color: "#64748B" }}>Didn't receive code? </span>
            <span style={{ fontSize: 14, color: "#1A56DB", fontWeight: 600, cursor: "pointer" }}>Resend (0:45)</span>
          </div>
          <div className="divider" />
          <button className="btn btn-secondary btn-block" onClick={() => setStep("login")}>← Back to Login</button>
        </div>
      </div>
    </div>
  );

  if (step === "forgot") return (
    <div className="auth-wrap">
      <div className="auth-side">
        <div className="auth-side-pattern" />
        <div className="auth-side-pattern2" />
        <div style={{ position: "relative", zIndex: 1, color: "white" }}>
          <div className="nav-logo-mark" style={{ marginBottom: 40, width: 50, height: 50, fontSize: 22 }}>N</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 36, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>Account Recovery</h2>
          <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>We'll send a secure reset link to your registered email or phone number.</p>
        </div>
      </div>
      <div className="auth-form-side">
        <div className="auth-form-box">
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔑</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Forgot Password?</h2>
          <p style={{ color: "#64748B", fontSize: 14, marginBottom: 28 }}>Enter your email and we'll send a recovery link</p>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" defaultValue="ada.okonkwo@email.com" />
          </div>
          <button className="btn btn-primary btn-block btn-lg" onClick={() => setStep("login")}>Send Recovery Link</button>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <span style={{ fontSize: 14, color: "#1A56DB", fontWeight: 600, cursor: "pointer" }} onClick={() => setStep("login")}>← Back to Login</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="auth-wrap">
      <div className="auth-side">
        <div className="auth-side-pattern" />
        <div className="auth-side-pattern2" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="nav-logo-mark" style={{ marginBottom: 40, width: 50, height: 50, fontSize: 22 }}>N</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 36, fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: 16 }}>Welcome Back</h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.7, marginBottom: 40 }}>Your finances, secured and accessible from anywhere in the world.</p>
          {[["🔒 Bank-grade 256-bit encryption"], ["📱 Biometric authentication"], ["🌐 Access from any device"]].map(([f]) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#60A5FA" }} />
              <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 14 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="auth-form-side">
        <div className="auth-form-box">
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Sign In</h2>
          <p style={{ color: "#64748B", fontSize: 14, marginBottom: 32 }}>Enter your credentials to access your account</p>

          {bio ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>👆</div>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Touch ID / Face ID</div>
              <p style={{ color: "#64748B", fontSize: 14, marginBottom: 24 }}>Place your finger on the sensor or look at the camera</p>
              <button className="btn btn-primary" onClick={() => { setLoggedIn(true); setPage("dashboard"); }}>Authenticate</button>
              <div style={{ marginTop: 16 }}><span style={{ fontSize: 13, color: "#64748B", cursor: "pointer" }} onClick={() => setBio(false)}>Use password instead</span></div>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
                <button className="btn btn-secondary" style={{ flex: 1, gap: 6 }} onClick={() => setBio(true)}>👆 Biometric</button>
                <button className="btn btn-secondary" style={{ flex: 1, gap: 6 }} onClick={() => setStep("2fa")}>📱 OTP</button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
                <span style={{ fontSize: 13, color: "#94A3B8" }}>or use email</span>
                <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <label className="form-label">Password</label>
                  <span style={{ fontSize: 13, color: "#1A56DB", fontWeight: 600, cursor: "pointer" }} onClick={() => setStep("forgot")}>Forgot password?</span>
                </div>
                <input className="form-input" type="password" value={pass} onChange={e => setPass(e.target.value)} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                <input type="checkbox" id="remember" defaultChecked />
                <label htmlFor="remember" style={{ fontSize: 14, color: "#64748B" }}>Remember this device for 30 days</label>
              </div>
              <button className="btn btn-primary btn-block btn-lg" onClick={() => setStep("2fa")}>Sign In Securely</button>
            </>
          )}

          <div className="divider" />
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 14, color: "#64748B" }}>Don't have an account? </span>
            <span style={{ fontSize: 14, color: "#1A56DB", fontWeight: 600, cursor: "pointer" }} onClick={() => setPage("register")}>Open Account</span>
          </div>
          <div style={{ marginTop: 20, padding: 14, background: "#EFF6FF", borderRadius: 10, display: "flex", gap: 10, alignItems: "center" }}>
            <span>🔒</span>
            <span style={{ fontSize: 12, color: "#1A56DB" }}>Your connection is secured with 256-bit TLS encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}
