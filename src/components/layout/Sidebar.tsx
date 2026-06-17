interface NavItem {
  key: string;
  icon: string;
  label: string;
  badge?: number;
}

interface SidebarProps {
  page: string;
  setPage: (page: string) => void;
  notifCount: number;
}

export default function Sidebar({ page, setPage, notifCount }: SidebarProps) {
  const navItems: NavItem[] = [
    { key: "dashboard", icon: "🏠", label: "Dashboard" },
    { key: "transfer", icon: "↗️", label: "Transfer" },
    { key: "bills", icon: "📋", label: "Bills" },
    { key: "cards", icon: "💳", label: "Cards" },
    { key: "loans", icon: "🏦", label: "Loans" },
    { key: "investments", icon: "📈", label: "Investments" },
    { key: "support", icon: "💬", label: "Support" },
    { key: "notifications", icon: "🔔", label: "Notifications", badge: notifCount },
    { key: "admin", icon: "🛡️", label: "Admin" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-label">Main</div>
        {navItems.slice(0, 6).map(item => (
          <button key={item.key} className={`sidebar-item ${page === item.key ? "active" : ""}`} onClick={() => setPage(item.key)}>
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
            {item.badge ? <span className="sidebar-badge">{item.badge}</span> : null}
          </button>
        ))}
      </div>
      <div className="sidebar-section">
        <div className="sidebar-label">Help</div>
        {navItems.slice(6, 8).map(item => (
          <button key={item.key} className={`sidebar-item ${page === item.key ? "active" : ""}`} onClick={() => setPage(item.key)}>
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
            {item.badge ? <span className="sidebar-badge">{item.badge}</span> : null}
          </button>
        ))}
      </div>
      <div className="sidebar-section">
        <div className="sidebar-label">System</div>
        <button className={`sidebar-item ${page === "admin" ? "active" : ""}`} onClick={() => setPage("admin")}>
          <span className="sidebar-icon">🛡️</span> Admin Panel
        </button>
      </div>
      <div style={{ margin: "16px", background: "rgba(26,86,219,0.2)", borderRadius: 12, padding: 14 }}>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>Checking Balance</div>
        <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: "white" }}>$8,430.50</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>••••4521</div>
      </div>
    </aside>
  );
}
