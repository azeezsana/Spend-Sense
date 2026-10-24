import { useState } from "react";
import "../App.css";
import logo from "../assets/SET Logo.png";

const userTypes = [
  {
    icon: "🎓",
    title: "Student",
    description:
      "Managing allowance, tuition, and student life. Build smart money habits from day one.",
    tags: ["Allowance tracking", "Goal savings", "Weekly reviews"],
  },
  {
    icon: "💼",
    title: "Self-Employed",
    description:
      "Freelancer or business owner juggling income streams, expenses, and tax planning.",
    tags: ["Income tracking", "Tax prep", "Cash flow"],
  },
  {
    icon: "💼",
    title: "Working Individual",
    description:
      "Salaried professional managing monthly income, EMIs, investments, and lifestyle goals.",
    tags: ["Salary budgeting", "SIP goals", "Expense control"],
  },
];

export default function UserType({ onBack, onContinue }) {
  const [userType, setUserType] = useState("");

  return (
    <>
      <img src={logo} alt="SpendSense" className="logo" />

      <main className="page">
        <section className="goal-page user-type-page">

          <button
            type="button"
            className="back-button"
            onClick={onBack}
          >
            ←
          </button>

          <div className="steps">
            <span className="step active">1</span>
            <span className="step-line active"></span>
            <span className="step active">2</span>
            <span className="step-line"></span>
            <span className="step">3</span>
            <span className="step-line"></span>
            <span className="step">4</span>
            <span className="step-text">Step 2 of 4</span>
          </div>

          <header className="page-header">
            <h1>Who are you tracking for?</h1>
            <p>
              Your profile shapes tips, insights, and financial guidance.
            </p>
          </header>

          <div className="user-type-list">
            {userTypes.map((type) => (
              <button
                key={type.title}
                type="button"
                className={`user-type-card ${
                  userType === type.title ? "selected" : ""
                }`}
                onClick={() => setUserType(type.title)}
                
                   >
                <span className="user-type-icon">{type.icon}</span>

                <div className="user-type-content">
                  <h2>{type.title}</h2>

                  <p>{type.description}</p>

                  <div className="user-type-tags">
                    {type.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                {userType === type.title && (
                  <span className="selected-check">✓</span>
                )}
              </button>
            ))}
          </div>

          <button
            className="continue-button"
            type="button"
            disabled={!userType}
            onClick={() => onContinue(userType)}
          >
            Continue <span>→</span>
          </button>

        </section>
      </main>
    </>
  );
}