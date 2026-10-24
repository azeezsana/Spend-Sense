import { useRef, useState } from "react";
import "../App.css";

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

export default function BankStatement() {
const [activeTab, setActiveTab] = useState("statement");
const [type, setType] = useState("");
const [file, setFile] = useState(null);
const [error, setError] = useState("");
const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
const [category, setCategory] = useState("Food");
const [description, setDescription] = useState("");
const [amount, setAmount] = useState("");
const [savingsAllocation, setSavingsAllocation] = useState("");
const [message, setMessage] = useState("");
const fileInput = useRef(null);

function selectFile(selectedFile) {
setError("");
setMessage("");

if (!selectedFile) return;

if (
  selectedFile.type !== "application/pdf" &&
  !selectedFile.name.toLowerCase().endsWith(".pdf")
) {
  setError("Please select a PDF bank statement.");
  return;
}

if (selectedFile.size > 10 * 1024 * 1024) {
  setError("File size must not exceed 10 MB.");
  return;
}

setFile(selectedFile);

}

function handleSubmit(event) {
event.preventDefault();

if (!type) {
  setMessage("Please select Income or Expense.");
  return;
}

if (type === "Expense" && Number(savingsAllocation) > Number(amount)) {
  setMessage("Savings allocation cannot exceed the expense amount.");
  return;
}

setMessage(
  `${type} entry is ready. Backend connection is required to save it.`
);

}

return (
<div className="ss-content ss-bank-page">
<div className="ss-bank-heading">
<h1>Upload Statement</h1>
<p>Import your bank statement or enter transactions manually</p>
</div>

  <div className="ss-bank-tabs">
    <button
      type="button"
      className={activeTab === "statement" ? "active" : ""}
      onClick={() => {
        setActiveTab("statement");
        setMessage("");
      }}
    >
      <span>⇧</span> Bank Statement
    </button>

    <button
      type="button"
      className={activeTab === "manual" ? "active" : ""}
      onClick={() => {
        setActiveTab("manual");
        setMessage("");
      }}
    >
      <span>✎</span> Manual Entry
    </button>
  </div>

  {activeTab === "statement" ? (
    <div className="ss-upload-section">
      <div
        className="ss-upload-box"
        role="button"
        tabIndex={0}
        onClick={() => fileInput.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            fileInput.current?.click();
          }
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          selectFile(event.dataTransfer.files[0]);
        }}
      >
        <input
          ref={fileInput}
          type="file"
          accept=".pdf,application/pdf"
          hidden
          onChange={(event) => {
            selectFile(event.target.files[0]);
            event.target.value = "";
          }}
        />

        <div className="ss-upload-icon">⇧</div>
        <h3>
          {file ? file.name : "Drag & drop your bank statement"}
        </h3>
        <p>
          {file
            ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
            : "Supports PDF · Max 10 MB"}
        </p>

        <button
          type="button"
          className="ss-browse-button"
          onClick={(event) => {
            event.stopPropagation();
            fileInput.current?.click();
          }}
        >
          Browse Files
        </button>
      </div>

      {error && <p className="ss-bank-error">{error}</p>}

      {file && (
        <div className="ss-selected-file">
          <span>📄 {file.name}</span>
          <button
            type="button"
            onClick={() => {
              setFile(null);
              setError("");
            }}
          >
            Remove
          </button>
        </div>
      )}

      {file && (
        <button
          type="button"
          className="ss-bank-submit"
          onClick={() =>
            setMessage(
              "File selected. Connect the backend to process the statement."
            )
          }
        >
          Upload Statement
        </button>
      )}

      {message && <p className="ss-bank-message">{message}</p>}

      <div className="ss-student-tip">
        <span className="ss-tip-icon">💡</span>
        <div>
          <strong>Student Tip</strong>
          <p>
            Download your bank statement as a PDF from your banking
            app. Most banks offer this under Account Statement or
            Passbook.
          </p>
        </div>
      </div>
    </div>
  ) : (
    <form className="ss-manual-card" onSubmit={handleSubmit}>
      <div className="ss-entry-type">
        <button
          type="button"
          className={`expense ${type === "Expense" ? "active" : ""}`}
          aria-pressed={type === "Expense"}
          onClick={() => {
            setType("Expense");
            setMessage("");
          }}
        >
          ↓ Expense
        </button>

        <button
          type="button"
          className={`income ${type === "Income" ? "active" : ""}`}
          aria-pressed={type === "Income"}
          onClick={() => {
            setType("Income");
            setMessage("");
          }}
        >
          ↑ Income
        </button>
      </div>

      <div className="ss-manual-grid">
        <label>
          Date
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </label>

        <label>
          Category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="ss-full-field">
          Description
          <input
            type="text"
            placeholder="e.g. Netflix, Salary, Grocery..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </label>

        <label>
          Amount (₹)
          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="₹ 0.00"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            required
          />
        </label>

        {type === "Expense" && (
          <label>
            Savings Allocation (₹)
            <input
              type="number"
              min="0"
              step="0.01"
              max={amount || undefined}
              placeholder="₹ 0.00"
              value={savingsAllocation}
              onChange={(event) =>
                setSavingsAllocation(event.target.value)
              }
              required
            />
          </label>
        )}
      </div>

      <button type="submit" className="ss-bank-submit">
        Add Entry
      </button>

      {message && <p className="ss-bank-message">{message}</p>}
    </form>
  )}
</div>

);
}