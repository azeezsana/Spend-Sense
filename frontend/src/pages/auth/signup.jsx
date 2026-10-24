import { useState } from "react";
import "../../App.css";
import logo from "../../assets/SET Logo.png";

export default function Signup({ onLogin, onContinue }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();
    const userKey = `spendsense_user_${normalizedEmail}`;

    if (localStorage.getItem(userKey)) {
      setError("An account with this email already exists. Please log in.");
      return;
    }

    const user = {
      name: trimmedName,
      email: normalizedEmail,
      password,
    };

    localStorage.setItem(userKey, JSON.stringify(user));
    localStorage.setItem("spendsense_userName", trimmedName);

    setError("");

    if (typeof onContinue === "function") {
      onContinue(trimmedName);
    }
  };

  return (
    <>
      <img src={logo} alt="SpendSense" className="logo" />

      <main className="page">
        <section className="goal-page auth-page">
          <header className="page-header auth-header">
            <h1>Create Your Account 👋</h1>
            <p>Sign up to get started with SpendSense.</p>
          </header>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="signupEmail">Email ID</label>
              <input
                id="signupEmail"
                type="email"
                placeholder="Enter your email ID"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="signupPassword">Password</label>
              <div className="password-input">
                <input
                  id="signupPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create your password"
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

            <div className="input-group">
              <label htmlFor="signupConfirmPassword">
                Confirm Password
              </label>

              <div className="password-input">
                <input
                  id="signupConfirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />

                <button
                  type="button"
                  className="eye-button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {error && <p role="alert">{error}</p>}

            <button type="submit" className="continue-button">
              Sign up <span>→</span>
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <button
              type="button"
              className="auth-link"
              onClick={onLogin}
            >
              Log in
            </button>
          </p>
        </section>
      </main>
    </>
  );
}