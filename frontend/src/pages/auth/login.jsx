import { useState } from "react";
import "../../App.css";
import logo from "../../assets/SET Logo.png";

export default function Login({ onSignup, onContinue, onLogin }) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [error, setError] = useState("");

const handleSubmit = (event) => {
event.preventDefault();

const savedUser = localStorage.getItem(
  `spendsense_user_${email.trim().toLowerCase()}`
);

if (!savedUser) {
  setError("No account found with this email. Please sign up.");
  return;
}

const user = JSON.parse(savedUser);

if (user.password !== password) {
  setError("Incorrect password. Please try again.");
  return;
}

setError("");
if (onContinue) {
  onContinue(user.name);
} else if (onLogin) {
  onLogin(user.name);
}

};

return (
<>
<img src={logo} alt="SpendSense" className="logo" />

  <main className="page">
    <section className="goal-page auth-page">
      <div className="steps">
        <span className="step active">1</span>
        <span className="step-line active"></span>
        <span className="step active">2</span>
        <span className="step-line active"></span>
        <span className="step active">3</span>
        <span className="step-line active"></span>
        <span className="step active">4</span>
        <span className="step-text">Step 4 of 4</span>
      </div>

      <header className="page-header auth-header">
        <h1>Welcome 👋</h1>
        <p>Log in to continue with SpendSense.</p>
      </header>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email ID</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email ID"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button
              type="button"
              className="eye-button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit" className="continue-button">
          Log in <span>→</span>
        </button>
      </form>

      <p className="auth-switch">
        Don't have an account?{" "}
        <button
          type="button"
          className="auth-link"
          onClick={onSignup}
        >
          Sign up
        </button>
      </p>
    </section>
  </main>
</>

);
}