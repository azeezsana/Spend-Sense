import React, { useState } from "react";
import "../App.css";

const monthlyData = [
  { month: "Mar", income: 32, expense: 21 },
  { month: "Apr", income: 32, expense: 19 },
  { month: "May", income: 34, expense: 23 },
  { month: "Jun", income: 31, expense: 21 },
  { month: "Jul", income: 36, expense: 24 },
  { month: "Aug", income: 31, expense: 18 },
];

const yearlyData = [
  { month: "2021", income: 25, expense: 17 },
  { month: "2022", income: 28, expense: 19 },
  { month: "2023", income: 32, expense: 23 },
  { month: "2024", income: 35, expense: 25 },
  { month: "2025", income: 38, expense: 28 },
  { month: "2026", income: 34, expense: 22 },
];

const categories = [
  { name: "Food", percentage: 30, color: "#d99537" },
  { name: "Shopping", percentage: 21, color: "#6551c9" },
  { name: "Bills", percentage: 18, color: "#c94f43" },
  { name: "Transport", percentage: 17, color: "#36a5d1" },
  { name: "Entertainment", percentage: 8, color: "#c44c91" },
  { name: "Health", percentage: 6, color: "#399b75" },
];

const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function Reports() {
  const [period, setPeriod] = useState("Monthly");

  const chartData = period === "Monthly" ? monthlyData : yearlyData;

  const income = 198000;
  const expenses = 124800;
  const savings = income - expenses;
  const savingsRate = ((savings / income) * 100).toFixed(1);

  const maxBar = 40;

  return (
    <main className="ss-report">
      <header className="ss-report-header">
        <div>
          <h1>Reports</h1>
          <p>Financial overview and spending insights</p>
        </div>
      </header>

      <div className="ss-report-tabs" role="tablist" aria-label="Report period">
        {["Monthly", "Yearly"].map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={period === item}
            className={period === item ? "active" : ""}
            onClick={() => setPeriod(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="ss-report-summary" aria-label="Financial summary">
        <article className="ss-summary-card">
          <p>Total Income</p>
          <h2 className="income-value">{formatINR(income)}</h2>
        </article>

        <article className="ss-summary-card">
          <p>Total Expenses</p>
          <h2 className="expense-value">{formatINR(expenses)}</h2>
        </article>

        <article className="ss-summary-card">
          <p>Net Savings</p>
          <h2 className="savings-value">{formatINR(savings)}</h2>
        </article>

        <article className="ss-summary-card">
          <p>Savings Rate</p>
          <h2 className="rate-value">{savingsRate}%</h2>
        </article>
      </section>

      <section className="ss-report-charts">
        <article className="ss-chart-card ss-income-chart">
          <h3>
            Income vs Expenses —{" "}
            {period === "Monthly" ? "Last 6 Months" : "Last 6 Years"}
          </h3>

          <div className="ss-bar-chart">
            <div className="ss-y-axis">
              {[40, 30, 20, 10, 0].map((value) => (
                <span key={value}>₹{value}k</span>
              ))}
            </div>

            <div className="ss-chart-plot">
              <div className="ss-grid-lines">
                {[0, 1, 2, 3, 4].map((line) => (
                  <span key={line} />
                ))}
              </div>

              <div className="ss-bar-groups">
                {chartData.map((item) => (
                  <div className="ss-bar-group" key={item.month}>
                    <div className="ss-bars">
                      <div
                        className="ss-bar ss-bar-income"
                        style={{
                          height: `${(item.income / maxBar) * 100}%`,
                        }}
                        title={`Income: ₹${item.income}k`}
                      />
                      <div
                        className="ss-bar ss-bar-expense"
                        style={{
                          height: `${(item.expense / maxBar) * 100}%`,
                        }}
                        title={`Expenses: ₹${item.expense}k`}
                      />
                    </div>
                    <span className="ss-bar-label">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="ss-chart-legend">
            <span>
              <i className="legend-expense" /> Expense
            </span>
            <span>
              <i className="legend-income" /> Income
            </span>
          </div>
        </article>

        <article className="ss-chart-card ss-category-chart">
          <h3>Spending by Category</h3>

          <div className="ss-category-content">
            <div
              className="ss-donut"
              role="img"
              aria-label="Spending categories: Food 30%, Shopping 21%, Bills 18%, Transport 17%, Entertainment 8%, Health 6%"
            >
              <div className="ss-donut-hole" />
            </div>

            <div className="ss-category-list">
              {categories.map((category) => (
                <div className="ss-category-row" key={category.name}>
                  <span className="ss-category-name">
                    <i style={{ backgroundColor: category.color }} />
                    {category.name}
                  </span>
                  <span className="ss-category-percentage">
                    {category.percentage}%
                  </span>
                  <div className="ss-category-track">
                    <span
                      style={{
                        width: `${category.percentage}%`,
                        backgroundColor: category.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}