import SpendingBars from "../components/charts/SpendingBars";
import DonutChart from "../components/charts/DonutChart";
import { sampleTransactions } from "../data/mockData";

export default function Dashboard() {
  const spendData = [
    { label: "Jan", val: 1820 }, { label: "Feb", val: 2340 }, { label: "Mar", val: 1950 },
    { label: "Apr", val: 2800 }, { label: "May", val: 2100 }, { label: "Jun", val: 1640, active: true },
  ];
  const categories = [
    { name: "Food & Dining", pct: 32, color: "#1A56DB", amount: 524 },
    { name: "Shopping", pct: 24, color: "#0891B2", amount: 393 },
    { name: "Utilities", pct: 18, color: "#059669", amount: 295 },
    { name: "Transport", pct: 14, color: "#D97706", amount: 229 },
    { name: "Entertainment", pct: 12, color: "#7C3AED", amount: 196 },
  ];

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Good morning, Adaeze 👋</h1>
        <p className="page-subtitle">Monday, June 8, 2026 · Here's your financial overview</p>
      </div>

      <div className="stat-grid">
        {[
          { label: "Total Balance", value: "$12,430.50", change: "+$340.20", up: true, icon: "💰", cls: "blue" },
          { label: "Monthly Income", value: "$5,000.00", change: "+18% vs last month", up: true, icon: "📥", cls: "green" },
          { label: "Monthly Spend", value: "$1,637.75", change: "-8% vs last month", up: false, icon: "📤", cls: "gold" },
          { label: "Savings Rate", value: "32.7%", change: "+4.2% this year", up: true, icon: "📊", cls: "purple" },
        ].map(s => (
          <div key={s.label} className={`stat-card ${s.cls}`}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className={`stat-change ${s.up ? "up" : "down"}`}>{s.up ? "↑" : "↓"} {s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-header">
            <div><div className="card-title">Account Summary</div><div className="card-subtitle">All your accounts</div></div>
          </div>
          <div className="card-body" style={{ paddingTop: 12 }}>
            {[
              { name: "Main Checking", num: "•••• 4521", bal: "$8,430.50", type: "Checking" },
              { name: "Savings Account", num: "•••• 7892", bal: "$3,200.00", type: "Savings 3.5%" },
              { name: "Investment Account", num: "•••• 1103", bal: "$800.00", type: "Investment" },
            ].map(a => (
              <div key={a.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #F1F5F9" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏦</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{a.name}</div>
                    <div style={{ fontSize: 12, color: "#64748B" }}>{a.num} · {a.type}</div>
                  </div>
                </div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16 }}>{a.bal}</div>
              </div>
            ))}
            <div style={{ paddingTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>Total</span>
              <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, color: "#1A56DB" }}>$12,430.50</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div><div className="card-title">Spending Analytics</div><div className="card-subtitle">June 2026</div></div>
          </div>
          <div className="card-body" style={{ paddingTop: 12 }}>
            <SpendingBars data={spendData} />
            <div className="divider" />
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <DonutChart segments={categories} />
              <div style={{ flex: 1 }}>
                {categories.map(c => (
                  <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, background: c.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, flex: 1, color: "#334155" }}>{c.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{c.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <div><div className="card-title">Recent Transactions</div><div className="card-subtitle">Last 10 transactions</div></div>
          <button className="btn btn-secondary btn-sm">View All</button>
        </div>
        <div className="card-body" style={{ paddingTop: 8 }}>
          {sampleTransactions.slice(0, 6).map(t => (
            <div key={t.id} className="txn-item">
              <div className="txn-icon">{t.icon}</div>
              <div>
                <div className="txn-name">{t.name}</div>
                <div className="txn-date">{t.date} · {t.category}</div>
              </div>
              <div className={`txn-amount ${t.amount > 0 ? "credit" : "debit"}`}>
                {t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header"><div className="card-title">Savings Goals</div></div>
          <div className="card-body" style={{ paddingTop: 16 }}>
            {[
              { name: "Emergency Fund", target: 5000, current: 3200, icon: "🛡️" },
              { name: "Vacation – Dubai", target: 2500, current: 875, icon: "✈️" },
              { name: "New MacBook", target: 1800, current: 1200, icon: "💻" },
            ].map(g => (
              <div key={g.name} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 18 }}>{g.icon}</span>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{g.name}</span>
                  </div>
                  <span style={{ fontSize: 13, color: "#64748B" }}>${g.current.toLocaleString()} / ${g.target.toLocaleString()}</span>
                </div>
                <div className="progress">
                  <div className="progress-bar" style={{ width: `${(g.current / g.target * 100).toFixed(0)}%` }} />
                </div>
                <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>{(g.current / g.target * 100).toFixed(0)}% complete</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Financial Insights</div></div>
          <div className="card-body" style={{ paddingTop: 16 }}>
            {[
              { icon: "💡", title: "Good news!", msg: "Your spending is 8% lower than last month. Keep it up!", color: "#ECFDF5", border: "#A7F3D0", tc: "#065F46" },
              { icon: "📈", title: "Investment tip", msg: "Your NovaTrust Growth ETF is up 4.2% this month.", color: "#EFF6FF", border: "#BFDBFE", tc: "#1E40AF" },
              { icon: "⚠️", title: "Attention needed", msg: "Electricity bill of $124.50 is due in 7 days.", color: "#FFFBEB", border: "#FDE68A", tc: "#92400E" },
              { icon: "🎯", title: "Goal milestone", msg: "You're 64% toward your Emergency Fund goal!", color: "#F5F3FF", border: "#DDD6FE", tc: "#5B21B6" },
            ].map(ins => (
              <div key={ins.title} style={{ padding: 12, borderRadius: 10, background: ins.color, border: `1px solid ${ins.border}`, marginBottom: 10 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 16 }}>{ins.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: ins.tc, marginBottom: 2 }}>{ins.title}</div>
                    <div style={{ fontSize: 13, color: ins.tc, opacity: 0.85 }}>{ins.msg}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
