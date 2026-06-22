import { useState } from "react";
import "./styles/global.css";

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import TransferPage from "./pages/TransferPage";
import BillsPage from "./pages/BillsPage";
import CardsPage from "./pages/CardsPage";
import LoansPage from "./pages/LoansPage";
import InvestmentsPage from "./pages/InvestmentsPage";
import SupportPage from "./pages/SupportPage";
import NotificationsPage from "./pages/NotificationsPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);
  const [notifCount] = useState(2);

  const isAuth = ["login", "register"].includes(page);
  const isHome = page === "home";
  const isApp = loggedIn && !isAuth && !isHome;

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
    <div className="nt-app">
      {!isAuth && (
        <Navbar loggedIn={loggedIn} page={page} setPage={setPage} setLoggedIn={setLoggedIn} notifCount={notifCount} />
      )}

      {isApp ? (
        <div className="layout">
          <Sidebar page={page} setPage={setPage} notifCount={notifCount} />
          <main className="main-content">
            {renderPage()}
          </main>
        </div>
      ) : (
        <div>
          {renderPage()}
        </div>
      )}
    </div>
  );
}
