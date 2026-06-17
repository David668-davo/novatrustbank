import { useState } from "react";
import { bills } from "../data/mockData";

export default function BillsPage() {
  const [toggles, setToggles] = useState<Record<number, boolean>>({ 1: true, 2: true, 3: false, 4: true, 5: false });

  return (
    <div className="fade-in">
      <div className="page-header"><h1 className="page-title">Bill Payments</h1><p className="page-subtitle">Manage and schedule your bills</p></div>
      <div className="stat-grid">
        {[["Upcoming Bills", "5 bills", "💸", "blue"], ["Due This Month", "$1,480.48", "📅", "gold"], ["Auto-Pay Active", "3 bills", "🔄", "green"], ["Paid This Month", "$624.74", "✅", "purple"]].map(([l, v, ic, c]) => (
          <div key={l} className={`stat-card ${c}`}>
            <div className="stat-icon">{ic}</div>
            <div className="stat-label">{l}</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{v}</div>
          </div>
        ))}
      </div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><div className="card-title">Upcoming Bills</div><button className="btn btn-primary btn-sm">+ Add Bill</button></div>
          <div className="card-body" style={{ paddingTop: 8 }}>
            {bills.map(b => (
              <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0", borderBottom: "1px solid #F1F5F9" }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                  {b.name.includes("Electric") ? "⚡" : b.name.includes("Internet") ? "🌐" : b.name.includes("Rent") ? "🏠" : b.name.includes("Netflix") ? "🎬" : "🏋️"}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{b.name}</div>
                  <div style={{ fontSize: 12, color: "#64748B" }}>Due: {b.due}</div>
                </div>
                <div style={{ textAlign: "right", marginRight: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>${b.amount.toFixed(2)}</div>
                  <div style={{ fontSize: 11, color: "#64748B" }}>Auto: {b.auto ? "On" : "Off"}</div>
                </div>
                <button className="btn btn-primary btn-sm">Pay</button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header"><div className="card-title">Auto-Pay Settings</div></div>
            <div className="card-body">
              {bills.map(b => (
                <div key={b.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #F1F5F9" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{b.name}</div>
                    <div style={{ fontSize: 12, color: "#64748B" }}>${b.amount} · {b.due}</div>
                  </div>
                  <div className={`toggle ${toggles[b.id] ? "on" : ""}`} onClick={() => setToggles(t => ({ ...t, [b.id]: !t[b.id] }))} />
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-header"><div className="card-title">Quick Pay</div></div>
            <div className="card-body">
              <div className="form-group"><label className="form-label">Bill Category</label><select className="form-select"><option>Electricity</option><option>Internet</option><option>Cable TV</option><option>Insurance</option></select></div>
              <div className="form-group"><label className="form-label">Provider</label><select className="form-select"><option>Lagos DISCO</option><option>Spectranet</option><option>DSTV</option></select></div>
              <div className="form-group"><label className="form-label">Amount</label><input className="form-input" type="number" placeholder="$0.00" /></div>
              <button className="btn btn-primary btn-block">Pay Bill Instantly</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
