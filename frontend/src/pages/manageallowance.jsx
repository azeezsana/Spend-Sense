import "../App.css";
import logo from "../assets/SET Logo.png";

export default function ManageAllowance({ onBack }) {
  return (
    <>
      <img src={logo} alt="SpendSense" className="logo" />

      <main className="page">
        <section className="goal-page guidance-detail-page">

          <div className="steps">
            <span className="step active">1</span>
            <span className="step-line active"></span>
            <span className="step active">2</span>
            <span className="step-line active"></span>
            <span className="step active">3</span>
            <span className="step-line"></span>
            <span className="step">4</span>
            <span className="step-text">Step 3 of 4</span>
          </div>

          <header className="page-header">
            <h1>💰 Manage your allowance</h1>

            <p>
              Learn how to make the most of your allowance and build better
              money habits.
            </p>
          </header>

          <div className="guidance-detail-card">
            <h2>Plan before you spend</h2>
            <p>
              Decide how much you want to spend and how much you want to save
              before using your allowance.
            </p>
          </div>

          <div className="guidance-detail-card">
            <h2>Keep some money aside</h2>
            <p>
              Try to save a small portion of your allowance regularly for
              something important or a future goal.
            </p>
          </div>

          <div className="guidance-detail-card">
            <h2>Spend wisely</h2>
            <p>
              Think about whether something is necessary before spending your
              money on it.
            </p>
          </div>

          <button
            type="button"
            className="continue-button"
            onClick={onBack}
          >
            I understand <span>→</span>
          </button>

        </section>
      </main>
    </>
  );
}