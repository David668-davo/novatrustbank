import { useState } from "react";
import { notifications as initialNotifications } from "../data/mockData";

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(initialNotifications);
  const markAll = () => setNotifs(n => n.map(x => ({ ...x, read: true })));

  return (
    <div className="fade-in">
      <div className="page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><h1 className="page-title">Notifications</h1><p className="page-subtitle">{notifs.filter(n => !n.read).length} unread</p></div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-secondary btn-sm" onClick={markAll}>Mark all read</button>
            <button className="btn btn-secondary btn-sm">Settings</button>
          </div>
        </div>
      </div>
      <div className="card">
        {notifs.map(n => (
          <div key={n.id} className={`notif-item ${!n.read ? "unread" : ""}`} onClick={() => setNotifs(ns => ns.map(x => x.id === n.id ? { ...x, read: true } : x))}>
            <div className="notif-icon-wrap">{n.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{n.title}</div>
              <div style={{ fontSize: 13, color: "#64748B" }}>{n.msg}</div>
              <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>{n.time}</div>
            </div>
            {!n.read && <div className="notif-dot" />}
          </div>
        ))}
      </div>
    </div>
  );
}
