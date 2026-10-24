import { useMemo, useState } from "react";
import "../App.css";

const categories = [
  "Food",
  "Shopping",
  "Transport",
  "Bills",
  "Household",
  "Entertainment",
  "Health",
  "Other",
];

const getCategory = (transaction) => {
  const value = String(transaction.category || "").toLowerCase();

  if (["food", "shopping", "transport", "bills", "household", "entertainment", "health"].includes(value)) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  if (["utensils", "groceries", "home", "household items"].includes(value)) {
    return "Household";
  }

  if (["cinema", "movies", "movie"].includes(value)) {
    return "Entertainment";
  }

  if (["transportation", "travel"].includes(value)) {
    return "Transport";
  }

  return "Other";
};

const formatAmount = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

export default function Categorization({ transactions = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const expenses = useMemo(
    () =>
      transactions.filter(
        (transaction) =>
          String(transaction.type || "").toLowerCase() === "expense"
      ),
    [transactions]
  );

  const categoryData = useMemo(
    () =>
      categories.map((category) => {
        const items = expenses.filter(
          (transaction) => getCategory(transaction) === category
        );

        const total = items.reduce(
          (sum, transaction) => sum + Math.abs(Number(transaction.amount) || 0),
          0
        );

        return {
          name: category,
          total,
          count: items.length,
          percentage:
            expenses.reduce(
              (sum, transaction) =>
                sum + Math.abs(Number(transaction.amount) || 0),
              0
            ) > 0
              ? (total /
                  expenses.reduce(
                    (sum, transaction) =>
                      sum + Math.abs(Number(transaction.amount) || 0),
                    0
                  )) *
                100
              : 0,
        };
      }),
    [expenses]
  );

  const totalExpenses = expenses.reduce(
    (sum, transaction) => sum + Math.abs(Number(transaction.amount) || 0),
    0
  );

  const visibleTransactions = expenses.filter(
    (transaction) =>
      selectedCategory === "All" ||
      getCategory(transaction) === selectedCategory
  );

  return (
    <div className="categorization-page">
      <div className="categorization-header">
        <div>
          <h1>Expense Categorization</h1>
          <p>Understand where your money goes.</p>
        </div>
        <div className="categorization-total">
          <span>Total Expenses</span>
          <strong>{formatAmount(totalExpenses)}</strong>
          <small>{expenses.length} transactions</small>
        </div>
      </div>

      <section className="categorization-summary">
        <h2>Category Summary</h2>
        <p className="categorization-subtitle">
          Select a category to view its transactions.
        </p>

        <div className="category-grid">
          {categoryData.map((category) => (
            <button
              type="button"
              key={category.name}
              className={`category-card ${
                selectedCategory === category.name ? "selected" : ""
              }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.name ? "All" : category.name
                )
              }
            >
              <span className="category-card-name">{category.name}</span>
              <strong>{formatAmount(category.total)}</strong>
              <span className="category-card-count">
                {category.count} transactions
              </span>
              <div className="category-progress">
                <div
                  className="category-progress-fill"
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
              <small>{category.percentage.toFixed(1)}% of expenses</small>
            </button>
          ))}
        </div>
      </section>

      <section className="categorization-transactions">
        <div className="categorization-transactions-header">
          <div>
            <h2>Recent Transactions</h2>
            <p className="categorization-subtitle">
              {selectedCategory === "All"
                ? "Your expenses across all categories."
                : `Showing ${selectedCategory} expenses.`}
            </p>
          </div>

          {selectedCategory !== "All" && (
            <button
              type="button"
              className="category-clear-filter"
              onClick={() => setSelectedCategory("All")}
            >
              Clear filter
            </button>
          )}
        </div>

        {visibleTransactions.length === 0 ? (
          <div className="categorization-empty">
            <h3>No expenses to display</h3>
            <p>
              Expenses will appear here after transactions are added or a bank
              statement is processed.
            </p>
          </div>
        ) : (
          <div className="categorization-table-wrapper">
            <table className="categorization-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {[...visibleTransactions]
                  .sort(
                    (a, b) =>
                      new Date(b.date || 0).getTime() -
                      new Date(a.date || 0).getTime()
                  )
                  .map((transaction, index) => (
                    <tr key={transaction.id || `${transaction.date}-${index}`}>
                      <td>{transaction.description || "Expense"}</td>
                      <td>
                        <span className="category-tag">
                          {getCategory(transaction)}
                        </span>
                      </td>
                      <td>{transaction.date || "—"}</td>
                      <td className="categorization-expense-amount">
                        −{formatAmount(transaction.amount)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}