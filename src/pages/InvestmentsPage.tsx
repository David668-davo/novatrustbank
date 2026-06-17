import DonutChart from "../components/charts/DonutChart";
import { investments } from "../data/mockData";

export default function InvestmentsPage() {
  const colors = ["#1A56DB", "#0891B2", "#059669", "#D97706"];

  return (
    <div className="fade-in">
      <div className="page-header"><h1 className="page-title">Investments & Savings</h1><p className="page-subtitle">Grow your wealth with NovaTrust</p></div>
      <div className="stat-grid">
        {([
          ["Portfolio Value", "$27,701.25", "+$1,120.50", true, "📈", "blue"],
          ["Total Return", "+$3,201.25", "+13.1% all time", true, "💹", "green"],
          ["Monthly Gain", "+$340.20", "vs $280.50 last month", true, "📊", "gold"],
          ["Savings APY", "5.2%", "High-yield account", true, "🏦", "purple"],
        ] as [string, string, string, boolean, string, string][]).map(([l, v, c, up, ic, cls]) => (
          <div key={l} className={`stat-card ${cls}`}>
            <div className="stat-icon">{ic}</div>
            <div className="stat-label">{l}</div>
            <div className="stat-value">{v}</div>
            <div className={`stat-change ${up ? "up" : "down"}`}>{up ? "↑" : "↓"} {c}</div>
          </div>
        ))}
      </div>
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-header"><div className="card-title">Portfolio Allocation</div></div>
          <div className="card-body">
            <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 20 }}>
              <DonutChart segments={investments.map(i => ({ pct: i.allocation }))} />
              <div style={{ flex: 1 }}>
                {investments.map((inv, i) => (
                  <div key={inv.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: colors[i], flexShrink: 0 }} />
                    <span style={{ fontSize: 13, flex: 1, color: "#334155" }}>{inv.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 700 }}>{inv.allocation}%</span>
                  </div>
                ))}
              </div>
            </div>
            {investments.map((inv, i) => (
              <div key={inv.name} className="invest-item" style={{ gap: 14 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: colors[i], flexShrink: 0, marginTop: 4 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{inv.name}</div>
                  <div style={{ fontSize: 12, color: "#64748B" }}>Allocation: {inv.allocation}%</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>${inv.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: inv.change > 0 ? "#059669" : "#DC2626" }}>{inv.change > 0 ? "+" : ""}{inv.change}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header"><div className="card-title">Savings Accounts</div></div>
            <div className="card-body" style={{ paddingTop: 8 }}>
              {[
                { name: "High-Yield Savings", rate: "5.2%", bal: "$3,200.00", color: "#059669" },
                { name: "Fixed Deposit (90-day)", rate: "6.8%", bal: "$5,000.00", color: "#D97706" },
                { name: "Kids Savings", rate: "3.0%", bal: "$450.00", color: "#7C3AED" },
              ].map(a => (
                <div key={a.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #F1F5F9" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{a.name}</div>
                    <div style={{ fontSize: 13, color: a.color, fontWeight: 600 }}>{a.rate} APY</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700 }}>{a.bal}</div>
                    <button className="btn btn-secondary btn-sm" style={{ marginTop: 4 }}>Manage</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-header"><div className="card-title">Investment Options</div></div>
            <div className="card-body" style={{ paddingTop: 8 }}>
              {([
                ["S&P 500 ETF", "Low risk", "+12.4%/yr", "📊"],
                ["Government Bonds", "Very low risk", "+7.2%/yr", "🏛️"],
                ["Emerging Markets", "Med risk", "+18.7%/yr", "🌍"],
                ["Real Estate Fund", "Med risk", "+9.1%/yr", "🏗️"],
              ] as [string, string, string, string][]).map(([n, r, ret, ic]) => (
                <div key={n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid #F1F5F9" }}>
                  <span style={{ fontSize: 22 }}>{ic}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{n}</div>
                    <div style={{ fontSize: 12, color: "#64748B" }}>{r}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700, color: "#059669", fontSize: 14 }}>{ret}</div>
                    <button className="btn btn-primary btn-sm" style={{ marginTop: 4 }}>Invest</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
