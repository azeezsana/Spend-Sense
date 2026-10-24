import "../App.css";
import logo from "../assets/SET Logo.png";

export default function Passkey({
  userName,
  onDashboard,
  onFaceAuthentication,
  onFingerprint,
  onScreenPassword,
}) {
  return (
    <>
      <img src={logo} alt="SpendSense" className="logo" />

      <main className="page">
        <section className="goal-page passkey-page">

          <div className="passkey-icon">🔐</div>

          <header className="page-header passkey-header">
            <h1>Set up your passkey</h1>

            <p>
              Hey {userName || "there"}! Choose how you'd like to quickly
              unlock SpendSense.
            </p>
          </header>

          <div className="passkey-options">

            <button
              type="button"
              className="passkey-card"
              onClick={onFaceAuthentication}
            >
              <span className="passkey-option-icon">👤</span>

              <div className="passkey-card-content">
                <h2>Face Authentication</h2>
                <p>
                  Unlock instantly with your camera — fast, contactless,
                  and secure.
                </p>
              </div>

              <span className="passkey-radio"></span>
            </button>

            <button
              type="button"
              className="passkey-card"
              onClick={onFingerprint}
            >
              <span className="passkey-option-icon">🫆</span>

              <div className="passkey-card-content">
                <h2>Fingerprint</h2>
                <p>
                  Use your device fingerprint sensor for one-touch login.
                </p>
              </div>

              <span className="passkey-radio"></span>
            </button>

            <button
              type="button"
              className="passkey-card"
              onClick={onScreenPassword}
            >
              <span className="passkey-option-icon">🔢</span>

              <div className="passkey-card-content">
                <h2>Screen Password / PIN</h2>
                <p>
                  Use your device screen lock PIN or password for
                  authentication.
                </p>
              </div>

              <span className="passkey-radio"></span>
            </button>

          </div>

          <button
            type="button"
            className="skip-passkey"
            onClick={onDashboard}
          >
            Skip for now — set up later in Settings
          </button>

        </section>
      </main>
    </>
  );
}