import BankCard from "../components/banking/BankCard";

interface HomePageProps {
  setPage: (page: string) => void;
}

export default function HomePage({ setPage }: HomePageProps) {
  const services = [
    { icon: "💳", color: "#EFF6FF", title: "Everyday Banking", desc: "Zero-fee checking accounts, instant debit cards, and ATM access at 50,000+ locations." },
    { icon: "📈", color: "#ECFDF5", title: "Smart Investing", desc: "Start with as little as $1. Diversified ETFs, stocks, and bonds managed for you." },
    { icon: "🏠", color: "#FFF7ED", title: "Home Mortgages", desc: "Competitive rates from 6.4% APR. Pre-approval in minutes, close in days." },
    { icon: "🛡️", color: "#FDF4FF", title: "Savings & Goals", desc: "High-yield savings up to 5.2% APY. Set goals, track progress, earn more." },
    { icon: "💼", color: "#EFF6FF", title: "Business Banking", desc: "Invoicing, payroll, expense management, and dedicated relationship managers." },
    { icon: "🌍", color: "#F0FDF4", title: "International Transfers", desc: "Send money to 150+ countries. Real exchange rates, low flat fees." },
  ];
  const testimonials = [
    { text: "NovaTrust transformed how I manage my finances. The app is intuitive and the customer service is exceptional.", name: "Chidinma Obi", role: "Entrepreneur, Lagos", color: "#6366F1" },
    { text: "Getting my mortgage was seamless. The team walked me through every step and I got a fantastic rate.", name: "Emmanuel Taiwo", role: "Software Engineer, Abuja", color: "#0891B2" },
    { text: "The investment portfolio tools are world-class. My savings have grown 18% this year alone.", name: "Blessing Adeyinka", role: "Teacher, Port Harcourt", color: "#059669" },
  ];

  return (
    <div style={{ paddingTop: 68 }}>
      {/* HERO */}
      <div className="hero">
        <div className="hero-bg-circle1" />
        <div className="hero-bg-circle2" />
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div className="hero-content">
              <div className="hero-tag">🇳🇬 Trusted by 2M+ Nigerians</div>
              <h1 className="hero-title">Banking That <span>Works for</span> You</h1>
              <p className="hero-subtitle">NovaTrust brings enterprise-grade financial tools to everyone. Open an account in 3 minutes, no paperwork needed.</p>
              <div className="hero-actions">
                <button className="btn btn-primary btn-lg" onClick={() => setPage("register")}>Open Free Account</button>
                <button className="btn btn-lg" style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }} onClick={() => setPage("login")}>Sign In</button>
              </div>
              <div className="hero-stats">
                {[["$4.2B+", "Assets Under Management"], ["2M+", "Active Customers"], ["150+", "Countries Supported"]].map(([v, l]) => (
                  <div key={l}>
                    <div className="hero-stat-value">{v}</div>
                    <div className="hero-stat-label">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <BankCard type="blue" last4="4521" name="ADAEZE OKONKWO" expiry="09/28" />
              <div style={{ marginTop: 16 }}>
                <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 4 }}>Total Balance</div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 28, fontWeight: 700, color: "white" }}>$12,430.50</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#10B981", fontSize: 13, fontWeight: 600 }}>↑ +$340.20</div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>this month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div className="section" style={{ background: "white" }}>
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <div className="section-label">Our Services</div>
            <h2 className="section-title">Everything You Need,<br />All in One Place</h2>
            <p className="section-subtitle" style={{ margin: "12px auto 0" }}>From everyday transactions to long-term wealth building.</p>
          </div>
          <div className="services-grid">
            {services.map(s => (
              <div key={s.title} className="service-card">
                <div className="service-icon" style={{ background: s.color }}>{s.icon}</div>
                <div className="service-title">{s.title}</div>
                <div className="service-desc">{s.desc}</div>
                <div style={{ marginTop: 16, fontSize: 14, fontWeight: 600, color: "#1A56DB", cursor: "pointer" }}>Learn more →</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="section" style={{ background: "#F8FAFC" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label">Testimonials</div>
            <h2 className="section-title">Loved by Customers</h2>
          </div>
          <div className="grid-3">
            {testimonials.map(t => (
              <div key={t.name} className="testimonial-card">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="avatar" style={{ background: t.color }}>{t.name.split(" ").map(n => n[0]).join("")}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#64748B" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="section" style={{ background: "linear-gradient(135deg, #0A1628, #1A56DB)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 40, fontWeight: 700, color: "white", marginBottom: 16 }}>Ready to Get Started?</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginBottom: 36 }}>Join 2 million+ customers. Open your account in minutes.</p>
          <button className="btn btn-lg" style={{ background: "white", color: "#1A56DB" }} onClick={() => setPage("register")}>Open Free Account Today</button>
        </div>
      </div>
    </div>
  );
}
