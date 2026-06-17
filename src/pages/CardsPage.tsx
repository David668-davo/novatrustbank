import { useState } from "react";
import BankCard from "../components/banking/BankCard";
import { sampleTransactions } from "../data/mockData";

export default function CardsPage() {
  const [frozen, setFrozen] = useState<Record<number, boolean>>({ 1: false, 2: false });

  return (
    <div className="fade-in">
      <div className="page-header"><h1 className="page-title">Card Management</h1><p className="page-subtitle">View and manage your debit and credit cards</p></div>
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div>
          <div style={{ marginBottom: 16 }}>
            <BankCard type="blue" last4="4521" name="ADAEZE OKONKWO" expiry="09/28" />
          </div>
          <div className="card">
            <div className="card-body">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Debit Card — Visa Platinum</div>
                <span className={`badge ${frozen[1] ? "badge-danger" : "badge-success"}`}>{frozen[1] ? "Frozen" : "Active"}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {([["Freeze Card", frozen[1] ? "🔴" : "🔒", () => setFrozen(f => ({ ...f, 1: !f[1] }))], ["Change PIN", "🔑", () => {}], ["View CVV", "👁️", () => {}], ["Report Lost", "🚨", () => {}]] as [string, string, () => void][]).map(([l, ic, fn]) => (
                  <button key={l} className="btn btn-secondary" style={{ fontSize: 13, gap: 6 }} onClick={fn}>{ic} {l}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div style={{ marginBottom: 16 }}>
            <BankCard type="dark" last4="8834" name="ADAEZE OKONKWO" expiry="04/27" />
          </div>
          <div className="card">
            <div className="card-body">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Credit Card — Visa Signature</div>
                <span className={`badge ${frozen[2] ? "badge-danger" : "badge-success"}`}>{frozen[2] ? "Frozen" : "Active"}</span>
              </div>
              <div style={{ background: "#F8FAFC", borderRadius: 10, padding: 14, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: "#64748B" }}>Credit Used</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>$3,240 / $10,000</span>
                </div>
                <div className="progress"><div className="progress-bar" style={{ width: "32.4%", background: "#7C3AED" }} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {([["Freeze Card", frozen[2] ? "🔴" : "🔒", () => setFrozen(f => ({ ...f, 2: !f[2] }))], ["Pay Balance", "💳", () => {}], ["Set Limits", "📊", () => {}], ["Rewards", "🎁", () => {}]] as [string, string, () => void][]).map(([l, ic, fn]) => (
                  <button key={l} className="btn btn-secondary" style={{ fontSize: 13, gap: 6 }} onClick={fn}>{ic} {l}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><div className="card-title">Transaction History</div><button className="btn btn-secondary btn-sm">Export</button></div>
        <div className="card-body" style={{ paddingTop: 8 }}>
          {sampleTransactions.map(t => (
            <div key={t.id} className="txn-item">
              <div className="txn-icon">{t.icon}</div>
              <div style={{ flex: 1 }}>
                <div className="txn-name">{t.name}</div>
                <div className="txn-date">{t.date} · {t.category}</div>
              </div>
              <div><span className="badge badge-success">Completed</span></div>
              <div className={`txn-amount ${t.amount > 0 ? "credit" : "debit"}`} style={{ marginLeft: 12 }}>
                {t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
