interface NavbarProps {
  loggedIn: boolean;
  setPage: (page: string) => void;
  setLoggedIn: (value: boolean) => void;
}

export default function Navbar({ loggedIn, setPage, setLoggedIn }: NavbarProps) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-logo" onClick={() => setPage(loggedIn ? "dashboard" : "home")}>
          <div className="nav-logo-mark">N</div>
          <span>NovaTrust</span>
        </div>
        {!loggedIn ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="nav-links">
              {([["Personal", "home"], ["Business", "home"], ["Loans", "home"], ["Invest", "home"]] as [string, string][]).map(([l, p]) => (
                <button key={l} className="nav-link" onClick={() => setPage(p)}>{l}</button>
              ))}
            </div>
            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)", margin: "0 6px" }} />
            <button className="nav-link" onClick={() => setPage("login")}>Sign In</button>
            <button className="nav-cta" onClick={() => setPage("register")}>Open Account</button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Welcome back,</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>Adaeze Okonkwo</div>
            </div>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#1A56DB", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>AO</div>
            <button className="nav-link" style={{ fontSize: 13 }} onClick={() => { setLoggedIn(false); setPage("home"); }}>Sign Out</button>
          </div>
        )}
      </div>
    </nav>
  );
}
