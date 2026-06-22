import { useState, useEffect } from "react";

interface NavItem {
  key: string;
  icon: string;
  label: string;
  badge?: number;
}

interface NavbarProps {
  loggedIn: boolean;
  page: string;
  setPage: (page: string) => void;
  setLoggedIn: (value: boolean) => void;
  notifCount: number;
}

export default function Navbar({ loggedIn, page, setPage, setLoggedIn, notifCount }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Close drawer whenever page changes
  useEffect(() => { setMenuOpen(false); }, [page]);

  const go = (p: string) => { setPage(p); setMenuOpen(false); };

  const publicLinks: [string, string][] = [
    ["Personal", "home"],
    ["Business", "home"],
    ["Loans", "home"],
    ["Invest", "home"],
  ];

  const navItems: NavItem[] = [
    { key: "dashboard", icon: "🏠", label: "Dashboard" },
    { key: "transfer", icon: "↗️", label: "Transfer" },
    { key: "bills", icon: "📋", label: "Bills" },
    { key: "cards", icon: "💳", label: "Cards" },
    { key: "loans", icon: "🏦", label: "Loans" },
    { key: "investments", icon: "📈", label: "Investments" },
    { key: "support", icon: "💬", label: "Support" },
    { key: "notifications", icon: "🔔", label: "Notifications", badge: notifCount },
    { key: "admin", icon: "🛡️", label: "Admin Panel" },
  ];

  const drawerSections = [
    { label: "Main", items: navItems.slice(0, 6) },
    { label: "Help", items: navItems.slice(6, 8) },
    { label: "System", items: navItems.slice(8) },
  ];

  const hamburgerBtn = (
    <button
      onClick={() => setMenuOpen(o => !o)}
      aria-label="Menu"
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 10,
        width: 42, height: 42,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 5, cursor: "pointer", padding: 0, flexShrink: 0,
      }}
    >
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          display: "block", width: 20, height: 2,
          background: "white", borderRadius: 2,
          transition: "transform 0.25s, opacity 0.25s",
          ...(menuOpen && i === 0 ? { transform: "translateY(7px) rotate(45deg)" } : {}),
          ...(menuOpen && i === 1 ? { opacity: 0 } : {}),
          ...(menuOpen && i === 2 ? { transform: "translateY(-7px) rotate(-45deg)" } : {}),
        }} />
      ))}
    </button>
  );

  return (
    <>
      {/* ── NAV BAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(10,22,40,0.97)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        height: 68,
        display: "flex", alignItems: "center",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 20px",
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>

          {/* Logo */}
          <div onClick={() => go(loggedIn ? "dashboard" : "home")}
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }}>
            <div style={{
              width: 36, height: 36,
              background: "linear-gradient(135deg,#1A56DB,#0891B2)",
              borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, fontWeight: 800, color: "white",
            }}>N</div>
            <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 700, color: "white" }}>NovaTrust</span>
          </div>

          {/* ── LOGGED-OUT ── */}
          {!loggedIn && (
            <>
              {!isMobile && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {publicLinks.map(([l, p]) => (
                    <button key={l} className="nav-link" onClick={() => go(p)}>{l}</button>
                  ))}
                  <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)", margin: "0 4px" }} />
                  <button className="nav-link" onClick={() => go("login")}>Sign In</button>
                  <button className="nav-cta" onClick={() => go("register")}>Open Account</button>
                </div>
              )}
              {isMobile && hamburgerBtn}
            </>
          )}

          {/* ── LOGGED-IN ── */}
          {loggedIn && (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {!isMobile && (
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Welcome back,</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>Adaeze Okonkwo</div>
                </div>
              )}
              <div style={{
                width: 36, height: 36, borderRadius: "50%", background: "#1A56DB",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: 700, fontSize: 13, cursor: "pointer", flexShrink: 0,
              }}>AO</div>
              {!isMobile && (
                <button className="nav-link" style={{ fontSize: 13, whiteSpace: "nowrap" }}
                  onClick={() => { setLoggedIn(false); go("home"); }}>
                  Sign Out
                </button>
              )}
              {isMobile && hamburgerBtn}
            </div>
          )}

        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      {isMobile && menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed", top: 68, left: 0, right: 0, bottom: 0,
            zIndex: 99, background: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#0A1628",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              maxHeight: "calc(100vh - 68px)",
              overflowY: "auto",
              display: "flex", flexDirection: "column",
            }}
          >
            {/* ── Logged-out drawer ── */}
            {!loggedIn && (
              <div style={{ padding: "12px 16px 28px", display: "flex", flexDirection: "column", gap: 4 }}>
                {publicLinks.map(([l, p]) => (
                  <button key={l} onClick={() => go(p)} style={drawerLinkStyle}>{l}</button>
                ))}
                <div style={dividerStyle} />
                <button onClick={() => go("login")} style={drawerLinkStyle}>Sign In</button>
                <button onClick={() => go("register")} style={drawerCtaStyle}>Open Free Account</button>
              </div>
            )}

            {/* ── Logged-in drawer — full sidebar ── */}
            {loggedIn && (
              <div style={{ padding: "12px 16px 0", display: "flex", flexDirection: "column" }}>
                {drawerSections.map(sec => (
                  <div key={sec.label} style={{ marginBottom: 8 }}>
                    <div style={{
                      fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                      letterSpacing: "1.2px", color: "rgba(255,255,255,0.3)",
                      padding: "8px 8px 4px",
                    }}>{sec.label}</div>
                    {sec.items.map(item => (
                      <button
                        key={item.key}
                        onClick={() => go(item.key)}
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          width: "100%", padding: "13px 12px",
                          background: page === item.key ? "rgba(26,86,219,0.35)" : "none",
                          border: "none", borderRadius: 10,
                          fontSize: 15, fontWeight: 500,
                          color: page === item.key ? "white" : "rgba(255,255,255,0.7)",
                          fontFamily: "inherit", cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <span style={{ fontSize: 18, width: 24, textAlign: "center" }}>{item.icon}</span>
                        <span style={{ flex: 1 }}>{item.label}</span>
                        {item.badge ? (
                          <span style={{
                            background: "#DC2626", color: "white",
                            fontSize: 11, fontWeight: 700, padding: "1px 7px",
                            borderRadius: 10, minWidth: 20, textAlign: "center",
                          }}>{item.badge}</span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                ))}

                {/* Balance card */}
                <div style={{
                  margin: "12px 4px 16px",
                  background: "rgba(26,86,219,0.2)", borderRadius: 12, padding: 14,
                }}>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>Checking Balance</div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 700, color: "white" }}>$8,430.50</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>••••4521</div>
                </div>

                {/* Sign out */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "12px 4px 24px" }}>
                  <button
                    onClick={() => { setLoggedIn(false); go("home"); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      width: "100%", padding: "13px 12px",
                      background: "rgba(220,38,38,0.12)",
                      border: "1px solid rgba(220,38,38,0.25)",
                      borderRadius: 10, fontSize: 15, fontWeight: 600,
                      color: "#FCA5A5", fontFamily: "inherit", cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: 18 }}>🚪</span>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ── Shared inline styles ──
const drawerLinkStyle: React.CSSProperties = {
  display: "block", width: "100%", textAlign: "left",
  padding: "14px 12px", background: "none", border: "none",
  borderRadius: 10, fontSize: 16, fontWeight: 500,
  color: "rgba(255,255,255,0.85)", fontFamily: "inherit", cursor: "pointer",
};

const drawerCtaStyle: React.CSSProperties = {
  display: "block", width: "100%", textAlign: "center",
  padding: "14px 12px", marginTop: 8,
  background: "#1A56DB", border: "none",
  borderRadius: 10, fontSize: 16, fontWeight: 600,
  color: "white", fontFamily: "inherit", cursor: "pointer",
};

const dividerStyle: React.CSSProperties = {
  height: 1, background: "rgba(255,255,255,0.08)", margin: "8px 0",
};
