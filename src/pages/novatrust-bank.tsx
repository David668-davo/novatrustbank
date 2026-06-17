import { useState, useEffect, useRef } from "react";

const COLORS = {
  navy: "#0A1628",
  navyLight: "#0F2040",
  blue: "#1A56DB",
  blueLight: "#2563EB",
  bluePale: "#EFF6FF",
  teal: "#0891B2",
  gold: "#D97706",
  green: "#059669",
  red: "#DC2626",
  gray50: "#F8FAFC",
  gray100: "#F1F5F9",
  gray200: "#E2E8F0",
  gray300: "#CBD5E1",
  gray400: "#94A3B8",
  gray500: "#64748B",
  gray700: "#334155",
  gray900: "#0F172A",
  white: "#FFFFFF",
};

const sampleTransactions = [
  { id: 1, name: "Netflix Subscription", date: "Jun 7, 2026", amount: -15.99, category: "Entertainment", icon: "🎬", status: "completed" },
  { id: 2, name: "Salary Credit", date: "Jun 5, 2026", amount: 4250.00, category: "Income", icon: "💼", status: "completed" },
  { id: 3, name: "Whole Foods Market", date: "Jun 4, 2026", amount: -87.43, category: "Groceries", icon: "🛒", status: "completed" },
  { id: 4, name: "Shell Gas Station", date: "Jun 3, 2026", amount: -52.10, category: "Transport", icon: "⛽", status: "completed" },
  { id: 5, name: "Amazon Purchase", date: "Jun 2, 2026", amount: -134.99, category: "Shopping", icon: "📦", status: "completed" },
  { id: 6, name: "Transfer from Marcus", date: "Jun 1, 2026", amount: 500.00, category: "Transfer", icon: "↗️", status: "completed" },
  { id: 7, name: "Starbucks Coffee", date: "May 31, 2026", amount: -6.75, category: "Food", icon: "☕", status: "completed" },
  { id: 8, name: "Spotify Premium", date: "May 30, 2026", amount: -9.99, category: "Entertainment", icon: "🎵", status: "completed" },
  { id: 9, name: "Electric Bill", date: "May 28, 2026", amount: -124.50, category: "Utilities", icon: "⚡", status: "completed" },
  { id: 10, name: "Freelance Payment", date: "May 25, 2026", amount: 750.00, category: "Income", icon: "💻", status: "completed" },
];

const contacts = [
  { id: 1, name: "Sarah Mitchell", account: "****4521", bank: "NovaTrust", avatar: "SM", color: "#6366F1" },
  { id: 2, name: "James Okafor", account: "****8834", bank: "Chase Bank", avatar: "JO", color: "#0891B2" },
  { id: 3, name: "Priya Sharma", account: "****2290", bank: "NovaTrust", avatar: "PS", color: "#059669" },
  { id: 4, name: "David Chen", account: "****6677", bank: "Wells Fargo", avatar: "DC", color: "#D97706" },
];

const bills = [
  { id: 1, name: "Electricity (Lagos DISCO)", due: "Jun 15, 2026", amount: 124.50, status: "upcoming", auto: true },
  { id: 2, name: "Internet (Spectranet)", due: "Jun 18, 2026", amount: 89.99, status: "upcoming", auto: true },
  { id: 3, name: "Rent Payment", due: "Jun 30, 2026", amount: 1200.00, status: "upcoming", auto: false },
  { id: 4, name: "Netflix", due: "Jun 22, 2026", amount: 15.99, status: "upcoming", auto: true },
  { id: 5, name: "Gym Membership", due: "Jun 25, 2026", amount: 49.99, status: "upcoming", auto: false },
];

const loanOffers = [
  { type: "Personal Loan", rate: "8.9%", max: "$50,000", term: "up to 60 months", icon: "👤" },
  { type: "Home Mortgage", rate: "6.4%", max: "$500,000", term: "up to 30 years", icon: "🏠" },
  { type: "Auto Loan", rate: "5.9%", max: "$75,000", term: "up to 84 months", icon: "🚗" },
  { type: "Business Loan", rate: "9.5%", max: "$250,000", term: "up to 120 months", icon: "🏢" },
];

const investments = [
  { name: "Growth ETF Portfolio", value: 12480.50, change: 4.2, allocation: 45 },
  { name: "Bond Index Fund", value: 8320.00, change: 1.1, allocation: 30 },
  { name: "Tech Sector Fund", value: 4150.75, change: -1.8, allocation: 15 },
  { name: "Emerging Markets", value: 2750.00, change: 2.9, allocation: 10 },
];

const faqs = [
  { q: "How do I reset my PIN?", a: "Go to Card Management → Select your card → Manage PIN → Reset PIN. You'll receive an OTP on your registered phone." },
  { q: "How long does an international transfer take?", a: "International transfers typically take 1–3 business days depending on the destination country and currency." },
  { q: "What are the daily transfer limits?", a: "Standard accounts: $10,000/day. Premium accounts: $50,000/day. Business accounts: $250,000/day." },
  { q: "How do I report a lost or stolen card?", a: "Immediately freeze your card in the Card Management section, then call our 24/7 hotline at 0800-NOVA-100." },
];

const notifications = [
  { id: 1, type: "transaction", title: "Payment Received", msg: "You received $500.00 from Marcus T.", time: "2 min ago", read: false, icon: "💳" },
  { id: 2, type: "security", title: "New Login Detected", msg: "Login from Lagos, Nigeria (Chrome/Windows)", time: "1 hr ago", read: false, icon: "🔒" },
  { id: 3, type: "bill", title: "Bill Due Soon", msg: "Electricity bill of $124.50 due in 7 days", time: "3 hr ago", read: true, icon: "⚡" },
  { id: 4, type: "promo", title: "Investment Opportunity", msg: "New high-yield savings account — 5.2% APY", time: "1 day ago", read: true, icon: "📈" },
  { id: 5, type: "transaction", title: "Debit Alert", msg: "Amazon Purchase — $134.99 debited", time: "2 days ago", read: true, icon: "🛒" },
];

