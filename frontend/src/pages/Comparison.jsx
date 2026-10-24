import { useState } from "react";
import "../App.css";

const categories = [
  { name: "Food", color: "#d98a42", icon: "🍜" },
  { name: "Shopping", color: "#5140d9", icon: "🛍️" },
  { name: "Transport", color: "#35a9cf", icon: "🚗" },
  { name: "Bills", color: "#bd4545", icon: "⚡" },
  { name: "Entertainment", color: "#c52d82", icon: "🎬" },
  { name: "Health", color: "#46a875", icon: "🏥" },
];

const monthlyData = [
  { month: "Mar", income: 32000, expense: 19500, savings: 12500 },
  { month: "Apr", income: 32000, expense: 21200, savings: 10800 },
  { month: "May", income: 34000, expense: 22800, savings: 11200 },
  { month: "Jun", income: 32000, expense: 18900, savings: 13100 },
  { month: "Jul", income: 36000, expense: 24100, savings: 11900 },
  { month: "Aug", income: 32000, expense: 17400, savings: 14600 },
];

const categoryData = [
  { name: "Food", previous: 4800, current: 6200 },
  { name: "Shopping", previous: 3200, current: 2600 },
  { name: "Transport", previous: 1900, current: 2200 },
  { name: "Bills", previous: 3100, current: 2900 },
  { name: "Entertainment", previous: 1200, current: 1500 },
  { name: "Health", previous: 700, current: 900 },
];

const money = (amount) =>
  `₹${amount.toLocaleString("en-IN")}`;

