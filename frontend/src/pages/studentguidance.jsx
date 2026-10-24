import "../App.css";
import logo from "../assets/SET Logo.png";

export default function StudentGuidance({
  onBack,
  onManageAllowance,
  onTrackExpenses,
  onSaveGoals,
  onContinue,
}) {
  return (
    <>
      <img src={logo} alt="SpendSense" className="logo" />

      <main className="page">
        <section className="goal-page student-guidance-page">

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
            <span className="step-line active"></span>
            <span className="step active">3</span>
            <span className="step-line"></span>
            <span className="step">4</span>
            <span className="step-text">Step 3 of 4</span>
          </div>

          <header className="page-header">
            <h1>Smart tips for your journey 🌱</h1>
            <p>
              Simple ways to manage your allowance and build better spending
              habits.
            </p>
          </header>

          <div className="guidance-section">

            <button
              type="button"
              className="guidance-card"
              onClick={onManageAllowance}
            >
              <h2>💰 Manage your allowance</h2>
              <p>
                Plan your spending before using your allowance and keep some
                money aside for your goals.
              </p>
            </button>

            <button
              type="button"
              className="guidance-card"
              onClick={onTrackExpenses}
            >
              <h2>📊 Track your expenses</h2>
              <p>
                Keep an eye on where your money goes so you can understand your
                spending habits.
              </p>
            </button>

            <button
              type="button"
              className="guidance-card"
              onClick={onSaveGoals}
            >
              <h2>🎯 Save for your goals</h2>
              <p>
                Set small savings goals and regularly put aside money to reach
                them.
              </p>
            </button>

            <button type="button" className="skip-guidance">
              Skip guidelines
            </button>

          </div>

          <div className="security-section">

            <div className="security-intro">
              <div className="security-icon">🛡️</div>

              <h2>Your bank statements are safe with us</h2>

              <p>
                Before you upload anything, here's exactly how we handle your
                financial data — no fine print.
              </p>
            </div>

            <div className="security-item">
              <span className="security-item-icon">🔒</span>
              <div>
                <h3>Your data stays private</h3>
                <p>
                  Bank statements are encrypted end-to-end and never shared
                  with third parties, advertisers, or financial institutions.
                </p>
              </div>
            </div>

            <div className="security-item">
              <span className="security-item-icon">🎯</span>
              <div>
                <h3>Used only for expense analysis</h3>
                <p>
                  Statement data is processed solely to categorize your
                  transactions and show spending insights. Nothing else.
                </p>
              </div>
            </div>

            <div className="security-item">
              <span className="security-item-icon">🗑️</span>
              <div>
                <h3>Delete anytime you want</h3>
                <p>
                  Go to Settings → Data &amp; Backup → Manage Uploaded
                  Statements to permanently delete any statement you've
                  uploaded.
                </p>
              </div>
            </div>

            <div className="security-item">
              <span className="security-item-icon">🚫</span>
              <div>
                <h3>No account numbers stored</h3>
                <p>
                  We extract only transaction details — amounts, dates, and
                  descriptions. Account numbers and personal identifiers are
                  never stored.
                </p>
              </div>
            </div>

            <p className="optional-statement">
              Uploading a bank statement is completely optional. You can always
              add transactions manually — the choice is yours.
            </p>

            <button
              type="button"
              className="continue-button"
              onClick={onContinue}
            >
              I understand — Continue <span>→</span>
            </button>

            <p className="terms-text">
              By continuing you agree to our Privacy Policy and Terms of
              Service.
            </p>

          </div>

        </section>
      </main>
    </>
  );
}