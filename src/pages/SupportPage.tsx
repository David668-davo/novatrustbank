import { useState } from "react";
import { faqs } from "../data/mockData";

interface Message {
  role: "agent" | "user";
  text: string;
}

export default function SupportPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "agent", text: "Hello! I'm Nova, your NovaTrust virtual assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const sendMsg = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(m => [...m, { role: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => {
      setMessages(m => [...m, { role: "agent", text: "Thank you for your message. A support agent will assist you shortly. Your reference number is #SR-" + Math.random().toString(36).slice(2,8).toUpperCase() + "." }]);
    }, 1000);
  };

  return (
    <div className="fade-in">
      <div className="page-header"><h1 className="page-title">Customer Support</h1><p className="page-subtitle">We're here to help, 24/7</p></div>
      <div className="tabs">
        {["chat", "faq", "contact", "tickets"].map(t => (
          <button key={t} className={`tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
            {t === "chat" ? "💬 Live Chat" : t === "faq" ? "❓ FAQ" : t === "contact" ? "📞 Contact" : "🎫 My Tickets"}
          </button>
        ))}
      </div>

      {activeTab === "chat" && (
        <div className="card" style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#1A56DB,#0891B2)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700 }}>N</div>
            <div>
              <div style={{ fontWeight: 700 }}>Nova Support</div>
              <div style={{ fontSize: 12, color: "#059669" }}>● Online · Avg. reply: &lt;2 min</div>
            </div>
          </div>
          <div style={{ height: 380, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 4 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div className={`chat-bubble ${m.role}`}>{m.text}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "12px 16px", borderTop: "1px solid #E2E8F0", display: "flex", gap: 10 }}>
            <input className="form-input" placeholder="Type your message…" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()} />
            <button className="btn btn-primary" onClick={sendMsg}>Send</button>
          </div>
        </div>
      )}

      {activeTab === "faq" && (
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          {faqs.map((f, i) => (
            <div key={i} className="card" style={{ marginBottom: 12, cursor: "pointer" }} onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
              <div style={{ padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 600 }}>{f.q}</span>
                <span style={{ color: "#1A56DB", fontSize: 18 }}>{faqOpen === i ? "▲" : "▼"}</span>
              </div>
              {faqOpen === i && <div style={{ padding: "0 20px 18px", color: "#64748B", fontSize: 14, lineHeight: 1.7 }}>{f.a}</div>}
            </div>
          ))}
        </div>
      )}

      {activeTab === "contact" && (
        <div className="grid-2">
          <div className="card">
            <div className="card-header"><div className="card-title">Send Us a Message</div></div>
            <div className="card-body">
              <div className="form-group"><label className="form-label">Subject</label><select className="form-select"><option>Account Issue</option><option>Transaction Dispute</option><option>Card Problem</option><option>Loan Enquiry</option><option>Other</option></select></div>
              <div className="form-group"><label className="form-label">Priority</label><select className="form-select"><option>Normal</option><option>High</option><option>Urgent</option></select></div>
              <div className="form-group"><label className="form-label">Message</label><textarea className="form-input" rows={5} placeholder="Describe your issue in detail…" style={{ resize: "vertical" }} /></div>
              <button className="btn btn-primary btn-block">Submit Ticket</button>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><div className="card-title">Other Ways to Reach Us</div></div>
            <div className="card-body">
              {([
                ["📞", "Phone Support", "0800-NOVA-100", "Available 24/7"],
                ["📧", "Email", "support@novatrust.bank", "Response within 2 hours"],
                ["🏢", "Branches", "50+ locations nationwide", "Mon–Fri, 8am–5pm"],
                ["📱", "WhatsApp", "+234 900 123 4567", "Chat with an agent"],
              ] as [string, string, string, string][]).map(([ic, title, val, note]) => (
                <div key={title} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: "1px solid #F1F5F9" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{ic}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div>
                    <div style={{ fontSize: 14, color: "#1A56DB" }}>{val}</div>
                    <div style={{ fontSize: 12, color: "#64748B" }}>{note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "tickets" && (
        <div className="card">
          <div className="card-header"><div className="card-title">My Support Tickets</div></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Ticket ID</th><th>Subject</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {([
                  ["#SR-A4F2X9", "Card not working at POS", "Jun 1, 2026", "Resolved"],
                  ["#SR-B8K1M3", "Incorrect charge on statement", "May 28, 2026", "In Progress"],
                  ["#SR-C2P5N7", "Transfer delay enquiry", "May 20, 2026", "Resolved"],
                  ["#SR-D6Q3L1", "Account upgrade request", "May 10, 2026", "Closed"],
                ] as [string, string, string, string][]).map(([id, sub, date, status]) => (
                  <tr key={id}>
                    <td style={{ fontFamily: "monospace", fontSize: 13 }}>{id}</td>
                    <td style={{ fontWeight: 500 }}>{sub}</td>
                    <td style={{ color: "#64748B" }}>{date}</td>
                    <td><span className={`badge ${status === "Resolved" || status === "Closed" ? "badge-success" : "badge-warning"}`}>{status}</span></td>
                    <td><button className="btn btn-secondary btn-sm">View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