export default function Comparison({ transactions = [] }) {
  const [activeTab, setActiveTab] = useState("monthly");
  const [period, setPeriod] = useState(6);

  const getMonthKey = (date) => {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return "";
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  };

  const getAmount = (transaction) =>
    Math.abs(Number(transaction.amount) || 0);

  const isIncome = (transaction) =>
    ["income", "credit", "salary"].includes(
      String(transaction.type || "").toLowerCase()
    );

  const isExpense = (transaction) =>
    ["expense", "debit", "spending"].includes(
      String(transaction.type || "").toLowerCase()
    );

  const getCategory = (transaction) => {
    const value = String(transaction.category || "").toLowerCase();
    if (value.includes("food")) return "Food";
    if (value.includes("shop")) return "Shopping";
    if (value.includes("transport") || value.includes("travel")) return "Transport";
    if (value.includes("bill") || value.includes("utilit")) return "Bills";
    if (value.includes("entertain")) return "Entertainment";
    if (value.includes("health") || value.includes("medical")) return "Health";
    return null;
  };

  const hasTransactions = transactions.length > 0;

  const now = new Date();
  const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const getMonthTransactions = (monthDate) =>
    transactions.filter(
      (t) => getMonthKey(t.date) === getMonthKey(monthDate)
    );

  const currentTransactions = getMonthTransactions(currentMonth);
  const previousTransactions = getMonthTransactions(previousMonth);

  const getCategoryTotals = (monthTransactions) =>
    categories.map((category) => ({
      ...category,
      amount: monthTransactions
        .filter(
          (t) => isExpense(t) && getCategory(t) === category.name
        )
        .reduce((sum, t) => sum + getAmount(t), 0),
    }));

  const currentCategories = getCategoryTotals(currentTransactions);
  const previousCategories = getCategoryTotals(previousTransactions);

  const categoryComparison = categories.map((category) => {
    const previous =
      previousCategories.find((item) => item.name === category.name)?.amount || 0;
    const current =
      currentCategories.find((item) => item.name === category.name)?.amount || 0;

    return {
      ...category,
      previous,
      current,
      difference: current - previous,
      percentage: previous ? ((current - previous) / previous) * 100 : null,
    };
  });

  const months = Array.from({ length: period }, (_, index) => {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - period + 1 + index,
      1
    );
    const monthTransactions = getMonthTransactions(date);
    const income = monthTransactions
      .filter(isIncome)
      .reduce((sum, t) => sum + getAmount(t), 0);
    const expense = monthTransactions
      .filter(isExpense)
      .reduce((sum, t) => sum + getAmount(t), 0);

    return {
      month: date.toLocaleDateString("en-IN", { month: "short" }),
      income,
      expense,
      savings: income - expense,
    };
  });

  const average = (key) =>
    months.reduce((sum, month) => sum + month[key], 0) /
    (months.length || 1);

  const maxMonthlyValue = Math.max(
    1,
    ...months.flatMap((month) => [
      month.income,
      month.expense,
      month.savings,
    ])
  );

  const maxCategoryValue = Math.max(
    1,
    ...categoryComparison.flatMap((category) => [
      category.previous,
      category.current,
    ])
  );

  const changeText = (difference, percentage) => {
    if (difference === 0) return "₹0 (0%)";
    const sign = difference > 0 ? "+" : "−";
    const percentText =
      percentage === null ? "new" : `${Math.abs(percentage).toFixed(0)}%`;
    return `${sign}${money(Math.abs(difference))} (${difference > 0 ? "+" : "−"}${percentText === "new" ? "new" : percentText})`;
  };

  return (
    <div className="ss-content ss-comparison">
      <div className="ss-comparison-heading">
        <h1>Comparison</h1>
        <p>Compare spending patterns across periods and categories</p>
      </div>

      <div className="ss-comparison-tabs">
        <button
          className={activeTab === "monthly" ? "active" : ""}
          onClick={() => setActiveTab("monthly")}
          type="button"
        >
          Monthly Trend
        </button>
        <button
          className={activeTab === "category" ? "active" : ""}
          onClick={() => setActiveTab("category")}
          type="button"
        >
          By Category
        </button>
      </div>

      {activeTab === "monthly" ? (
        <>
          <div className="ss-period-filter">
            {[3, 6, 12].map((value) => (
              <button
                key={value}
                type="button"
                className={period === value ? "active" : ""}
                onClick={() => setPeriod(value)}
              >
                {value === 12 ? "1 Year" : `${value} Months`}
              </button>
            ))}
          </div>

          <section className="ss-comparison-summary">
            <article className="ss-comparison-card">
              <p>Avg Income</p>
              <h2>{money(Math.round(average("income")))}</h2>
            </article>
            <article className="ss-comparison-card">
              <p>Avg Expense</p>
              <h2 className="expense-text">
                {money(Math.round(average("expense")))}
              </h2>
            </article>
            <article className="ss-comparison-card">
              <p>Avg Savings</p>
              <h2 className="savings-text">
                {money(Math.round(average("savings")))}
              </h2>
            </article>
          </section>

          <section className="ss-comparison-panel">
            <h3>Income vs Expense vs Savings</h3>

            <div className="ss-month-chart">
              {months.map((month) => (
                <div className="ss-month-column" key={month.month}>
                  <div className="ss-bars">
                    {[
                      ["expense", month.expense, "#d66b78"],
                      ["income", month.income, "#5140d9"],
                      ["savings", Math.max(0, month.savings), "#55b995"],
                    ].map(([key, value, color]) => (
                      <div
                        key={key}
                        className="ss-month-bar"
                        title={`${key}: ${money(value)}`}
                        style={{
                          height: `${(value / maxMonthlyValue) * 180}px`,
                          backgroundColor: color,
                        }}
                      />
                    ))}
                  </div>
                  <span>{month.month}</span>
                </div>
              ))}
            </div>

            <div className="ss-chart-legend">
              <span><i style={{ background: "#d66b78" }} />Expense</span>
              <span><i style={{ background: "#5140d9" }} />Income</span>
              <span><i style={{ background: "#55b995" }} />Savings</span>
            </div>
          </section>

          <section className="ss-comparison-panel ss-comparison-table-panel">
            <h3>Month-on-Month</h3>
            <div className="ss-comparison-table-wrap">
              <table className="ss-comparison-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Income</th>
                    <th>Expense</th>
                    <th>Savings</th>
                    <th>Δ Savings</th>
                  </tr>
                </thead>
                <tbody>
                  {months.map((month, index) => {
                    const change =
                      index === 0
                        ? null
                        : month.savings - months[index - 1].savings;

                    return (
                      <tr key={`${month.month}-${index}`}>
                        <td>{month.month}</td>
                        <td className="savings-text">{money(month.income)}</td>
                        <td className="expense-text">{money(month.expense)}</td>
                        <td className="comparison-purple">{money(month.savings)}</td>
                        <td className={change > 0 ? "savings-text" : change < 0 ? "expense-text" : ""}>
                          {change === null ? "—" : `${change > 0 ? "+" : ""}${money(change)}`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : (
        <>
          <div className="ss-category-period-label">
            <h3>This Month vs Last Month</h3>
            <p>
              {currentMonth.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
              {" compared with "}
              {previousMonth.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
            </p>
          </div>

          <div className="ss-category-comparison-grid">
            <section className="ss-comparison-panel ss-category-list">
              <h3>Spending by Category</h3>

              {categoryComparison.map((category) => {
                const max = Math.max(
                  1,
                  category.previous,
                  category.current
                );

                return (
                  <div className="ss-category-row" key={category.name}>
                    <div className="ss-category-row-heading">
                      <span className="ss-category-name">
                        <i style={{ backgroundColor: category.color }} />
                        {category.name}
                      </span>
                      <span
                        className={
                          category.difference > 0
                            ? "expense-text"
                            : category.difference < 0
                              ? "savings-text"
                              : ""
                        }
                      >
                        {changeText(category.difference, category.percentage)}
                      </span>
                    </div>

                    <div className="ss-category-track">
                      <span
                        className="ss-category-previous"
                        style={{
                          width: `${(category.previous / max) * 100}%`,
                          backgroundColor: `${category.color}55`,
                        }}
                      />
                      <span
                        className="ss-category-current"
                        style={{
                          width: `${(category.current / max) * 100}%`,
                          backgroundColor: category.color,
                        }}
                      />
                    </div>

                    <div className="ss-category-amounts">
                      <span>{money(category.previous)}</span>
                      <span>{money(category.current)}</span>
                    </div>
                  </div>
                );
              })}

              <div className="ss-category-legend">
                <span><i className="previous-dot" />Last month</span>
                <span><i className="current-dot" />This month</span>
              </div>
            </section>

            <section className="ss-comparison-panel ss-category-bar-panel">
              <h3>Category Bar Comparison</h3>

              {categoryComparison.map((category) => (
                <div className="ss-horizontal-row" key={category.name}>
                  <span>{category.name}</span>
                  <div className="ss-horizontal-bars">
                    <div
                      className="ss-horizontal-bar previous"
                      style={{
                        width: `${(category.previous / maxCategoryValue) * 100}%`,
                      }}
                    />
                    <div
                      className="ss-horizontal-bar current"
                      style={{
                        width: `${(category.current / maxCategoryValue) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}

              <div className="ss-category-legend">
                <span><i className="previous-dot" />Last month</span>
                <span><i className="current-dot" />This month</span>
              </div>
            </section>
          </div>
        </>
      )}

      {!hasTransactions && (
        <p className="ss-comparison-empty">
          No transaction data yet. Upload a bank statement or add transactions
          to see your real comparisons.
        </p>
      )}
    </div>
  );
}