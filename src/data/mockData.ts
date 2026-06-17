export interface Transaction {
  id: number;
  name: string;
  date: string;
  amount: number;
  category: string;
  icon: string;
  status: string;
}

export interface Contact {
  id: number;
  name: string;
  account: string;
  bank: string;
  avatar: string;
  color: string;
}

export interface Bill {
  id: number;
  name: string;
  due: string;
  amount: number;
  status: string;
  auto: boolean;
}

export interface LoanOffer {
  type: string;
  rate: string;
  max: string;
  term: string;
  icon: string;
}

export interface Investment {
  name: string;
  value: number;
  change: number;
  allocation: number;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Notification {
  id: number;
  type: string;
  title: string;
  msg: string;
  time: string;
  read: boolean;
  icon: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  status: string;
  balance: string;
  joined: string;
}

export const sampleTransactions: Transaction[] = [
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

export const contacts: Contact[] = [
  { id: 1, name: "Sarah Mitchell", account: "****4521", bank: "NovaTrust", avatar: "SM", color: "#6366F1" },
  { id: 2, name: "James Okafor", account: "****8834", bank: "Chase Bank", avatar: "JO", color: "#0891B2" },
  { id: 3, name: "Priya Sharma", account: "****2290", bank: "NovaTrust", avatar: "PS", color: "#059669" },
  { id: 4, name: "David Chen", account: "****6677", bank: "Wells Fargo", avatar: "DC", color: "#D97706" },
];

export const bills: Bill[] = [
  { id: 1, name: "Electricity (Lagos DISCO)", due: "Jun 15, 2026", amount: 124.50, status: "upcoming", auto: true },
  { id: 2, name: "Internet (Spectranet)", due: "Jun 18, 2026", amount: 89.99, status: "upcoming", auto: true },
  { id: 3, name: "Rent Payment", due: "Jun 30, 2026", amount: 1200.00, status: "upcoming", auto: false },
  { id: 4, name: "Netflix", due: "Jun 22, 2026", amount: 15.99, status: "upcoming", auto: true },
  { id: 5, name: "Gym Membership", due: "Jun 25, 2026", amount: 49.99, status: "upcoming", auto: false },
];

export const loanOffers: LoanOffer[] = [
  { type: "Personal Loan", rate: "8.9%", max: "$50,000", term: "up to 60 months", icon: "👤" },
  { type: "Home Mortgage", rate: "6.4%", max: "$500,000", term: "up to 30 years", icon: "🏠" },
  { type: "Auto Loan", rate: "5.9%", max: "$75,000", term: "up to 84 months", icon: "🚗" },
  { type: "Business Loan", rate: "9.5%", max: "$250,000", term: "up to 120 months", icon: "🏢" },
];

export const investments: Investment[] = [
  { name: "Growth ETF Portfolio", value: 12480.50, change: 4.2, allocation: 45 },
  { name: "Bond Index Fund", value: 8320.00, change: 1.1, allocation: 30 },
  { name: "Tech Sector Fund", value: 4150.75, change: -1.8, allocation: 15 },
  { name: "Emerging Markets", value: 2750.00, change: 2.9, allocation: 10 },
];

export const faqs: FAQ[] = [
  { q: "How do I reset my PIN?", a: "Go to Card Management → Select your card → Manage PIN → Reset PIN. You'll receive an OTP on your registered phone." },
  { q: "How long does an international transfer take?", a: "International transfers typically take 1–3 business days depending on the destination country and currency." },
  { q: "What are the daily transfer limits?", a: "Standard accounts: $10,000/day. Premium accounts: $50,000/day. Business accounts: $250,000/day." },
  { q: "How do I report a lost or stolen card?", a: "Immediately freeze your card in the Card Management section, then call our 24/7 hotline at 0800-NOVA-100." },
];

export const notifications: Notification[] = [
  { id: 1, type: "transaction", title: "Payment Received", msg: "You received $500.00 from Marcus T.", time: "2 min ago", read: false, icon: "💳" },
  { id: 2, type: "security", title: "New Login Detected", msg: "Login from Lagos, Nigeria (Chrome/Windows)", time: "1 hr ago", read: false, icon: "🔒" },
  { id: 3, type: "bill", title: "Bill Due Soon", msg: "Electricity bill of $124.50 due in 7 days", time: "3 hr ago", read: true, icon: "⚡" },
  { id: 4, type: "promo", title: "Investment Opportunity", msg: "New high-yield savings account — 5.2% APY", time: "1 day ago", read: true, icon: "📈" },
  { id: 5, type: "transaction", title: "Debit Alert", msg: "Amazon Purchase — $134.99 debited", time: "2 days ago", read: true, icon: "🛒" },
];

export const adminUsers: AdminUser[] = [
  { id: "USR001", name: "Adaeze Okonkwo", email: "ada.okonkwo@email.com", status: "active", balance: "$12,430.50", joined: "Jan 2024" },
  { id: "USR002", name: "Emeka Nwosu", email: "emeka.n@email.com", status: "active", balance: "$5,840.00", joined: "Mar 2024" },
  { id: "USR003", name: "Tunde Adesanya", email: "tunde.a@email.com", status: "suspended", balance: "$892.10", joined: "Feb 2023" },
  { id: "USR004", name: "Chioma Eze", email: "c.eze@email.com", status: "active", balance: "$23,105.75", joined: "Nov 2022" },
  { id: "USR005", name: "Femi Adeyemi", email: "f.adeyemi@email.com", status: "pending", balance: "$0.00", joined: "Jun 2026" },
];
