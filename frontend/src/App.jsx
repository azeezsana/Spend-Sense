import { useState } from "react";
import "./App.css";

import GoalIntro from "./pages/goalintro.jsx";
import UserType from "./pages/usertype.jsx";
import StudentGuidance from "./pages/studentguidance.jsx";
import BankStatementInfo from "./pages/bankstatementinfo.jsx";
import ManageAllowance from "./pages/manageallowance.jsx";
import TrackExpenses from "./pages/trackexpenses.jsx";
import SaveGoals from "./pages/savegoals.jsx";
import Login from "./pages/auth/login.jsx";
import Signup from "./pages/auth/signup.jsx";
import Passkey from "./pages/passkey.jsx";
import FaceAuthentication from "./pages/faceauthentication.jsx";
import Fingerprint from "./pages/fingerprint.jsx";
import ScreenPassword from "./pages/screenpassword.jsx";
import Dashboard from "./pages/dashboard.jsx";

export default function App() {
  const [page, setPage] = useState("passkey");

  const [userName, setUserName] = useState(
    localStorage.getItem("spendsense_userName") || ""
  );

  const [userType, setUserType] = useState("");

  const [initialGoal, setInitialGoal] = useState(() => {
    try {
      const savedGoal = localStorage.getItem("spendSenseGoal");
      return savedGoal ? JSON.parse(savedGoal) : null;
    } catch {
      return null;
    }
  });

  const [transactions, setTransactions] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("spendsense_transactions") || "[]"
      );
    } catch {
      return [];
    }
  });

  const handleTransactionsChange = (updatedTransactions) => {
    setTransactions(updatedTransactions);

    localStorage.setItem(
      "spendsense_transactions",
      JSON.stringify(updatedTransactions)
    );
  };

  const handleGoalContinue = (goal) => {
    setInitialGoal(goal);

    try {
      localStorage.setItem("spendSenseGoal", JSON.stringify(goal));
    } catch (error) {
      console.error("Unable to save goal:", error);
    }

    setPage("userType");
  };

  const handleLogin = (name) => {
    if (typeof name === "string" && name.trim()) {
      setUserName(name.trim());

      localStorage.setItem("spendsense_userName", name.trim());
    }

    setPage("dashboard");
  };

  const handleSignupComplete = (name) => {
    if (typeof name === "string" && name.trim()) {
      setUserName(name.trim());

      localStorage.setItem("spendsense_userName", name.trim());
    }

    setPage("passkey");
  };

  const handleLogout = () => {
    localStorage.removeItem("spendsense_userName");
    localStorage.removeItem("spendsense_transactions");

    setUserName("");
    setTransactions([]);
    setPage("login");
  };

  switch (page) {
    case "goal":
      return <GoalIntro onContinue={handleGoalContinue} />;

    case "userType":
      return (
        <UserType
          onBack={() => setPage("goal")}
          onContinue={(type) => {
            setUserType(type);

            if (type === "Student") {
              setPage("studentGuidance");
            } else {
              setPage("bankStatementInfo");
            }
          }}
        />
      );

    case "studentGuidance":
      return (
        <StudentGuidance
          onNext={() => setPage("bankStatementInfo")}
          onContinue={() => setPage("bankStatementInfo")}
        />
      );

    case "bankStatementInfo":
      return (
        <BankStatementInfo
          onNext={() => setPage("login")}
          onContinue={() => setPage("login")}
        />
      );

    case "manageAllowance":
      return (
        <ManageAllowance
          onNext={() => setPage("trackExpenses")}
          onContinue={() => setPage("trackExpenses")}
        />
      );

    case "trackExpenses":
      return (
        <TrackExpenses
          onNext={() => setPage("saveGoals")}
          onContinue={() => setPage("saveGoals")}
        />
      );

    case "saveGoals":
      return (
        <SaveGoals
          onNext={() => setPage("login")}
          onContinue={() => setPage("login")}
        />
      );

    case "login":
      return (
        <Login
          onLogin={handleLogin}
          onSuccess={handleLogin}
          onSignup={() => setPage("signup")}
          onNext={() => setPage("dashboard")}
        />
      );

    case "passkey":
  return (
    <Passkey
      userName={userName}
      onDashboard={() => setPage("dashboard")}
      onFaceAuthentication={() => setPage("faceAuthentication")}
      onFingerprint={() => setPage("fingerprint")}
      onScreenPassword={() => setPage("screenPassword")}
    />
  );
    case "passkey":
      return (
        <Passkey
          onNext={() => setPage("dashboard")}
          onSuccess={() => setPage("dashboard")}
          onSkip={() => setPage("dashboard")}
        />
      );

    case "faceAuthentication":
      return (
        <FaceAuthentication
          onNext={() => setPage("fingerprint")}
          onSkip={() => setPage("dashboard")}
        />
      );

    case "fingerprint":
      return (
        <Fingerprint
          onNext={() => setPage("screenPassword")}
          onSkip={() => setPage("dashboard")}
        />
      );

    case "screenPassword":
      return (
        <ScreenPassword
          onNext={() => setPage("dashboard")}
          onSuccess={() => setPage("dashboard")}
        />
      );

    case "dashboard":
    default:
      return (
        <Dashboard
          userName={userName}
          initialGoal={initialGoal}
          transactions={transactions}
          onTransactionsChange={handleTransactionsChange}
          onLogout={handleLogout}
          onGoalChange={setInitialGoal}
          userType={userType}
        />
      );
  }
}