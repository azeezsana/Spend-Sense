import "../App.css";
import logo from "../assets/SET Logo.png";

export default function TrackExpenses({ onBack }) {
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
            <h1>📊 Track your expenses</h1>

            <p>
              Understand where your money goes and build better spending
              habits.
            </p>
          </header>

          <div className="guidance-detail-card">
            <h2>Know where your money goes</h2>
            <p>
              Keep track of your daily spending so you can see what you spend
              the most money on.
            </p>
          </div>

          <div className="guidance-detail-card">
            <h2>Separate needs and wants</h2>
            <p>
              Identify essential expenses and avoid spending too much on
              things you don't really need.
            </p>
          </div>

          <div className="guidance-detail-card">
            <h2>Review your spending</h2>
            <p>
              Check your expenses regularly to understand your habits and make
              better decisions.
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