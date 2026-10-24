import { useMemo, useState } from "react";
import "../App.css";

const transactions = [
  { id: 1, name: "Big Basket Grocery", date: "22 Aug 2026", category: "Food", type: "Expense", amount: 1450, icon: "🛒" },
  { id: 2, name: "Infosys Salary", date: "23 Aug 2026", category: "Salary", type: "Income", amount: 32000, icon: "💵" },
  { id: 3, name: "Netflix Subscription", date: "21 Aug 2026", category: "Entertainment", type: "Expense", amount: 649, icon: "🎬" },
  { id: 4, name: "Electricity Bill (BESCOM)", date: "20 Aug 2026", category: "Bills", type: "Expense", amount: 1280, icon: "⚡" },
  { id: 5, name: "Ola to Airport", date: "19 Aug 2026", category: "Transportation", type: "Expense", amount: 480, icon: "🚕" },
  { id: 6, name: "Myntra Haul", date: "18 Aug 2026", category: "Shopping", type: "Expense", amount: 2200, icon: "🛍️" },
  { id: 7, name: "Pharmacy", date: "17 Aug 2026", category: "Health", type: "Expense", amount: 350, icon: "💊" },
  { id: 8, name: "Freelance Payment", date: "16 Aug 2026", category: "Other Income", type: "Income", amount: 5000, icon: "💰" },
];

const categories = [
  "Food",
  "Shopping",
  "Transportation",
  "Bills",
  "Entertainment",
  "Health",
  "Savings",
  "Other",
];

const money = (amount) =>
  `₹${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;

export default function TransactionsPage() {
  const [filter, setFilter] = useState("All");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return transactions.filter((item) => {
      const matchesType = filter === "All" || item.type === filter;
      const matchesCategory =
        !category ||
        (category === "Other"
          ? !categories.slice(0, 7).includes(item.category)
          : item.category === category);
      const matchesSearch = `${item.name} ${item.category}`
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesType && matchesCategory && matchesSearch;
    });
  }, [filter, category, search]);

  const chooseFilter = (value) => {
    setFilter(value);
    setCategory("");
    setSelected(null);
  };

  const chooseCategory = (value) => {
    setCategory(value);
    setShowMore(false);
    setSelected(null);
  };

  return (
    <div className="ss-content ss-transactions-page">
      <div className="ss-transactions-heading">
        <div>
          <h1>{selected ? "Transaction Details" : "Transactions"}</h1>
          <p>{selected ? "Transaction information" : `${filtered.length} ${filtered.length === 1 ? "entry" : "entries"}`}</p>
        </div>

        {!selected && (
          <button
            className="ss-new-transaction"
            type="button"
            onClick={() => alert("Add Transaction form will be connected next.")}
          >
            + New
          </button>
        )}
      </div>

      {selected ? (
        <section className="ss-card ss-transaction-detail">
          <button className="ss-back-button" onClick={() => setSelected(null)}>
            ← Back to transactions
          </button>
          <div className="ss-detail-icon">{selected.icon}</div>
          <h2>{selected.name}</h2>
          <h1 className={selected.type === "Income" ? "ss-amount-income" : "ss-amount-expense"}>
            {selected.type === "Income" ? "+" : "−"}{money(selected.amount)}
          </h1>
          <div className="ss-detail-line"><span>Date</span><strong>{selected.date}</strong></div>
          <div className="ss-detail-line"><span>Type</span><strong>{selected.type}</strong></div>
          <div className="ss-detail-line"><span>Category</span><strong>{selected.category}</strong></div>
        </section>
      ) : (
        <>
          <input
            className="ss-transaction-search"
            type="search"
            placeholder="⌕  Search transactions..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="ss-transaction-filters">
            {["All", "Expense", "Income"].map((item) => (
              <button
                key={item}
                type="button"
                className={filter === item && !category ? "selected" : ""}
                onClick={() => chooseFilter(item)}
              >
                {item}
              </button>
            ))}

            <div className="ss-more-wrapper">
              <button
                type="button"
                className={category ? "selected" : ""}
                onClick={() => setShowMore((value) => !value)}
              >
                {category || "More"}⌄
              </button>

              {showMore && (
                <div className="ss-more-menu">
                  {categories.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => chooseCategory(item)}
                    >
                      {item}
                    </button>
                  ))}
                  <button type="button" onClick={() => chooseCategory("")}>
                    Clear category
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="ss-transaction-list">
            {filtered.map((item) => (
              <button
                type="button"
                className="ss-transaction-row"
                key={item.id}
                onClick={() => setSelected(item)}
              >
                <span className="ss-transaction-icon">{item.icon}</span>
                <span className="ss-transaction-info">
                  <strong>{item.name}</strong>
                  <small>{item.date} · {item.category}</small>
                </span>
                <strong className={item.type === "Income" ? "ss-amount-income" : "ss-amount-expense"}>
                  {item.type === "Income" ? "+" : "−"}{money(item.amount)}
                </strong>
              </button>
            ))}

            {filtered.length === 0 && (
              <p className="ss-no-transactions">
                No transactions to display yet. Add a manual entry or upload a bank statement to start tracking your transactions.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}