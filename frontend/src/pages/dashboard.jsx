import { useState } from "react";
import "../App.css";
import logo from "../assets/SET Logo.png";
import TransactionsPage from "./transactions.jsx";
import BankStatement from "./bankstatement.jsx";
import Goals from "./Goals.jsx";
import Categorization from "./Categorization.jsx";
import Comparison from "./Comparison.jsx";
import SmartGrowth from "./SmartGrowth.jsx";

export default function Dashboard({ userName = "", initialGoal }) {
  const [activePage, setActivePage] = useState("Dashboard");

  const displayName = userName?.trim() || "";
  const initial = displayName ? displayName.charAt(0).toUpperCase() : "?";

  const indiaHour = Number(
    new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      hourCycle: "h23",
      timeZone: "Asia/Kolkata",
    }).format(new Date())
  );

  const greeting =
    indiaHour < 12
      ? "Good morning"
      : indiaHour < 17
        ? "Good afternoon"
        : indiaHour < 21
          ? "Good evening"
          : "Good night";

  const today = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  const visitKey = displayName
    ? `spendsense_visited_${displayName.toLowerCase()}`
    : "spendsense_visited";

  const isFirstVisit = !localStorage.getItem(visitKey);

  if (isFirstVisit) {
    localStorage.setItem(visitKey, "true");
  }

  const menuGroups = [
    {
      title: "MAIN",
      items: [
        ["Dashboard", "📊"],
        ["Transactions", "💳"],
        ["Bank Statement", "📄"],
        ["Goals", "🎯"],
        ["Reports", "🗃️"],
      ],
    },
    {
      title: "INSIGHTS",
      items: [
        ["Comparison", "↔"],
        ["Categorization", "🗂️"],
      ],
    },
    {
      title: "GROWTH",
      items: [
        ["Smart Growth", "🌳"],
        ["Quiz", "🧠"],
      ],
    },
    {
      title: "ACCOUNT",
      items: [["Notifications", "🔔"]],
    },
  ];

  return (
    <div className="ss-dashboard">
      <aside className="ss-sidebar">
        <div className="ss-brand">
          <img src={logo} alt="SpendSense logo" />
          <span>SpendSense</span>
        </div>

        <nav className="ss-navigation">
          {menuGroups.map((group) => (
            <div className="ss-menu-group" key={group.title}>
              <p className="ss-menu-heading">{group.title}</p>

              {group.items.map(([label, symbol]) => (
                <button
                  key={label}
                  type="button"
                  className={`ss-menu-item ${
                    activePage === label ? "active" : ""
                  }`}
                  onClick={() => setActivePage(label)}
                >
                  <span className="ss-menu-icon">{symbol}</span>
                  <span>{label}</span>

                  {label === "Notifications" && (
                    <span className="ss-notification-count">3</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <button
          className="ss-menu-item ss-logout"
          type="button"
          onClick={() => setActivePage("Logout")}
        >
          <span className="ss-menu-icon">⇥</span>
          <span>Logout</span>
        </button>
      </aside>

      <main className="ss-main">
        <header className="ss-topbar">
          <div className="ss-top-welcome">
            {isFirstVisit ? "Welcome" : "Welcome back"}
            {displayName ? `, ${displayName}` : ""}!
          </div>

          <button
            type="button"
            aria-label="Notifications"
            className="ss-top-notification"
            onClick={() => setActivePage("Notifications")}
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
              <path d="M10 21h4" />
            </svg>
          </button>

          <button type="button" aria-label="Profile" className="ss-avatar">
            {initial}
          </button>
        </header>

        {activePage === "Goals" ? (
          <Goals initialGoal={initialGoal} />
        ) : activePage === "Transactions" ? (
          <TransactionsPage />
        ) : activePage === "Bank Statement" ? (
          <BankStatement />
        ) : activePage === "Categorization" ? (
          <Categorization />
        ) : activePage === "Comparison" ? (
          <Comparison />
        ) : activePage === "Smart Growth" ? (
          <SmartGrowth />
        ) : activePage === "Logout" ? (
          <div className="ss-content">
            <h1>Logout</h1>
            <p>To log out, return to the login page.</p>
          </div>
        ) : (
          <div className="ss-content">
            {activePage === "Dashboard" ? (
              <>
                <p className="ss-date">{today}</p>

                <h1>
                  {greeting}
                  {displayName ? `, ${displayName}` : ""} 👋
                </h1>

                <p className="ss-subtitle">
                  Here's your financial overview.
                </p>

                <section className="ss-summary">
                  <article className="ss-card ss-income">
                    <span className="ss-card-icon">📈</span>
                    <p>Total Income</p>
                    <h2>₹0.00</h2>
                  </article>

                  <article className="ss-card ss-expense">
                    <span className="ss-card-icon">📉</span>
                    <p>Total Expense</p>
                    <h2>₹0.00</h2>
                  </article>

                  <article className="ss-card ss-savings">
                    <span className="ss-card-icon">🏦</span>
                    <p>Savings</p>
                    <h2>₹0.00</h2>
                  </article>

                  <article className="ss-card ss-budget">
                    <span className="ss-card-icon">📊</span>
                    <p>Budget Used</p>
                    <h2>0%</h2>
                    <div className="ss-progress">
                      <span style={{ width: "0%" }} />
                    </div>
                  </article>

                  <article className="ss-card ss-sapling">
                    <span className="ss-sapling-icon">🌱</span>
                    <h2>Sapling</h2>
                    <p>Smart Growth</p>
                  </article>
                </section>

                <section className="ss-middle">
                  <article className="ss-card ss-goal-card">
                    <div className="ss-section-title">
                      <h3>Goal Progress</h3>
                      <button
                        type="button"
                        onClick={() => setActivePage("Goals")}
                      >
                        View →
                      </button>
                    </div>

                    <div className="ss-goal-name">
                      <span>🎯</span>
                      <strong>{initialGoal?.name || "Home"}</strong>
                    </div>

                    <div className="ss-goal-values">
                      <span>
                        ₹{Number(initialGoal?.saved || 0).toLocaleString("en-IN")}
                      </span>
                      <span>
                        ₹{Number(initialGoal?.target || 10200).toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="ss-progress">
                      <span
                        style={{
                          width: `${
                            initialGoal?.target > 0
                              ? Math.min(
                                  (initialGoal.saved / initialGoal.target) * 100,
                                  100
                                )
                              : 0
                          }%`,
                        }}
                      />
                    </div>

                    <p className="ss-goal-percent">
                      {initialGoal?.target > 0
                        ? Math.round(
                            (initialGoal.saved / initialGoal.target) * 100
                          )
                        : 0}
                      %
                    </p>
                  </article>

                  <article className="ss-card ss-spending-card">
                    <div className="ss-section-title">
                      <h3>Spending Overview</h3>
                      <button
                        type="button"
                        onClick={() => setActivePage("Transactions")}
                      >
                        All →
                      </button>
                    </div>

                    {[
                      ["Shopping", "₹0", "🛍️", "shopping"],
                      ["Food", "₹0", "🍜", "food"],
                      ["Bills", "₹0", "⚡", "bills"],
                      ["Entertainment", "₹0", "🎬", "entertainment"],
                    ].map(([name, amount, icon, category]) => (
                      <div className="ss-spending-row" key={name}>
                        <div>
                          <span>{icon}</span>
                          <span>{name}</span>
                          <strong>{amount}</strong>
                        </div>
                        <div className={`ss-category-bar ${category}`} />
                      </div>
                    ))}
                  </article>
                </section>

                <h3 className="ss-quick-heading">Quick Access</h3>

                <section className="ss-quick-access">
                  <article className="ss-card ss-quick-card">
                    <span className="ss-card-icon">↔</span>
                    <h3>Comparison</h3>
                    <p>Compare periods</p>
                    <button
                      type="button"
                      onClick={() => setActivePage("Comparison")}
                    >
                      Open →
                    </button>
                  </article>

                  <article className="ss-card ss-quick-card">
                    <span className="ss-card-icon">📈</span>
                    <h3>SIP Planner</h3>
                    <p>Plan investments</p>
                    <button
                      type="button"
                      onClick={() => setActivePage("Smart Growth")}
                    >
                      Open →
                    </button>
                  </article>

                  <article className="ss-card ss-quick-card">
                    <span className="ss-card-icon">🏦</span>
                    <h3>Bank Statement</h3>
                    <p>Upload or enter</p>
                    <button
                      type="button"
                      onClick={() => setActivePage("Bank Statement")}
                    >
                      Open →
                    </button>
                  </article>
                </section>

                <section className="ss-bottom">
                  <article className="ss-card ss-transactions">
                    <h3>Recent Transactions</h3>
                    <p>No transactions yet.</p>
                    <button
                      type="button"
                      onClick={() => setActivePage("Transactions")}
                    >
                      View all →
                    </button>
                  </article>

                  <article className="ss-card ss-last-visit">
                    <h3>Last Visit</h3>
                    <p>{today}</p>
                  </article>
                </section>
              </>
            ) : (
              <>
                <h1>{activePage}</h1>
                <p>This section is not connected yet.</p>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}