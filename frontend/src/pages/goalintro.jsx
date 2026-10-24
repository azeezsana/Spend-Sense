import { useState } from "react";
import "../App.css";
import logo from "../assets/SET Logo.png";

const quickPicks = [
  ["💻", "New Laptop"],
  ["✈️", "Vacation"],
  ["🛡️", "Emergency Fund"],
  ["🛵", "Bike"],
  ["💍", "Wedding"],
  ["🎓", "Education"],
  ["🏠", "Home"],
  ["🚗", "Car"],
];

export default function Goalintro({ onContinue }) {
  const [goalName, setGoalName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const target = Number(amount);

    if (!goalName.trim() || target <= 0 || !date) {
      return;
    }

    const selectedGoal = {
      name: goalName.trim(),
      target,
      saved: 0,
      date,
    };

    try {
      localStorage.setItem(
        "spendSenseGoal",
        JSON.stringify(selectedGoal)
      );
    } catch (error) {
      console.error("Unable to save goal:", error);
    }

    if (typeof onContinue === "function") {
      onContinue(selectedGoal);
    } else {
      window.location.href = "/dashboard";
    }
  }

  return (
    <>
      <img src={logo} alt="SpendSense" className="logo" />

      <main className="page">
        <section className="goal-page">
          <header className="page-header">
            <h1>
              Got a dream? <span>Let&apos;s turn it into a goal.</span>
            </h1>

            <p>
              Tell us what you&apos;re saving for and we&apos;ll help you get
              there.
            </p>
          </header>

          <form className="goal-card" onSubmit={handleSubmit}>
            <div className="progress-line" />

            <div className="quick-pick">
              <h2>Quick pick</h2>

              <div className="pick-list">
                {quickPicks.map(([emoji, label]) => (
                  <button
                    className={`pick-chip ${
                      goalName === label ? "selected" : ""
                    }`}
                    type="button"
                    key={label}
                    onClick={() => setGoalName(label)}
                  >
                    <span aria-hidden="true">{emoji}</span> {label}
                  </button>
                ))}
              </div>
            </div>

            <label className="field">
              <span>Goal Name</span>

              <div className={`input-wrap ${goalName ? "completed" : ""}`}>
                <span className="input-icon" aria-hidden="true">
                  ☆
                </span>

                <input
                  type="text"
                  placeholder="example: New car, Home"
                  value={goalName}
                  onChange={(event) => setGoalName(event.target.value)}
                  required
                />
              </div>
            </label>

            <label className="field">
              <span>Target Amount</span>

              <div className={`input-wrap ${amount ? "completed" : ""}`}>
                <span className="input-icon currency" aria-hidden="true">
                  ₹
                </span>

                <input
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="0"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  required
                />
              </div>
            </label>

            <label className="field">
              <span>Target Date</span>

              <div className={`input-wrap ${date ? "completed" : ""}`}>
                <span className="input-icon calendar" aria-hidden="true">
                  ▢
                </span>

                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                />
              </div>
            </label>

            {goalName.trim() && Number(amount) > 0 && date && (
              <button className="continue-button" type="submit">
                Continue to SpendSense <span>→</span>
              </button>
            )}
          </form>
        </section>
      </main>
    </>
  );
}