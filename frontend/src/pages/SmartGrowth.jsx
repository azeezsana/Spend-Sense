import { useState } from "react";
import "../App.css";

const growthStages = [
  { name: "Seed", icon: "🌱", amount: 0 },
  { name: "Sapling", icon: "🌿", amount: 5000 },
  { name: "Tree", icon: "🌳", amount: 25000 },
  { name: "Pine", icon: "🌲", amount: 50000 },
  { name: "Palm", icon: "🌴", amount: 75000 },
  { name: "Blooming", icon: "🌸", amount: 100000 },
];

export default function SmartGrowth({ savings = 38000, onOpenSIP }) {
  const [activeTab, setActiveTab] = useState("tree");

  const totalSavings = Math.max(0, Number(savings) || 0);

  const currentStage = growthStages.reduce(
    (current, stage) =>
      totalSavings >= stage.amount ? stage : current,
    growthStages[0]
  );

  const nextStage = growthStages.find(
    (stage) => stage.amount > totalSavings
  );

  const progress = nextStage
    ? Math.min(
        100,
        ((totalSavings - currentStage.amount) /
          (nextStage.amount - currentStage.amount)) *
          100
      )
    : 100;

  const money = (amount) =>
    `₹${Number(amount).toLocaleString("en-IN")}`;

  const openSIP = () => {
    if (onOpenSIP) {
      onOpenSIP();
    } else {
      setActiveTab("sip");
    }
  };

  return (
    <div className="smart-growth-page">
      <header className="smart-growth-header">
        <div>
          <h1>Smart Growth</h1>
          <p>
            Grow your savings — track your financial tree and plan SIPs.
          </p>
        </div>
      </header>

      <div className="smart-growth-tabs">
        <button
          type="button"
          className={activeTab === "tree" ? "active" : ""}
          onClick={() => setActiveTab("tree")}
        >
          🌳 Financial Tree
        </button>

        <button
          type="button"
          className={activeTab === "sip" ? "active" : ""}
          onClick={openSIP}
        >
          📈 SIP Planner
        </button>
      </div>

      {activeTab === "tree" ? (
        <>
          <section className="financial-tree-hero">
            <div className="financial-tree-emoji">
              {currentStage.icon}
            </div>
            <h2>{currentStage.name}</h2>
            <p>
              Total savings: <strong>{money(totalSavings)}</strong>
            </p>

            <div className="tree-progress-track">
              <div
                className="tree-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="tree-progress-label">
              {nextStage
                ? `${money(nextStage.amount - totalSavings)} more to unlock ${nextStage.name}`
                : "Congratulations! You've reached the final growth stage."}
            </p>
          </section>

          <section className="growth-stages-section">
            <h3>Growth Stages</h3>

            <div className="growth-stages-list">
              {growthStages.map((stage) => {
                const unlocked = totalSavings >= stage.amount;
                const selected = currentStage.name === stage.name;

                return (
                  <button
                    type="button"
                    key={stage.name}
                    className={`growth-stage ${
                      selected ? "selected" : ""
                    } ${unlocked ? "unlocked" : "locked"}`}
                    onClick={() => {
                      if (unlocked) {
                        setActiveTab("tree");
                      }
                    }}
                  >
                    <span className="growth-stage-icon">
                      {stage.icon}
                    </span>
                    <strong>{stage.name}</strong>
                    <small>
                      {stage.amount === 0
                        ? "Starting stage"
                        : money(stage.amount)}
                    </small>
                    <span className="growth-stage-status">
                      {unlocked ? "Unlocked" : "🔒 Locked"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="growth-suggestions">
            <article className="growth-suggestion-card">
              <span className="growth-suggestion-icon">⚡</span>
              <p>
                Save consistently to unlock your next financial growth stage.
              </p>
            </article>

            <article className="growth-suggestion-card">
              <span className="growth-suggestion-icon">🥗</span>
              <p>
                Review your food spending and find opportunities to save more.
              </p>
            </article>

            <article className="growth-suggestion-card">
              <span className="growth-suggestion-icon">📈</span>
              <p>Start an SIP plan to plan your long-term financial goals.</p>
              <button type="button" onClick={openSIP}>
                Open SIP Planner
              </button>
            </article>
          </section>
        </>
      ) : (
        <section className="sip-planner-placeholder">
          <h2>SIP Planner</h2>
          <p>
            Plan monthly contributions and view your projected growth.
          </p>
          <button
            type="button"
            onClick={() => setActiveTab("tree")}
          >
            Back to Financial Tree
          </button>
          <p className="sip-planner-next-step">
            We'll build the SIP Planner page next.
          </p>
        </section>
      )}
    </div>
  );
}