const adminUsers = [
  { id: "USR001", name: "Adaeze Okonkwo", email: "ada.okonkwo@email.com", status: "active", balance: "$12,430.50", joined: "Jan 2024" },
  { id: "USR002", name: "Emeka Nwosu", email: "emeka.n@email.com", status: "active", balance: "$5,840.00", joined: "Mar 2024" },
  { id: "USR003", name: "Tunde Adesanya", email: "tunde.a@email.com", status: "suspended", balance: "$892.10", joined: "Feb 2023" },
  { id: "USR004", name: "Chioma Eze", email: "c.eze@email.com", status: "active", balance: "$23,105.75", joined: "Nov 2022" },
  { id: "USR005", name: "Femi Adeyemi", email: "f.adeyemi@email.com", status: "pending", balance: "$0.00", joined: "Jun 2026" },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Sora:wght@400;500;600;700&display=swap');
  
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #F0F4F8;
    color: #0F172A;
    min-height: 100vh;
  }
  
  .nt-app { display: flex; flex-direction: column; min-height: 100vh; }
  
  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(10, 22, 40, 0.97);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    height: 68px; display: flex; align-items: center;
  }
  .nav-inner {
    max-width: 1200px; margin: 0 auto; padding: 0 24px;
    width: 100%; display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo {
    font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 700;
    color: white; display: flex; align-items: center; gap: 10px; cursor: pointer;
  }
  .nav-logo-mark {
    width: 36px; height: 36px; background: linear-gradient(135deg, #1A56DB, #0891B2);
    border-radius: 10px; display: flex; align-items: center; justify-content: center;
    font-size: 16px; font-weight: 800; color: white; letter-spacing: -0.5px;
  }
  .nav-links { display: flex; align-items: center; gap: 6px; }
  .nav-link {
    padding: 8px 14px; border-radius: 8px; font-size: 14px; font-weight: 500;
    color: rgba(255,255,255,0.7); cursor: pointer; transition: all 0.2s;
    background: none; border: none; font-family: inherit;
  }
  .nav-link:hover { color: white; background: rgba(255,255,255,0.08); }
  .nav-link.active { color: white; background: rgba(26,86,219,0.3); }
  .nav-cta {
    padding: 9px 20px; background: #1A56DB; color: white;
    border-radius: 9px; font-size: 14px; font-weight: 600;
    cursor: pointer; border: none; font-family: inherit; transition: all 0.2s;
  }
  .nav-cta:hover { background: #2563EB; transform: translateY(-1px); }
  
  /* SIDEBAR */
  .layout { display: flex; padding-top: 68px; min-height: 100vh; }
  .sidebar {
    width: 240px; background: #0A1628; min-height: calc(100vh - 68px);
    position: fixed; top: 68px; left: 0; padding: 20px 0;
    border-right: 1px solid rgba(255,255,255,0.06); overflow-y: auto;
  }
  .sidebar-section { padding: 8px 16px; margin-bottom: 4px; }
  .sidebar-label {
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 1.2px; color: rgba(255,255,255,0.3); padding: 0 8px; margin-bottom: 6px;
  }
  .sidebar-item {
    display: flex; align-items: center; gap: 10px; padding: 10px 12px;
    border-radius: 10px; cursor: pointer; transition: all 0.2s;
    font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.6);
    background: none; border: none; width: 100%; text-align: left; font-family: inherit;
  }
  .sidebar-item:hover { color: white; background: rgba(255,255,255,0.07); }
  .sidebar-item.active { color: white; background: rgba(26,86,219,0.35); }
  .sidebar-icon { font-size: 16px; width: 20px; text-align: center; }
  .sidebar-badge {
    margin-left: auto; background: #DC2626; color: white;
    font-size: 11px; font-weight: 700; padding: 1px 6px;
    border-radius: 10px; min-width: 18px; text-align: center;
  }
  
  .main-content { margin-left: 240px; flex: 1; padding: 28px; }
  
  /* CARDS */
  .card {
    background: white; border-radius: 16px;
    border: 1px solid #E2E8F0; overflow: hidden;
  }
  .card-header {
    padding: 20px 24px 0; display: flex; align-items: center;
    justify-content: space-between;
  }
  .card-title { font-size: 16px; font-weight: 700; color: #0F172A; }
  .card-subtitle { font-size: 13px; color: #64748B; margin-top: 2px; }
  .card-body { padding: 20px 24px; }
  
  /* STAT CARDS */
  .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
  .stat-card {
    background: white; border-radius: 16px; padding: 20px;
    border: 1px solid #E2E8F0; position: relative; overflow: hidden;
  }
  .stat-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  }
  .stat-card.blue::before { background: linear-gradient(90deg, #1A56DB, #0891B2); }
  .stat-card.green::before { background: linear-gradient(90deg, #059669, #10B981); }
  .stat-card.gold::before { background: linear-gradient(90deg, #D97706, #F59E0B); }
  .stat-card.purple::before { background: linear-gradient(90deg, #7C3AED, #A78BFA); }
  .stat-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #64748B; }
  .stat-value { font-family: 'Sora', sans-serif; font-size: 26px; font-weight: 700; color: #0F172A; margin: 8px 0 4px; }
  .stat-change { font-size: 13px; font-weight: 600; }
  .stat-change.up { color: #059669; }
  .stat-change.down { color: #DC2626; }
  .stat-icon { position: absolute; top: 20px; right: 20px; font-size: 28px; opacity: 0.15; }
  
  /* BANKING CARDS (visual) */
  .bank-card {
    width: 100%; aspect-ratio: 1.586; border-radius: 18px;
    padding: 24px; position: relative; overflow: hidden; color: white;
    cursor: pointer; transition: transform 0.3s;
  }
  .bank-card:hover { transform: translateY(-4px); }
  .bank-card.blue { background: linear-gradient(135deg, #0F2040 0%, #1A56DB 60%, #0891B2 100%); }
  .bank-card.dark { background: linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%); }
  .bank-card-pattern {
    position: absolute; top: -30px; right: -30px;
    width: 180px; height: 180px; border-radius: 50%;
    border: 40px solid rgba(255,255,255,0.06);
  }
  .bank-card-pattern2 {
    position: absolute; bottom: -50px; right: 60px;
    width: 140px; height: 140px; border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }
  .bank-card-chip { width: 42px; height: 32px; background: linear-gradient(135deg, #D4AF37, #C5A028); border-radius: 6px; margin-bottom: 20px; }
  .bank-card-number { font-family: 'Sora', monospace; font-size: 16px; letter-spacing: 3px; font-weight: 500; margin-bottom: 16px; }
  .bank-card-bottom { display: flex; justify-content: space-between; align-items: flex-end; }
  .bank-card-holder { font-size: 13px; font-weight: 600; letter-spacing: 0.5px; }
  .bank-card-expiry { font-size: 12px; opacity: 0.8; }
  .bank-card-brand { font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 800; opacity: 0.9; }
  
  /* BUTTONS */
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 10px 20px; border-radius: 10px; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.2s; border: none; font-family: inherit;
  }
  .btn-primary { background: #1A56DB; color: white; }
  .btn-primary:hover { background: #2563EB; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(26,86,219,0.3); }
  .btn-secondary { background: #F1F5F9; color: #334155; border: 1px solid #E2E8F0; }
  .btn-secondary:hover { background: #E2E8F0; }
  .btn-danger { background: #FEF2F2; color: #DC2626; border: 1px solid #FECACA; }
  .btn-danger:hover { background: #FEE2E2; }
  .btn-success { background: #ECFDF5; color: #059669; border: 1px solid #A7F3D0; }
  .btn-sm { padding: 7px 14px; font-size: 13px; }
  .btn-lg { padding: 13px 28px; font-size: 15px; }
  .btn-block { width: 100%; }
  
  /* FORM */
  .form-group { margin-bottom: 18px; }
  .form-label { display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px; }
  .form-input {
    width: 100%; padding: 11px 14px; border: 1.5px solid #E2E8F0;
    border-radius: 10px; font-size: 14px; font-family: inherit; color: #0F172A;
    background: white; transition: border-color 0.2s; outline: none;
  }
  .form-input:focus { border-color: #1A56DB; box-shadow: 0 0 0 3px rgba(26,86,219,0.1); }
  .form-select {
    width: 100%; padding: 11px 14px; border: 1.5px solid #E2E8F0;
    border-radius: 10px; font-size: 14px; font-family: inherit; color: #0F172A;
    background: white; cursor: pointer; outline: none;
  }
  .form-hint { font-size: 12px; color: #64748B; margin-top: 4px; }
  
  /* TABLE */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; }
  th { padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748B; border-bottom: 1px solid #E2E8F0; background: #F8FAFC; }
  td { padding: 14px 16px; font-size: 14px; color: #334155; border-bottom: 1px solid #F1F5F9; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: #F8FAFC; }
  
  /* BADGE */
  .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .badge-success { background: #ECFDF5; color: #059669; }
  .badge-warning { background: #FFFBEB; color: #D97706; }
  .badge-danger { background: #FEF2F2; color: #DC2626; }
  .badge-info { background: #EFF6FF; color: #1A56DB; }
  .badge-gray { background: #F1F5F9; color: #64748B; }
  
  /* PROGRESS */
  .progress { height: 8px; background: #E2E8F0; border-radius: 4px; overflow: hidden; }
  .progress-bar { height: 100%; border-radius: 4px; background: linear-gradient(90deg, #1A56DB, #0891B2); transition: width 0.5s; }
  
  /* PAGE-SPECIFIC */
  .page-header { margin-bottom: 28px; }
  .page-title { font-family: 'Sora', sans-serif; font-size: 24px; font-weight: 700; color: #0F172A; }
  .page-subtitle { font-size: 14px; color: #64748B; margin-top: 4px; }
  
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  
  /* TRANSACTION ITEM */
  .txn-item {
    display: flex; align-items: center; gap: 14px; padding: 14px 0;
    border-bottom: 1px solid #F1F5F9;
  }
  .txn-item:last-child { border-bottom: none; }
  .txn-icon { width: 42px; height: 42px; border-radius: 12px; background: #F1F5F9; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .txn-name { font-size: 14px; font-weight: 600; color: #0F172A; }
  .txn-date { font-size: 12px; color: #94A3B8; margin-top: 1px; }
  .txn-amount { margin-left: auto; font-size: 15px; font-weight: 700; }
  .txn-amount.credit { color: #059669; }
  .txn-amount.debit { color: #0F172A; }
  
  /* AUTH */
  .auth-wrap {
    min-height: 100vh; display: flex; align-items: stretch;
    background: #0A1628;
  }
  .auth-side {
    flex: 0 0 45%; background: linear-gradient(160deg, #0F2040 0%, #1A56DB 50%, #0891B2 100%);
    padding: 60px; display: flex; flex-direction: column; justify-content: center;
    position: relative; overflow: hidden;
  }
  .auth-side-pattern {
    position: absolute; width: 400px; height: 400px; border-radius: 50%;
    border: 80px solid rgba(255,255,255,0.05); top: -100px; right: -100px;
  }
  .auth-side-pattern2 {
    position: absolute; width: 300px; height: 300px; border-radius: 50%;
    background: rgba(255,255,255,0.03); bottom: -60px; left: -60px;
  }
  .auth-form-side {
    flex: 1; display: flex; align-items: center; justify-content: center;
    background: white; padding: 60px;
  }
  .auth-form-box { width: 100%; max-width: 400px; }
  
  /* HOMEPAGE */
  .hero {
    min-height: 100vh; background: linear-gradient(160deg, #0A1628 0%, #0F2040 40%, #0A1628 100%);
    display: flex; align-items: center; padding: 100px 0 60px; position: relative; overflow: hidden;
  }
  .hero-bg-circle1 {
    position: absolute; width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(26,86,219,0.15) 0%, transparent 70%);
    top: -100px; right: -100px; pointer-events: none;
  }
  .hero-bg-circle2 {
    position: absolute; width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(8,145,178,0.1) 0%, transparent 70%);
    bottom: 0; left: 200px; pointer-events: none;
  }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .hero-content { position: relative; z-index: 1; }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(26,86,219,0.2); border: 1px solid rgba(26,86,219,0.4);
    color: #93C5FD; font-size: 13px; font-weight: 600; padding: 6px 14px;
    border-radius: 20px; margin-bottom: 24px;
  }
  .hero-title {
    font-family: 'Sora', sans-serif; font-size: 58px; font-weight: 800;
    color: white; line-height: 1.1; margin-bottom: 20px;
  }
  .hero-title span { color: #60A5FA; }
  .hero-subtitle { font-size: 18px; color: rgba(255,255,255,0.65); line-height: 1.7; max-width: 520px; margin-bottom: 36px; }
  .hero-actions { display: flex; gap: 14px; align-items: center; }
  .hero-stats { display: flex; gap: 40px; margin-top: 52px; }
  .hero-stat-value { font-family: 'Sora', sans-serif; font-size: 28px; font-weight: 700; color: white; }
  .hero-stat-label { font-size: 13px; color: rgba(255,255,255,0.5); }
  
  .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 48px; }
  .service-card {
    background: white; border: 1px solid #E2E8F0; border-radius: 20px;
    padding: 28px; cursor: pointer; transition: all 0.3s;
  }
  .service-card:hover { border-color: #1A56DB; transform: translateY(-4px); box-shadow: 0 12px 30px rgba(26,86,219,0.1); }
  .service-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 16px; }
  .service-title { font-size: 17px; font-weight: 700; color: #0F172A; margin-bottom: 6px; }
  .service-desc { font-size: 14px; color: #64748B; line-height: 1.6; }
  
  .testimonial-card {
    background: white; border: 1px solid #E2E8F0; border-radius: 20px; padding: 28px;
  }
  .testimonial-stars { color: #F59E0B; font-size: 16px; margin-bottom: 14px; }
  .testimonial-text { font-size: 15px; color: #334155; line-height: 1.7; margin-bottom: 18px; font-style: italic; }
  .testimonial-author { display: flex; align-items: center; gap: 12px; }
  .avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: white; flex-shrink: 0; }
  
  /* TRANSFER */
  .contact-chip {
    display: flex; align-items: center; gap: 10px; padding: 12px 16px;
    border: 1.5px solid #E2E8F0; border-radius: 12px; cursor: pointer;
    transition: all 0.2s;
  }
  .contact-chip:hover, .contact-chip.selected { border-color: #1A56DB; background: #EFF6FF; }
  
  /* CHART SIMPLE */
  .mini-bar { display: flex; align-items: flex-end; gap: 4px; height: 60px; }
  .mini-bar-item { flex: 1; background: #E2E8F0; border-radius: 3px; transition: all 0.5s; min-height: 4px; }
  .mini-bar-item.active { background: linear-gradient(180deg, #1A56DB, #0891B2); }
  
  /* NOTIFICATIONS */
  .notif-item {
    display: flex; align-items: flex-start; gap: 14px; padding: 16px 20px;
    border-bottom: 1px solid #F1F5F9; cursor: pointer; transition: background 0.2s;
  }
  .notif-item:hover { background: #F8FAFC; }
  .notif-item.unread { background: #EFF6FF; }
  .notif-dot { width: 8px; height: 8px; border-radius: 50%; background: #1A56DB; flex-shrink: 0; margin-top: 6px; }
  .notif-icon-wrap { width: 40px; height: 40px; border-radius: 12px; background: #F1F5F9; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  
  /* INVESTMENT */
  .invest-item {
    display: flex; align-items: center; padding: 16px 0;
    border-bottom: 1px solid #F1F5F9;
  }
  .invest-item:last-child { border-bottom: none; }
  
  /* SUPPORT CHAT */
  .chat-bubble {
    max-width: 75%; padding: 12px 16px; border-radius: 14px;
    font-size: 14px; line-height: 1.5; margin-bottom: 10px;
  }
  .chat-bubble.agent { background: #F1F5F9; color: #0F172A; border-radius: 14px 14px 14px 4px; align-self: flex-start; }
  .chat-bubble.user { background: #1A56DB; color: white; border-radius: 14px 14px 4px 14px; align-self: flex-end; }
  
  /* LOAN CALC */
  .calc-result { background: linear-gradient(135deg, #0F2040, #1A56DB); color: white; padding: 24px; border-radius: 16px; }
  
  /* ADMIN */
  .admin-stat { background: white; border-radius: 14px; padding: 20px; border: 1px solid #E2E8F0; }
  
  /* TOGGLE */
  .toggle { width: 44px; height: 24px; border-radius: 12px; background: #E2E8F0; position: relative; cursor: pointer; transition: background 0.2s; flex-shrink: 0; }
  .toggle.on { background: #1A56DB; }
  .toggle::after { content: ''; position: absolute; width: 18px; height: 18px; border-radius: 50%; background: white; top: 3px; left: 3px; transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
  .toggle.on::after { transform: translateX(20px); }
  
  /* SPENDING CHART */
  .spend-bar { display: flex; gap: 8px; align-items: flex-end; height: 100px; margin: 16px 0; }
  .spend-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .spend-bar-fill { width: 100%; border-radius: 4px 4px 0 0; transition: all 0.5s; }
  .spend-month { font-size: 11px; color: #94A3B8; }
  
  .section { padding: 80px 0; }
  .section-label { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #1A56DB; margin-bottom: 12px; }
  .section-title { font-family: 'Sora', sans-serif; font-size: 36px; font-weight: 700; color: #0F172A; line-height: 1.2; }
  .section-subtitle { font-size: 16px; color: #64748B; margin-top: 12px; max-width: 500px; line-height: 1.7; }
  
  .scroll-x { overflow-x: auto; }
  
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .fade-in { animation: fadeIn 0.3s ease; }
  
  .tabs { display: flex; gap: 4px; background: #F1F5F9; padding: 4px; border-radius: 12px; margin-bottom: 24px; }
  .tab { flex: 1; padding: 9px 16px; border-radius: 9px; font-size: 14px; font-weight: 600; cursor: pointer; text-align: center; color: #64748B; transition: all 0.2s; border: none; background: none; font-family: inherit; }
  .tab.active { background: white; color: #0F172A; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  
  .divider { height: 1px; background: #E2E8F0; margin: 20px 0; }
  
  input[type=range] { width: 100%; accent-color: #1A56DB; }
  
  .glass-card {
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
    border-radius: 20px; backdrop-filter: blur(10px); padding: 28px;
  }
  
  .two-fa-box {
    display: flex; gap: 12px; justify-content: center; margin: 24px 0;
  }
  .two-fa-input {
    width: 52px; height: 58px; border: 2px solid #E2E8F0; border-radius: 12px;
    font-size: 24px; font-weight: 700; text-align: center; font-family: 'Sora', sans-serif;
    outline: none; transition: border-color 0.2s;
  }
  .two-fa-input:focus { border-color: #1A56DB; }
  
  .spend-donut { position: relative; width: 160px; height: 160px; }
  .loan-step { display: flex; align-items: flex-start; gap: 16px; padding: 20px 0; border-bottom: 1px solid #F1F5F9; }
  .step-num { width: 32px; height: 32px; border-radius: 50%; background: #1A56DB; color: white; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; flex-shrink: 0; }
`;

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function SpendingBars({ data }) {
  const max = Math.max(...data.map(d => d.val));
  return (
    <div className="spend-bar">
      {data.map((d, i) => (
        <div key={i} className="spend-col">
          <div className="spend-bar-fill" style={{ height: `${(d.val / max) * 80}px`, background: d.active ? "linear-gradient(180deg,#1A56DB,#0891B2)" : "#E2E8F0" }} />
          <span className="spend-month">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ segments }) {
  const size = 130, cx = 65, cy = 65, r = 48, stroke = 18;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const colors = ["#1A56DB", "#0891B2", "#059669", "#D97706", "#7C3AED"];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {segments.map((seg, i) => {
        const dash = (seg.pct / 100) * circ;
        const gap = circ - dash;
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={colors[i]} strokeWidth={stroke}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset * circ / 100 + circ * 0.25}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        );
        offset += seg.pct;
        return el;
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="18" fontWeight="700" fill="#0F172A" fontFamily="Sora">100%</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="10" fill="#64748B">Allocated</text>
    </svg>
  );
}

function BankCard({ type, last4, name, expiry }) {
  return (
    <div className={`bank-card ${type}`}>
      <div className="bank-card-pattern" />
      <div className="bank-card-pattern2" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div className="bank-card-brand">NT</div>
          <div style={{ fontSize: 12, background: "rgba(255,255,255,0.15)", padding: "4px 10px", borderRadius: 6 }}>VISA</div>
        </div>
        <div className="bank-card-chip" />
        <div className="bank-card-number">•••• •••• •••• {last4}</div>
        <div className="bank-card-bottom">
          <div>
            <div style={{ fontSize: 10, opacity: 0.6, marginBottom: 2 }}>CARD HOLDER</div>
            <div className="bank-card-holder">{name}</div>
          </div>
          <div className="bank-card-expiry">
            <div style={{ fontSize: 10, opacity: 0.6, marginBottom: 2 }}>EXPIRES</div>
            <div>{expiry}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PAGES ────────────────────────────────────────────────────────────────────

function HomePage({ setPage }) {
  const services = [
    { icon: "💳", color: "#EFF6FF", title: "Everyday Banking", desc: "Zero-fee checking accounts, instant debit cards, and ATM access at 50,000+ locations." },
    { icon: "📈", color: "#ECFDF5", title: "Smart Investing", desc: "Start with as little as $1. Diversified ETFs, stocks, and bonds managed for you." },
    { icon: "🏠", color: "#FFF7ED", title: "Home Mortgages", desc: "Competitive rates from 6.4% APR. Pre-approval in minutes, close in days." },
    { icon: "🛡️", color: "#FDF4FF", title: "Savings & Goals", desc: "High-yield savings up to 5.2% APY. Set goals, track progress, earn more." },
    { icon: "💼", color: "#EFF6FF", title: "Business Banking", desc: "Invoicing, payroll, expense management, and dedicated relationship managers." },
    { icon: "🌍", color: "#F0FDF4", title: "International Transfers", desc: "Send money to 150+ countries. Real exchange rates, low flat fees." },
  ];
  const testimonials = [
    { text: "NovaTrust transformed how I manage my finances. The app is intuitive and the customer service is exceptional.", name: "Chidinma Obi", role: "Entrepreneur, Lagos", color: "#6366F1" },
    { text: "Getting my mortgage was seamless. The team walked me through every step and I got a fantastic rate.", name: "Emmanuel Taiwo", role: "Software Engineer, Abuja", color: "#0891B2" },
    { text: "The investment portfolio tools are world-class. My savings have grown 18% this year alone.", name: "Blessing Adeyinka", role: "Teacher, Port Harcourt", color: "#059669" },
  ];

  return (
    <div style={{ paddingTop: 68 }}>
      {/* HERO */}
      <div className="hero">
        <div className="hero-bg-circle1" />
        <div className="hero-bg-circle2" />
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div className="hero-content">
              <div className="hero-tag">🇳🇬 Trusted by 2M+ Nigerians</div>
              <h1 className="hero-title">Banking That <span>Works for</span> You</h1>
              <p className="hero-subtitle">NovaTrust brings enterprise-grade financial tools to everyone. Open an account in 3 minutes, no paperwork needed.</p>
              <div className="hero-actions">
                <button className="btn btn-primary btn-lg" onClick={() => setPage("register")}>Open Free Account</button>
                <button className="btn btn-lg" style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }} onClick={() => setPage("login")}>Sign In</button>
              </div>
              <div className="hero-stats">
                {[["$4.2B+", "Assets Under Management"], ["2M+", "Active Customers"], ["150+", "Countries Supported"]].map(([v, l]) => (
                  <div key={l}>
                    <div className="hero-stat-value">{v}</div>
                    <div className="hero-stat-label">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <BankCard type="blue" last4="4521" name="ADAEZE OKONKWO" expiry="09/28" />
              <div style={{ marginTop: 16 }}>
                <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 4 }}>Total Balance</div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 28, fontWeight: 700, color: "white" }}>$12,430.50</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#10B981", fontSize: 13, fontWeight: 600 }}>↑ +$340.20</div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>this month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div className="section" style={{ background: "white" }}>
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <div className="section-label">Our Services</div>
            <h2 className="section-title">Everything You Need,<br />All in One Place</h2>
            <p className="section-subtitle" style={{ margin: "12px auto 0" }}>From everyday transactions to long-term wealth building.</p>
          </div>
          <div className="services-grid">
            {services.map(s => (
              <div key={s.title} className="service-card">
                <div className="service-icon" style={{ background: s.color }}>{s.icon}</div>
                <div className="service-title">{s.title}</div>
                <div className="service-desc">{s.desc}</div>
                <div style={{ marginTop: 16, fontSize: 14, fontWeight: 600, color: "#1A56DB", cursor: "pointer" }}>Learn more →</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="section" style={{ background: "#F8FAFC" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label">Testimonials</div>
            <h2 className="section-title">Loved by Customers</h2>
          </div>
          <div className="grid-3">
            {testimonials.map(t => (
              <div key={t.name} className="testimonial-card">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="avatar" style={{ background: t.color }}>{t.name.split(" ").map(n => n[0]).join("")}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#64748B" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="section" style={{ background: "linear-gradient(135deg, #0A1628, #1A56DB)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 40, fontWeight: 700, color: "white", marginBottom: 16 }}>Ready to Get Started?</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginBottom: 36 }}>Join 2 million+ customers. Open your account in minutes.</p>
          <button className="btn btn-lg" style={{ background: "white", color: "#1A56DB" }} onClick={() => setPage("register")}>Open Free Account Today</button>
        </div>
      </div>
    </div>
  );
}

function LoginPage({ setPage, setLoggedIn }) {
  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("ada.okonkwo@email.com");
  const [pass, setPass] = useState("••••••••");
  const [bio, setBio] = useState(false);

  if (step === "2fa") return (
    <div className="auth-wrap">
      <div className="auth-side">
        <div className="auth-side-pattern" />
        <div className="auth-side-pattern2" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="nav-logo-mark" style={{ marginBottom: 40, width: 50, height: 50, fontSize: 22 }}>N</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginBottom: 16 }}>Security First</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 36, fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: 16 }}>Two-Factor Authentication</h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.7 }}>Your account is protected with multi-layer security. Enter the code sent to your registered device.</p>
        </div>
      </div>
      <div className="auth-form-side">
        <div className="auth-form-box">
          <div style={{ fontSize: 40, marginBottom: 16 }}>📱</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Verify Your Identity</h2>
          <p style={{ color: "#64748B", fontSize: 14, marginBottom: 8 }}>A 6-digit code was sent to your phone</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#1A56DB", marginBottom: 24 }}>+234 *** *** 7291</p>
          <div className="two-fa-box">
            {[1,2,3,4,5,6].map(i => <input key={i} className="two-fa-input" maxLength={1} defaultValue={i === 1 ? "4" : i === 2 ? "8" : ""} />)}
          </div>
          <button className="btn btn-primary btn-block btn-lg" onClick={() => { setLoggedIn(true); setPage("dashboard"); }}>Verify & Sign In</button>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <span style={{ fontSize: 14, color: "#64748B" }}>Didn't receive code? </span>
            <span style={{ fontSize: 14, color: "#1A56DB", fontWeight: 600, cursor: "pointer" }}>Resend (0:45)</span>
          </div>
          <div className="divider" />
          <button className="btn btn-secondary btn-block" onClick={() => setStep("login")}>← Back to Login</button>
        </div>
      </div>
    </div>
  );

  if (step === "forgot") return (
    <div className="auth-wrap">
      <div className="auth-side">
        <div className="auth-side-pattern" />
        <div className="auth-side-pattern2" />
        <div style={{ position: "relative", zIndex: 1, color: "white" }}>
          <div className="nav-logo-mark" style={{ marginBottom: 40, width: 50, height: 50, fontSize: 22 }}>N</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 36, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>Account Recovery</h2>
          <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>We'll send a secure reset link to your registered email or phone number.</p>
        </div>
      </div>
      <div className="auth-form-side">
        <div className="auth-form-box">
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔑</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Forgot Password?</h2>
          <p style={{ color: "#64748B", fontSize: 14, marginBottom: 28 }}>Enter your email and we'll send a recovery link</p>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" defaultValue="ada.okonkwo@email.com" />
          </div>
          <button className="btn btn-primary btn-block btn-lg" onClick={() => setStep("login")}>Send Recovery Link</button>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <span style={{ fontSize: 14, color: "#1A56DB", fontWeight: 600, cursor: "pointer" }} onClick={() => setStep("login")}>← Back to Login</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="auth-wrap">
      <div className="auth-side">
        <div className="auth-side-pattern" />
        <div className="auth-side-pattern2" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="nav-logo-mark" style={{ marginBottom: 40, width: 50, height: 50, fontSize: 22 }}>N</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 36, fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: 16 }}>Welcome Back</h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.7, marginBottom: 40 }}>Your finances, secured and accessible from anywhere in the world.</p>
          {[["🔒 Bank-grade 256-bit encryption"], ["📱 Biometric authentication"], ["🌐 Access from any device"]].map(([f]) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#60A5FA" }} />
              <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 14 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="auth-form-side">
        <div className="auth-form-box">
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Sign In</h2>
          <p style={{ color: "#64748B", fontSize: 14, marginBottom: 32 }}>Enter your credentials to access your account</p>
          
          {bio ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>👆</div>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Touch ID / Face ID</div>
              <p style={{ color: "#64748B", fontSize: 14, marginBottom: 24 }}>Place your finger on the sensor or look at the camera</p>
              <button className="btn btn-primary" onClick={() => { setLoggedIn(true); setPage("dashboard"); }}>Authenticate</button>
              <div style={{ marginTop: 16 }}><span style={{ fontSize: 13, color: "#64748B", cursor: "pointer" }} onClick={() => setBio(false)}>Use password instead</span></div>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
                <button className="btn btn-secondary" style={{ flex: 1, gap: 6 }} onClick={() => setBio(true)}>👆 Biometric</button>
                <button className="btn btn-secondary" style={{ flex: 1, gap: 6 }} onClick={() => setStep("2fa")}>📱 OTP</button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
                <span style={{ fontSize: 13, color: "#94A3B8" }}>or use email</span>
                <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <label className="form-label">Password</label>
                  <span style={{ fontSize: 13, color: "#1A56DB", fontWeight: 600, cursor: "pointer" }} onClick={() => setStep("forgot")}>Forgot password?</span>
                </div>
                <input className="form-input" type="password" value={pass} onChange={e => setPass(e.target.value)} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                <input type="checkbox" id="remember" defaultChecked />
                <label htmlFor="remember" style={{ fontSize: 14, color: "#64748B" }}>Remember this device for 30 days</label>
              </div>
              <button className="btn btn-primary btn-block btn-lg" onClick={() => setStep("2fa")}>Sign In Securely</button>
            </>
          )}
          
          <div className="divider" />
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 14, color: "#64748B" }}>Don't have an account? </span>
            <span style={{ fontSize: 14, color: "#1A56DB", fontWeight: 600, cursor: "pointer" }} onClick={() => setPage("register")}>Open Account</span>
          </div>
          <div style={{ marginTop: 20, padding: 14, background: "#EFF6FF", borderRadius: 10, display: "flex", gap: 10, alignItems: "center" }}>
            <span>🔒</span>
            <span style={{ fontSize: 12, color: "#1A56DB" }}>Your connection is secured with 256-bit TLS encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RegisterPage({ setPage }) {
  const [step, setStep] = useState(1);
  return (
    <div className="auth-wrap">
      <div className="auth-side">
        <div className="auth-side-pattern" />
        <div className="auth-side-pattern2" />
        <div style={{ position: "relative", zIndex: 1, color: "white" }}>
          <div className="nav-logo-mark" style={{ marginBottom: 40, width: 50, height: 50, fontSize: 22 }}>N</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 36, fontWeight: 700, lineHeight: 1.2, marginBottom: 20 }}>Open Your Account in 3 Minutes</h2>
          {[["1", "Personal Details", step >= 1], ["2", "Contact & ID Verification", step >= 2], ["3", "Account Setup", step >= 3]].map(([n, l, done]) => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: done ? "#1A56DB" : "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>{done ? "✓" : n}</div>
              <span style={{ color: done ? "white" : "rgba(255,255,255,0.5)", fontSize: 15, fontWeight: done ? 600 : 400 }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="auth-form-side">
        <div className="auth-form-box" style={{ maxWidth: 460 }}>
          {step === 1 && <>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 28 }}>Personal Information</h2>
            <div className="grid-2">
              <div className="form-group"><label className="form-label">First Name</label><input className="form-input" defaultValue="Adaeze" /></div>
              <div className="form-group"><label className="form-label">Last Name</label><input className="form-input" defaultValue="Okonkwo" /></div>
            </div>
            <div className="form-group"><label className="form-label">Date of Birth</label><input className="form-input" type="date" defaultValue="1992-05-15" /></div>
            <div className="form-group"><label className="form-label">Gender</label><select className="form-select"><option>Female</option><option>Male</option><option>Prefer not to say</option></select></div>
            <div className="form-group"><label className="form-label">Nationality</label><select className="form-select"><option>Nigerian</option><option>Other</option></select></div>
            <button className="btn btn-primary btn-block btn-lg" onClick={() => setStep(2)}>Continue →</button>
          </>}
          {step === 2 && <>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 28 }}>Contact & Verification</h2>
            <div className="form-group"><label className="form-label">Email Address</label><input className="form-input" type="email" defaultValue="ada.okonkwo@email.com" /></div>
            <div className="form-group"><label className="form-label">Phone Number</label><input className="form-input" defaultValue="+234 803 456 7890" /></div>
            <div className="form-group"><label className="form-label">NIN / BVN</label><input className="form-input" defaultValue="1234 5678 9012" /><div className="form-hint">Your BVN/NIN is required for regulatory compliance</div></div>
            <div className="form-group"><label className="form-label">ID Type</label><select className="form-select"><option>National ID Card</option><option>Passport</option><option>Driver's License</option></select></div>
            <div style={{ border: "2px dashed #E2E8F0", borderRadius: 12, padding: 24, textAlign: "center", marginBottom: 20, cursor: "pointer" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📎</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Upload ID Document</div>
              <div style={{ fontSize: 13, color: "#64748B" }}>JPG, PNG or PDF — max 5MB</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-secondary btn-block" onClick={() => setStep(1)}>← Back</button>
              <button className="btn btn-primary btn-block" onClick={() => setStep(3)}>Continue →</button>
            </div>
          </>}
          {step === 3 && <>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 28 }}>Set Up Account</h2>
            <div className="form-group"><label className="form-label">Choose Account Type</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[["Personal Savings", "Zero fees, 3.5% interest"], ["Personal Current", "Unlimited transactions"], ["Business Account", "For sole traders & companies"]].map(([t, d]) => (
                  <label key={t} style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, border: "1.5px solid #E2E8F0", borderRadius: 10, cursor: "pointer" }}>
                    <input type="radio" name="acct" defaultChecked={t === "Personal Savings"} />
                    <div><div style={{ fontWeight: 600 }}>{t}</div><div style={{ fontSize: 12, color: "#64748B" }}>{d}</div></div>
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group"><label className="form-label">Create Password</label><input className="form-input" type="password" placeholder="Min. 8 characters" /></div>
            <div className="form-group"><label className="form-label">Confirm Password</label><input className="form-input" type="password" /></div>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <input type="checkbox" id="terms" />
              <label htmlFor="terms" style={{ fontSize: 13, color: "#64748B" }}>I agree to the <span style={{ color: "#1A56DB" }}>Terms of Service</span> and <span style={{ color: "#1A56DB" }}>Privacy Policy</span></label>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-secondary btn-block" onClick={() => setStep(2)}>← Back</button>
              <button className="btn btn-primary btn-block" onClick={() => setPage("login")}>Open Account 🎉</button>
            </div>
          </>}
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <span style={{ fontSize: 14, color: "#64748B" }}>Already have an account? </span>
            <span style={{ fontSize: 14, color: "#1A56DB", fontWeight: 600, cursor: "pointer" }} onClick={() => setPage("login")}>Sign In</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
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
                    <div style={{ fontWeight: 600, fontSize: 13, color: ins.tc }}>{ins.title}</div>
                    <div style={{ fontSize: 12, color: ins.tc, opacity: 0.8, marginTop: 2 }}>{ins.msg}</div>
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

function TransferPage() {
  const [step, setStep] = useState("form");
  const [selectedContact, setSelectedContact] = useState(null);
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
              {[["Amount", `$${parseFloat(amount || 0).toFixed(2)}`], ["Transfer Fee", "$0.00"], ["Total Deducted", `$${parseFloat(amount || 0).toFixed(2)}`], ["From", "Main Checking ••••4521"], ["Note", note || "—"]].map(([k, v]) => (
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
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 36, fontWeight: 800, color: "#059669" }}>${parseFloat(amount || 100).toFixed(2)}</div>
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
                  <span>Total</span><span>${parseFloat(amount || 0).toFixed(2)}</span>
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

function BillsPage() {
  const [toggles, setToggles] = useState({ 1: true, 2: true, 3: false, 4: true, 5: false });
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

function CardsPage() {
  const [frozen, setFrozen] = useState({ 1: false, 2: false });
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
                {[["Freeze Card", frozen[1] ? "🔴" : "🔒", () => setFrozen(f => ({ ...f, 1: !f[1] }))], ["Change PIN", "🔑", () => {}], ["View CVV", "👁️", () => {}], ["Report Lost", "🚨", () => {}]].map(([l, ic, fn]) => (
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
                {[["Freeze Card", frozen[2] ? "🔴" : "🔒", () => setFrozen(f => ({ ...f, 2: !f[2] }))], ["Pay Balance", "💳", () => {}], ["Set Limits", "📊", () => {}], ["Rewards", "🎁", () => {}]].map(([l, ic, fn]) => (
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

function LoansPage() {
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
            {[["Fill Application", "Complete the online form in under 5 minutes", "Instant"],
              ["Document Verification", "Upload ID, proof of income, bank statements", "1–2 hrs"],
              ["Credit Assessment", "Automated credit check and risk scoring", "Real-time"],
              ["Approval Decision", "Receive approval notification via email & SMS", "Same day"],
              ["Disbursement", "Funds deposited directly to your account", "24 hours"]].map(([title, desc, time], i) => (
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

function InvestmentsPage() {
  const total = investments.reduce((s, i) => s + i.value, 0);
  return (
    <div className="fade-in">
      <div className="page-header"><h1 className="page-title">Investments & Savings</h1><p className="page-subtitle">Grow your wealth with NovaTrust</p></div>
      <div className="stat-grid">
        {[["Portfolio Value", "$27,701.25", "+$1,120.50", true, "📈", "blue"],
          ["Total Return", "+$3,201.25", "+13.1% all time", true, "💹", "green"],
          ["Monthly Gain", "+$340.20", "vs $280.50 last month", true, "📊", "gold"],
          ["Savings APY", "5.2%", "High-yield account", true, "🏦", "purple"]].map(([l, v, c, up, ic, cls]) => (
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
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: ["#1A56DB","#0891B2","#059669","#D97706"][i], flexShrink: 0 }} />
                    <span style={{ fontSize: 13, flex: 1, color: "#334155" }}>{inv.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 700 }}>{inv.allocation}%</span>
                  </div>
                ))}
              </div>
            </div>
            {investments.map((inv, i) => (
              <div key={inv.name} className="invest-item" style={{ gap: 14 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: ["#1A56DB","#0891B2","#059669","#D97706"][i], flexShrink: 0, marginTop: 4 }} />
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
              {[{ name: "High-Yield Savings", rate: "5.2%", bal: "$3,200.00", color: "#059669" },
                { name: "Fixed Deposit (90-day)", rate: "6.8%", bal: "$5,000.00", color: "#D97706" },
                { name: "Kids Savings", rate: "3.0%", bal: "$450.00", color: "#7C3AED" }].map(a => (
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
              {[["S&P 500 ETF", "Low risk", "+12.4%/yr", "📊"],
                ["Government Bonds", "Very low risk", "+7.2%/yr", "🏛️"],
                ["Emerging Markets", "Med risk", "+18.7%/yr", "🌍"],
                ["Real Estate Fund", "Med risk", "+9.1%/yr", "🏗️"]].map(([n, r, ret, ic]) => (
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

function SupportPage() {
  const [messages, setMessages] = useState([
    { role: "agent", text: "Hello! I'm Nova, your NovaTrust virtual assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [faqOpen, setFaqOpen] = useState(null);

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
              {[["📞", "Phone Support", "0800-NOVA-100", "Available 24/7"],
                ["📧", "Email", "support@novatrust.bank", "Response within 2 hours"],
                ["🏢", "Branches", "50+ locations nationwide", "Mon–Fri, 8am–5pm"],
                ["📱", "WhatsApp", "+234 900 123 4567", "Chat with an agent"]].map(([ic, title, val, note]) => (
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
                {[["#SR-A4F2X9", "Card not working at POS", "Jun 1, 2026", "Resolved"],
                  ["#SR-B8K1M3", "Incorrect charge on statement", "May 28, 2026", "In Progress"],
                  ["#SR-C2P5N7", "Transfer delay enquiry", "May 20, 2026", "Resolved"],
                  ["#SR-D6Q3L1", "Account upgrade request", "May 10, 2026", "Closed"]].map(([id, sub, date, status]) => (
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

function NotificationsPage() {
  const [notifs, setNotifs] = useState(notifications);
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

function AdminPage() {
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
        {[["overview","📊 Overview"],["users","👥 Users"],["transactions","💳 Transactions"],["analytics","📈 Analytics"]].map(([k,l]) => (
          <button key={k} className={`tab ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      
      {tab === "overview" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
            {[["Total Users", "24,381", "+142 today", "👥"],["Active Sessions", "1,847", "Live now", "🟢"],["Transactions Today", "8,924", "$2.4M volume", "💳"],["Support Tickets", "34", "8 urgent", "🎫"]].map(([l,v,s,ic]) => (
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
                {[["API Response Time", "124ms", 92],["Server Uptime", "99.98%", 99],["Transaction Success Rate", "99.7%", 99],["Security Score", "A+", 98],["Database Load", "34%", 34]].map(([k, v, p]) => (
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
                {[["New user registration", "USR-24381", "2 min ago", "info"],["Large transfer flagged", "$45,000 to Chase", "5 min ago", "warning"],["Support ticket resolved", "#SR-A4F2X9", "12 min ago", "success"],["Failed login attempt", "3x from 41.x.x.x", "18 min ago", "danger"],["System backup", "DB snapshot created", "1 hr ago", "info"]].map(([action, detail, time, type]) => (
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
                {[["#TX-001234","Adaeze Okonkwo","Transfer","$500.00","Jun 8, 2026","Completed"],["#TX-001233","Emeka Nwosu","Bill Payment","$124.50","Jun 8, 2026","Completed"],["#TX-001232","Chioma Eze","Withdrawal","$200.00","Jun 7, 2026","Completed"],["#TX-001231","Tunde Adesanya","Transfer","$45,000","Jun 7, 2026","Flagged"],["#TX-001230","Femi Adeyemi","Deposit","$5,000","Jun 6, 2026","Pending"]].map(([id,user,type,amt,date,status]) => (
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
                {[["Total Volume", "$28.5M"], ["Avg per Day", "$8,924"], ["Peak Hour", "2–3 PM"], ["Top Category", "Transfers"]].map(([k, v]) => (
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
                {[["Total Users", "24,381"], ["New This Month", "+981"], ["Active Users", "18,340"], ["Retention", "89.4%"]].map(([k, v]) => (
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

// ─── APP SHELL ────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);
  const [notifCount] = useState(2);

  const isAuth = ["login", "register"].includes(page);
  const isHome = page === "home";
  const isApp = loggedIn && !isAuth && !isHome;

  const navItems = [
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

  const renderPage = () => {
    if (page === "home") return <HomePage setPage={setPage} />;
    if (page === "login") return <LoginPage setPage={setPage} setLoggedIn={setLoggedIn} />;
    if (page === "register") return <RegisterPage setPage={setPage} />;
    if (isApp) {
      if (page === "dashboard") return <Dashboard />;
      if (page === "transfer") return <TransferPage />;
      if (page === "bills") return <BillsPage />;
      if (page === "cards") return <CardsPage />;
      if (page === "loans") return <LoansPage />;
      if (page === "investments") return <InvestmentsPage />;
      if (page === "support") return <SupportPage />;
      if (page === "notifications") return <NotificationsPage />;
      if (page === "admin") return <AdminPage />;
    }
    return <Dashboard />;
  };

  return (
    <>
      <style>{css}</style>
      <div className="nt-app">
        {/* NAV */}
        {!isAuth && (
          <nav className="nav">
            <div className="nav-inner">
              <div className="nav-logo" onClick={() => setPage(loggedIn ? "dashboard" : "home")}>
                <div className="nav-logo-mark">N</div>
                <span>NovaTrust</span>
              </div>
              {!loggedIn ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div className="nav-links">
                    {[["Personal", "home"], ["Business", "home"], ["Loans", "home"], ["Invest", "home"]].map(([l, p]) => (
                      <button key={l} className="nav-link" onClick={() => setPage(p)}>{l}</button>
                    ))}
                  </div>
                  <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)", margin: "0 6px" }} />
                  <button className="nav-link" onClick={() => setPage("login")}>Sign In</button>
                  <button className="nav-cta" onClick={() => setPage("register")}>Open Account</button>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Welcome back,</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>Adaeze Okonkwo</div>
                  </div>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#1A56DB", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>AO</div>
                  <button className="nav-link" style={{ fontSize: 13 }} onClick={() => { setLoggedIn(false); setPage("home"); }}>Sign Out</button>
                </div>
              )}
            </div>
          </nav>
        )}

        {/* AUTHENTICATED LAYOUT */}
        {isApp ? (
          <div className="layout">
            <aside className="sidebar">
              <div className="sidebar-section">
                <div className="sidebar-label">Main</div>
                {navItems.slice(0, 6).map(item => (
                  <button key={item.key} className={`sidebar-item ${page === item.key ? "active" : ""}`} onClick={() => setPage(item.key)}>
                    <span className="sidebar-icon">{item.icon}</span>
                    {item.label}
                    {item.badge && <span className="sidebar-badge">{item.badge}</span>}
                  </button>
                ))}
              </div>
              <div className="sidebar-section">
                <div className="sidebar-label">Help</div>
                {navItems.slice(6, 8).map(item => (
                  <button key={item.key} className={`sidebar-item ${page === item.key ? "active" : ""}`} onClick={() => setPage(item.key)}>
                    <span className="sidebar-icon">{item.icon}</span>
                    {item.label}
                    {item.badge && <span className="sidebar-badge">{item.badge}</span>}
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
            <main className="main-content">
              {renderPage()}
            </main>
          </div>
        ) : (
          <div style={isAuth ? {} : { paddingTop: 0 }}>
            {renderPage()}
          </div>
        )}
      </div>
    </>
  );
}
