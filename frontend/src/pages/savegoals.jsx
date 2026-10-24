import "../App.css";
import logo from "../assets/SET Logo.png";

export default function SaveGoals({ onBack }) {
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
            <h1>🎯 Save for your goals</h1>

            <p>
              Turn the things you want into achievable savings goals.
            </p>
          </header>

          <div className="guidance-detail-card">
            <h2>Set a clear goal</h2>
            <p>
              Decide what you want to save for and set a realistic amount for
              your goal.
            </p>
          </div>

          <div className="guidance-detail-card">
            <h2>Save regularly</h2>
            <p>
              Put aside a small amount regularly instead of waiting until you
              have a lot of money to save.
            </p>
          </div>

          <div className="guidance-detail-card">
            <h2>Watch your progress</h2>
            <p>
              Keep checking your progress and celebrate each step toward
              reaching your goal.
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