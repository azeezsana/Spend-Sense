import { useState } from "react";
import "../App.css";

export default function Goals({ initialGoal }) {
  const [goals, setGoals] = useState(() =>
    initialGoal ? [{ id: "initial-goal", ...initialGoal }] : []
  );
  const [showForm, setShowForm] = useState(false);
  const [depositGoal, setDepositGoal] = useState(null);
  const [editGoal, setEditGoal] = useState(null);
  const [menuGoal, setMenuGoal] = useState(null);

  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [savedAmount, setSavedAmount] = useState("0");
  const [targetDate, setTargetDate] = useState("");
  const [depositAmount, setDepositAmount] = useState("");

  const money = (amount) =>
    "₹" +
    Number(amount).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });

  const getProgress = (goal) =>
    goal.target > 0
      ? Math.min((goal.saved / goal.target) * 100, 100)
      : 0;

  const getDaysLeft = (date) => {
    if (!date) return null;

    const target = new Date(`${date}T00:00:00`);

    if (Number.isNaN(target.getTime())) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return Math.ceil((target - today) / 86400000);
  };

  function resetForm() {
    setGoalName("");
    setTargetAmount("");
    setSavedAmount("0");
    setTargetDate("");
    setShowForm(false);
    setEditGoal(null);
  }

  function createGoal(event) {
    event.preventDefault();
    const target = Number(targetAmount);
    const saved = Number(savedAmount);

    if (
      !goalName.trim() ||
      target <= 0 ||
      saved < 0 ||
      saved > target ||
      !targetDate
    ) {
      return;
    }

    setGoals((current) => [
      ...current,
      {
        id: Date.now(),
        name: goalName.trim(),
        target,
        saved,
        date: targetDate,
      },
    ]);
    resetForm();
  }

  function startEditing(goal) {
    setEditGoal(goal);
    setGoalName(goal.name);
    setTargetAmount(String(goal.target));
    setSavedAmount(String(goal.saved));
    setTargetDate(goal.date || "");
    setShowForm(false);
    setDepositGoal(null);
    setMenuGoal(null);
  }

  function updateGoal(event) {
    event.preventDefault();
    const target = Number(targetAmount);

    if (
      !editGoal ||
      !goalName.trim() ||
      target <= 0 ||
      target < editGoal.saved ||
      !targetDate
    ) {
      return;
    }

    setGoals((current) =>
      current.map((goal) =>
        goal.id === editGoal.id
          ? {
              ...goal,
              name: goalName.trim(),
              target,
              date: targetDate,
            }
          : goal
      )
    );
    resetForm();
  }

  function makeDeposit(event) {
    event.preventDefault();
    const amount = Number(depositAmount);

    if (!depositGoal || amount <= 0) return;

    setGoals((current) =>
      current.map((goal) =>
        goal.id === depositGoal.id
          ? { ...goal, saved: goal.saved + amount }
          : goal
      )
    );
    setDepositGoal(null);
    setDepositAmount("");
  }

  function deleteGoal(goal) {
    const confirmed = window.confirm(
      "Are you sure you want to delete " + goal.name + "?"
    );

    if (!confirmed) return;

    setGoals((current) =>
      current.filter((item) => item.id !== goal.id)
    );

    if (editGoal?.id === goal.id) resetForm();
    if (depositGoal?.id === goal.id) setDepositGoal(null);
    setMenuGoal(null);
  }

  const activeGoals = goals.filter(
    (goal) => goal.saved < goal.target
  ).length;

  return (
    <div className="ss-content ss-goals-page">
      <div className="ss-goals-heading">
        <div>
          <h1>Savings Goals</h1>
          <p>
            {activeGoals} active {activeGoals === 1 ? "goal" : "goals"}
          </p>
        </div>

        <button
          type="button"
          className="ss-new-goal"
          onClick={() => {
            resetForm();
            setDepositGoal(null);
            setMenuGoal(null);
            setShowForm(true);
          }}
        >
          + New Goal
        </button>
      </div>

      {(showForm || editGoal) && (
        <form
          className="ss-goal-form"
          onSubmit={editGoal ? updateGoal : createGoal}
        >
          <h2>{editGoal ? "Edit Savings Goal" : "Create New Goal"}</h2>

          <label>
            Goal Name
            <input
              value={goalName}
              onChange={(event) => setGoalName(event.target.value)}
              placeholder="e.g. Education"
              required
            />
          </label>

          <label>
            Target Amount (₹)
            <input
              type="number"
              min={editGoal ? Math.max(1, editGoal.saved) : 1}
              step="0.01"
              value={targetAmount}
              onChange={(event) => setTargetAmount(event.target.value)}
              required
            />
          </label>

          {!editGoal && (
            <label>
              Amount Already Saved (₹)
              <input
                type="number"
                min="0"
                step="0.01"
                value={savedAmount}
                onChange={(event) => setSavedAmount(event.target.value)}
                required
              />
            </label>
          )}

          <label>
            Target Date
            <input
              type="date"
              value={targetDate}
              onChange={(event) => setTargetDate(event.target.value)}
              required
            />
          </label>

          {((editGoal && Number(targetAmount) < editGoal.saved) ||
            (!editGoal &&
              targetAmount !== "" &&
              Number(savedAmount) > Number(targetAmount))) && (
            <p className="ss-goal-error">
              Target amount cannot be less than the amount already saved.
            </p>
          )}

          <div className="ss-goal-form-actions">
            <button
              type="button"
              className="ss-goal-cancel"
              onClick={resetForm}
            >
              Cancel
            </button>
            <button type="submit" className="ss-new-goal">
              {editGoal ? "Save Changes" : "Create Goal"}
            </button>
          </div>
        </form>
      )}

      {depositGoal && (
        <form className="ss-goal-form" onSubmit={makeDeposit}>
          <h2>Deposit into {depositGoal.name}</h2>
          <p className="ss-goal-form-note">
            Current saved amount: {money(depositGoal.saved)}
          </p>

          <label>
            Deposit Amount (₹)
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={depositAmount}
              onChange={(event) => setDepositAmount(event.target.value)}
              required
            />
          </label>

          <div className="ss-goal-form-actions">
            <button
              type="button"
              className="ss-goal-cancel"
              onClick={() => {
                setDepositGoal(null);
                setDepositAmount("");
              }}
            >
              Cancel
            </button>
            <button type="submit" className="ss-new-goal">
              Deposit
            </button>
          </div>
        </form>
      )}

      {goals.length === 0 ? (
        <div className="ss-goals-empty">
          <div className="ss-goals-empty-icon">◎</div>
          <h2>No savings goals yet</h2>
          <p>Create your first goal to start tracking your savings.</p>
          <button
            type="button"
            className="ss-new-goal"
            onClick={() => setShowForm(true)}
          >
            + Create Your First Goal
          </button>
        </div>
      ) : (
        <div className="ss-goals-grid">
          {goals.map((goal) => {
            const percentage = getProgress(goal);
            const days = getDaysLeft(goal.date);
            const completed = goal.saved >= goal.target;

            return (
              <article className="ss-goal-card" key={goal.id}>
                <div className="ss-goal-card-top">
                  <div className="ss-goal-symbol">◎</div>
                  <span
                    className={
                      completed
                        ? "ss-goal-status completed"
                        : "ss-goal-status"
                    }
                  >
                    {completed ? "Completed" : "In Progress"}
                  </span>
                </div>

                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "4px",
                    marginBottom: "8px",
                  }}
                >
                  <button
                    type="button"
                    aria-label={`Options for ${goal.name}`}
                    aria-expanded={menuGoal?.id === goal.id}
                    onClick={() =>
                      setMenuGoal((current) =>
                        current?.id === goal.id ? null : goal
                      )
                    }
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "40px",
                      height: "36px",
                      border: "1px solid #d8c9f3",
                      borderRadius: "8px",
                      background: "#f5f0ff",
                      color: "#5b3b91",
                      fontSize: "24px",
                      cursor: "pointer",
                      lineHeight: 1,
                    }}
                  >
                    ⋮
                  </button>

                  {menuGoal?.id === goal.id && (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "40px",
                        zIndex: 100,
                        minWidth: "150px",
                        padding: "6px",
                        background: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => startEditing(goal)}
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "10px",
                          textAlign: "left",
                          border: "none",
                          borderRadius: "5px",
                          background: "#ffffff",
                          color: "#333333",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteGoal(goal)}
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "10px",
                          textAlign: "left",
                          border: "none",
                          borderRadius: "5px",
                          background: "#ffffff",
                          color: "#dc2626",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                <h2>{goal.name}</h2>

                <p className="ss-goal-deadline">
                  <span>◷</span>{" "}
                  {completed
                    ? "Goal achieved"
                    : days === null
                      ? "Set a target date"
                      : days < 0
                        ? `${Math.abs(days)} days overdue`
                        : days === 0
                          ? "Due today"
                          : `Target in ${days} days`}
                </p>

                <div className="ss-goal-progress-label">
                  <span>Progress</span>
                  <strong>{percentage.toFixed(0)}%</strong>
                </div>

                <div
                  className="ss-goal-progress-track"
                  role="progressbar"
                  aria-valuenow={Math.round(percentage)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="ss-goal-progress-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="ss-goal-amounts">
                  <div>
                    <span>Saved</span>
                    <strong>{money(goal.saved)}</strong>
                  </div>
                  <div>
                    <span>Target</span>
                    <strong>{money(goal.target)}</strong>
                  </div>
                </div>

                <div className="ss-goal-remaining">
                  <span>Remaining</span>
                  <strong>
                    {money(Math.max(goal.target - goal.saved, 0))}
                  </strong>
                </div>

                {!completed && (
                  <button
                    type="button"
                    className="ss-goal-deposit"
                    onClick={() => {
                      setDepositGoal(goal);
                      setDepositAmount("");
                      setShowForm(false);
                      setEditGoal(null);
                      setMenuGoal(null);
                    }}
                  >
                    + Deposit
                  </button>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}