import { useState } from "react";
import "../App.css";
import logo from "../assets/SET Logo.png";

export default function FaceAuthentication({ onContinue }) {
  const [status, setStatus] = useState("idle");

  async function authenticateFace() {
    setStatus("checking");

    try {
      if (!window.PublicKeyCredential || !navigator.credentials?.get) {
        setStatus("unsupported");
        return;
      }

      setStatus("setup");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  const messages = {
    idle: {
      title: "Ready to verify",
      text: "Your device may use face recognition, fingerprint, or its screen lock.",
    },
    checking: {
      title: "Checking device...",
      text: "Checking whether your browser supports device authentication.",
    },
    unsupported: {
      title: "Not supported",
      text: "This browser does not support WebAuthn authentication.",
    },
    setup: {
      title: "Setup required",
      text: "Real authentication requires passkey registration and backend verification. This will be connected when the backend is ready.",
    },
    error: {
      title: "Something went wrong",
      text: "Please try again.",
    },
  };

  return (
    <>
      <img src={logo} alt="SpendSense" className="logo" />

      <main className="page">
        <section className="goal-page face-auth-page">
          <div className="auth-method-icon">👤</div>

          <header className="page-header auth-method-header">
            <h1>Face Authentication</h1>
            <p>
              Verify your identity using your device's authentication system.
            </p>
          </header>

          <div className="face-preview">
            <div className="face-frame">
              <span>👤</span>
              {status === "checking" && <div className="scan-line" />}
            </div>
          </div>

          <div className="auth-method-info">
            <h2>{messages[status].title}</h2>
            <p>{messages[status].text}</p>
          </div>

          <button
            type="button"
            className="continue-button"
            onClick={authenticateFace}
            disabled={status === "checking"}
          >
            Check device support →
          </button>

          <button
            type="button"
            className="skip-method"
            onClick={onContinue}
          >
            Back to options
          </button>
        </section>
      </main>
    </>
  );
}