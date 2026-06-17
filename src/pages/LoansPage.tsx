import { useState } from "react";
import { loanOffers } from "../data/mockData";

export default function LoansPage() {
  const [loanAmt, setLoanAmt] = useState(25000);
  const [term, setTerm] = useState(36);
  const rate = 8.9;
  const monthly = (loanAmt * (rate / 100 / 12)) / (1 - Math.pow(1 + rate / 100 / 12, -term));
  const total = monthly * term;

  return (
    <div className="fade-in">
      <div className="page-header"><h1 className="page-title">Loans & Mortgages</h1><p className="page-subtitle">Competitive rates, fast approvals</p></div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {loanOffers.map(l => (
          <div key={l.type} className="card" style={{ padding: 20, cursor: "pointer", transition: "all 0.3s" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{l.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{l.type}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#1A56DB", fontFamily: "'Sora', sans-serif", marginBottom: 4 }}>{l.rate}</div>
            <div style={{ fontSize: 12, color: "#64748B", marginBottom: 2 }}>APR from</div>
            <div style={{ fontSize: 13, color: "#64748B" }}>Up to {l.max}</div>
            <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 14 }}>{l.term}</div>
            <button className="btn btn-primary btn-sm btn-block">Apply Now</button>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header"><div className="card-title">Loan Eligibility Calculator</div></div>
          <div className="card-body">
            <div className="form-group">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label className="form-label">Loan Amount</label>
                <span style={{ fontWeight: 700, color: "#1A56DB" }}>${loanAmt.toLocaleString()}</span>
              </div>
              <input type="range" min={1000} max={50000} step={1000} value={loanAmt} onChange={e => setLoanAmt(+e.target.value)} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94A3B8" }}><span>$1,000</span><span>$50,000</span></div>
            </div>
            <div className="form-group">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label className="form-label">Repayment Term</label>
                <span style={{ fontWeight: 700, color: "#1A56DB" }}>{term} months</span>
              </div>
              <input type="range" min={6} max={60} step={6} value={term} onChange={e => setTerm(+e.target.value)} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94A3B8" }}><span>6 mo</span><span>60 mo</span></div>
            </div>
            <div className="calc-result">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, textAlign: "center" }}>
                <div><div style={{ fontSize: 11, opacity: 0.7, marginBottom: 6 }}>MONTHLY</div><div style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700 }}>${monthly.toFixed(0)}</div></div>
                <div><div style={{ fontSize: 11, opacity: 0.7, marginBottom: 6 }}>INTEREST</div><div style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700 }}>{rate}%</div></div>
                <div><div style={{ fontSize: 11, opacity: 0.7, marginBottom: 6 }}>TOTAL</div><div style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700 }}>${total.toFixed(0)}</div></div>
              </div>
            </div>
            <button className="btn btn-primary btn-block btn-lg" style={{ marginTop: 20 }}>Apply for This Loan</button>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Application Process</div></div>
          <div className="card-body" style={{ paddingTop: 8 }}>
            {([
              ["Fill Application", "Complete the online form in under 5 minutes", "Instant"],
              ["Document Verification", "Upload ID, proof of income, bank statements", "1–2 hrs"],
              ["Credit Assessment", "Automated credit check and risk scoring", "Real-time"],
              ["Approval Decision", "Receive approval notification via email & SMS", "Same day"],
              ["Disbursement", "Funds deposited directly to your account", "24 hours"],
            ] as [string, string, string][]).map(([title, desc, time], i) => (
              <div key={title} className="loan-step">
                <div className="step-num">{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: 13, color: "#64748B" }}>{desc}</div>
                </div>
                <span className="badge badge-info" style={{ fontSize: 11 }}>{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
