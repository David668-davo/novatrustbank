import { useState } from "react";
import SpendingBars from "../components/charts/SpendingBars";
import { adminUsers, sampleTransactions } from "../data/mockData";

export default function AdminPage() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="fade-in">
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span className="badge badge-danger">🛡️ Admin Panel</span>
        </div>
        <h1 className="page-title">System Administration</h1>
        <p className="page-subtitle">Manage users, transactions, and platform analytics</p>
      </div>
      <div className="tabs">
        {([["overview","📊 Overview"],["users","👥 Users"],["transactions","💳 Transactions"],["analytics","📈 Analytics"]] as [string, string][]).map(([k,l]) => (
          <button key={k} className={`tab ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === "overview" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
            {([
              ["Total Users", "24,381", "+142 today", "👥"],
              ["Active Sessions", "1,847", "Live now", "🟢"],
              ["Transactions Today", "8,924", "$2.4M volume", "💳"],
              ["Support Tickets", "34", "8 urgent", "🎫"],
            ] as [string, string, string, string][]).map(([l,v,s,ic]) => (
              <div key={l} className="admin-stat">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#64748B" }}>{l}</span>
                  <span style={{ fontSize: 20 }}>{ic}</span>
                </div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{v}</div>
                <div style={{ fontSize: 13, color: "#64748B" }}>{s}</div>
              </div>
            ))}
          </div>
          <div className="grid-2">
            <div className="card">
              <div className="card-header"><div className="card-title">Platform Health</div></div>
              <div className="card-body">
                {([
                  ["API Response Time", "124ms", 92],
                  ["Server Uptime", "99.98%", 99],
                  ["Transaction Success Rate", "99.7%", 99],
                  ["Security Score", "A+", 98],
                  ["Database Load", "34%", 34],
                ] as [string, string, number][]).map(([k, v, p]) => (
                  <div key={k} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{k}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: p > 80 ? "#059669" : p > 50 ? "#D97706" : "#DC2626" }}>{v}</span>
                    </div>
                    <div className="progress"><div className="progress-bar" style={{ width: `${p}%`, background: p > 80 ? "#059669" : p > 50 ? "#D97706" : "#DC2626" }} /></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="card-header"><div className="card-title">Recent Activity Log</div></div>
              <div className="card-body" style={{ paddingTop: 8 }}>
                {([
                  ["New user registration", "USR-24381", "2 min ago", "info"],
                  ["Large transfer flagged", "$45,000 to Chase", "5 min ago", "warning"],
                  ["Support ticket resolved", "#SR-A4F2X9", "12 min ago", "success"],
                  ["Failed login attempt", "3x from 41.x.x.x", "18 min ago", "danger"],
                  ["System backup", "DB snapshot created", "1 hr ago", "info"],
                ] as [string, string, string, string][]).map(([action, detail, time, type]) => (
                  <div key={action} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid #F1F5F9", alignItems: "center" }}>
                    <span className={`badge badge-${type}`} style={{ whiteSpace: "nowrap" }}>{type}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{action}</div>
                      <div style={{ fontSize: 12, color: "#64748B" }}>{detail}</div>
                    </div>
                    <div style={{ fontSize: 12, color: "#94A3B8", whiteSpace: "nowrap" }}>{time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {tab === "users" && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">User Management</div>
            <div style={{ display: "flex", gap: 10 }}>
              <input className="form-input" placeholder="Search users…" style={{ width: 220 }} />
              <button className="btn btn-primary btn-sm">+ Add User</button>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>User ID</th><th>Name</th><th>Email</th><th>Balance</th><th>Joined</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {adminUsers.map(u => (
                  <tr key={u.id}>
                    <td style={{ fontFamily: "monospace", fontSize: 12 }}>{u.id}</td>
                    <td style={{ fontWeight: 600 }}>{u.name}</td>
                    <td style={{ color: "#64748B" }}>{u.email}</td>
                    <td style={{ fontWeight: 600 }}>{u.balance}</td>
                    <td style={{ color: "#64748B" }}>{u.joined}</td>
                    <td><span className={`badge ${u.status === "active" ? "badge-success" : u.status === "suspended" ? "badge-danger" : "badge-warning"}`}>{u.status}</span></td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="btn btn-secondary btn-sm">View</button>
                        <button className="btn btn-danger btn-sm">{u.status === "active" ? "Suspend" : "Activate"}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "transactions" && (
        <div className="card">
          <div className="card-header"><div className="card-title">All Transactions</div><button className="btn btn-secondary btn-sm">Export CSV</button></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Txn ID</th><th>User</th><th>Type</th><th>Amount</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {([
                  ["#TX-001234","Adaeze Okonkwo","Transfer","$500.00","Jun 8, 2026","Completed"],
                  ["#TX-001233","Emeka Nwosu","Bill Payment","$124.50","Jun 8, 2026","Completed"],
                  ["#TX-001232","Chioma Eze","Withdrawal","$200.00","Jun 7, 2026","Completed"],
                  ["#TX-001231","Tunde Adesanya","Transfer","$45,000","Jun 7, 2026","Flagged"],
                  ["#TX-001230","Femi Adeyemi","Deposit","$5,000","Jun 6, 2026","Pending"],
                ] as [string,string,string,string,string,string][]).map(([id,user,type,amt,date,status]) => (
                  <tr key={id}>
                    <td style={{ fontFamily: "monospace", fontSize: 12 }}>{id}</td>
                    <td style={{ fontWeight: 500 }}>{user}</td>
                    <td>{type}</td>
                    <td style={{ fontWeight: 700 }}>{amt}</td>
                    <td style={{ color: "#64748B" }}>{date}</td>
                    <td><span className={`badge ${status==="Completed"?"badge-success":status==="Flagged"?"badge-danger":"badge-warning"}`}>{status}</span></td>
                    <td><button className="btn btn-secondary btn-sm">Review</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "analytics" && (
        <div className="grid-2">
          <div className="card">
            <div className="card-header"><div className="card-title">Monthly Transaction Volume</div></div>
            <div className="card-body">
              <SpendingBars data={[
                { label: "Jan", val: 4.1 }, { label: "Feb", val: 5.2 }, { label: "Mar", val: 4.8 },
                { label: "Apr", val: 6.1 }, { label: "May", val: 5.9 }, { label: "Jun", val: 2.4, active: true },
              ]} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
                {([["Total Volume", "$28.5M"], ["Avg per Day", "$8,924"], ["Peak Hour", "2–3 PM"], ["Top Category", "Transfers"]] as [string,string][]).map(([k, v]) => (
                  <div key={k} style={{ background: "#F8FAFC", borderRadius: 10, padding: 12 }}>
                    <div style={{ fontSize: 12, color: "#64748B", marginBottom: 4 }}>{k}</div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><div className="card-title">User Growth</div></div>
            <div className="card-body">
              <SpendingBars data={[
                { label: "Jan", val: 18200 }, { label: "Feb", val: 19800 }, { label: "Mar", val: 20900 },
                { label: "Apr", val: 22100 }, { label: "May", val: 23400 }, { label: "Jun", val: 24381, active: true },
              ]} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
                {([["Total Users", "24,381"], ["New This Month", "+981"], ["Active Users", "18,340"], ["Retention", "89.4%"]] as [string,string][]).map(([k, v]) => (
                  <div key={k} style={{ background: "#F8FAFC", borderRadius: 10, padding: 12 }}>
                    <div style={{ fontSize: 12, color: "#64748B", marginBottom: 4 }}>{k}</div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// suppress unused import warning — sampleTransactions kept for future use
void sampleTransactions;
