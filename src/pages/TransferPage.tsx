import { useState } from "react";
import { contacts, type Contact } from "../data/mockData";

export default function TransferPage() {
  const [step, setStep] = useState("form");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  if (step === "confirm") return (
    <div className="fade-in">
      <div className="page-header"><h1 className="page-title">Confirm Transfer</h1><p className="page-subtitle">Review before sending</p></div>
      <div style={{ maxWidth: 500, margin: "0 auto" }}>
        <div className="card">
          <div className="card-body">
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: selectedContact?.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, margin: "0 auto 12px" }}>{selectedContact?.avatar}</div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>{selectedContact?.name}</div>
              <div style={{ color: "#64748B", fontSize: 14 }}>{selectedContact?.bank} · {selectedContact?.account}</div>
            </div>
            <div style={{ background: "#F8FAFC", borderRadius: 12, padding: 20, marginBottom: 20 }}>
              {[["Amount", `$${parseFloat(amount || "0").toFixed(2)}`], ["Transfer Fee", "$0.00"], ["Total Deducted", `$${parseFloat(amount || "0").toFixed(2)}`], ["From", "Main Checking ••••4521"], ["Note", note || "—"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #E2E8F0" }}>
                  <span style={{ fontSize: 14, color: "#64748B" }}>{k}</span>
                  <span style={{ fontSize: 14, fontWeight: k === "Total Deducted" ? 700 : 500, color: k === "Total Deducted" ? "#0F172A" : "#334155" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button className="btn btn-secondary btn-block" onClick={() => setStep("form")}>Cancel</button>
              <button className="btn btn-primary btn-block" onClick={() => setStep("receipt")}>Confirm Transfer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (step === "receipt") return (
    <div className="fade-in">
      <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 20px" }}>✅</div>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Transfer Successful!</h1>
        <p style={{ color: "#64748B", marginBottom: 32 }}>Your money is on its way</p>
        <div className="card">
          <div className="card-body">
            <div style={{ textAlign: "center", padding: "16px 0 24px" }}>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 36, fontWeight: 800, color: "#059669" }}>${parseFloat(amount || "100").toFixed(2)}</div>
              <div style={{ color: "#64748B", fontSize: 14, marginTop: 4 }}>sent to {selectedContact?.name || "James Okafor"}</div>
            </div>
            <div style={{ background: "#F8FAFC", borderRadius: 12, padding: 16, marginBottom: 20 }}>
              {[["Transaction ID", "#TXN-" + Math.random().toString(36).slice(2,10).toUpperCase()], ["Date & Time", "Jun 8, 2026, 09:42 AM"], ["Status", "Completed"], ["Processing Time", "Instant"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #E2E8F0" }}>
                  <span style={{ fontSize: 13, color: "#64748B" }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: k === "Status" ? "#059669" : "#0F172A" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-secondary btn-block">Download Receipt</button>
              <button className="btn btn-primary btn-block" onClick={() => setStep("form")}>New Transfer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fade-in">
      <div className="page-header"><h1 className="page-title">Transfer Money</h1><p className="page-subtitle">Send to contacts or any bank account</p></div>
      <div className="grid-2">
        <div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header"><div className="card-title">Recent Contacts</div></div>
            <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 12 }}>
              {contacts.map(c => (
                <div key={c.id} className={`contact-chip ${selectedContact?.id === c.id ? "selected" : ""}`} onClick={() => setSelectedContact(c)}>
                  <div className="avatar" style={{ background: c.color, width: 36, height: 36, fontSize: 13 }}>{c.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: "#64748B" }}>{c.bank} · {c.account}</div>
                  </div>
                  {selectedContact?.id === c.id && <span style={{ marginLeft: "auto", color: "#1A56DB", fontSize: 18 }}>✓</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-header"><div className="card-title">New Recipient</div></div>
            <div className="card-body">
              <div className="form-group"><label className="form-label">Account Number</label><input className="form-input" placeholder="Enter account number" /></div>
              <div className="form-group"><label className="form-label">Bank Name</label><select className="form-select"><option>NovaTrust Bank</option><option>Access Bank</option><option>GTBank</option><option>First Bank</option></select></div>
              <button className="btn btn-secondary btn-block btn-sm">Verify Account</button>
            </div>
          </div>
        </div>
        <div>
          <div className="card">
            <div className="card-header"><div className="card-title">Transfer Details</div></div>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">From Account</label>
                <select className="form-select">
                  <option>Main Checking ••••4521 — $8,430.50</option>
                  <option>Savings ••••7892 — $3,200.00</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Amount</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, fontWeight: 600, color: "#64748B" }}>$</span>
                  <input className="form-input" style={{ paddingLeft: 28 }} type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
                {[50, 100, 500, 1000].map(v => (
                  <button key={v} className="btn btn-secondary btn-sm" onClick={() => setAmount(String(v))}>${v}</button>
                ))}
              </div>
              <div className="form-group">
                <label className="form-label">Narration / Note</label>
                <input className="form-input" placeholder="What's this for?" value={note} onChange={e => setNote(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Schedule Transfer</label>
                <select className="form-select">
                  <option>Send Now (Instant)</option>
                  <option>Schedule for Later</option>
                  <option>Set as Recurring</option>
                </select>
              </div>
              <div style={{ background: "#F8FAFC", borderRadius: 10, padding: 14, marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#64748B", marginBottom: 6 }}>
                  <span>Transfer Fee</span><span style={{ color: "#059669", fontWeight: 600 }}>FREE</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 700 }}>
                  <span>Total</span><span>${parseFloat(amount || "0").toFixed(2)}</span>
                </div>
              </div>
              <button className="btn btn-primary btn-block btn-lg" onClick={() => { if (!selectedContact) setSelectedContact(contacts[0]); setStep("confirm"); }}>
                Continue to Confirm →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
