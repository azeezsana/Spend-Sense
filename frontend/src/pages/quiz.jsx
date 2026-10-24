import { useEffect, useState } from "react";
import "../App.css";

const QUIZ_STORAGE_KEY = "spendsense_quiz_history_v1";

const QUESTION_BANK = {
  Easy: [
    {
      question: "You earn ₹5,000 and spend ₹1,800. How much remains?",
      options: ["₹2,200", "₹3,200", "₹3,800", "₹6,800"],
      answer: 1,
      explanation: "₹5,000 − ₹1,800 = ₹3,200."
    },
    {
      question: "Which is an example of income?",
      options: ["Electricity bill", "Grocery purchase", "Salary received", "Bus ticket"],
      answer: 2,
      explanation: "A salary is money received in exchange for work."
    },
    {
      question: "What is a budget mainly used for?",
      options: ["Planning income and expenses", "Increasing every bill", "Avoiding all savings", "Borrowing without limits"],
      answer: 0,
      explanation: "A budget helps plan how money will be earned, spent and saved."
    },
    {
      question: "You save ₹500 each month for 4 months. How much do you save?",
      options: ["₹1,000", "₹1,500", "₹2,000", "₹2,500"],
      answer: 2,
      explanation: "₹500 × 4 = ₹2,000."
    },
    {
      question: "Which purchase is usually a basic need?",
      options: ["Designer watch", "Essential groceries", "Luxury handbag", "New gaming console"],
      answer: 1,
      explanation: "Food and essential groceries meet a basic need."
    }
  ],
  Medium: [
    {
      question: "Your monthly income is ₹25,000 and expenses are ₹18,500. What is your savings amount?",
      options: ["₹5,500", "₹6,500", "₹7,500", "₹43,500"],
      answer: 1,
      explanation: "₹25,000 − ₹18,500 = ₹6,500."
    },
    {
      question: "An item costs ₹2,000 and has a 10% discount. What is its discounted price?",
      options: ["₹1,600", "₹1,700", "₹1,800", "₹1,900"],
      answer: 2,
      explanation: "10% of ₹2,000 is ₹200. The price is ₹1,800."
    },
    {
      question: "What is the main benefit of an emergency fund?",
      options: ["Covering unexpected expenses", "Guaranteeing high investment returns", "Removing every financial risk", "Increasing regular spending"],
      answer: 0,
      explanation: "An emergency fund helps cover unexpected costs."
    },
    {
      question: "You spend ₹3,000 from a ₹12,000 monthly budget. What percentage have you spent?",
      options: ["20%", "25%", "30%", "40%"],
      answer: 1,
      explanation: "₹3,000 ÷ ₹12,000 × 100 = 25%."
    },
    {
      question: "Which habit helps reduce unnecessary spending?",
      options: ["Ignoring account balances", "Buying everything on impulse", "Tracking purchases regularly", "Avoiding financial planning"],
      answer: 2,
      explanation: "Tracking purchases makes spending patterns easier to identify."
    }
  ],
  Hard: [
    {
      question: "You invest ₹10,000 at a simple annual interest rate of 5%. How much interest is earned in 2 years?",
      options: ["₹500", "₹1,000", "₹1,050", "₹2,000"],
      answer: 1,
      explanation: "Simple interest = ₹10,000 × 5% × 2 = ₹1,000."
    },
    {
      question: "Your monthly income is ₹40,000. Expenses are ₹28,000. What percentage of income is saved?",
      options: ["20%", "25%", "30%", "35%"],
      answer: 2,
      explanation: "Savings are ₹12,000. ₹12,000 ÷ ₹40,000 × 100 = 30%."
    },
    {
      question: "Which statement best describes diversification?",
      options: ["Putting all money into one asset", "Spreading investments across different assets", "Investing without considering risk", "Keeping every investment in one company"],
      answer: 1,
      explanation: "Diversification spreads exposure across investments to reduce concentration risk."
    },
    {
      question: "An investment rises from ₹8,000 to ₹9,200. What is the percentage return?",
      options: ["10%", "12%", "15%", "20%"],
      answer: 2,
      explanation: "The gain is ₹1,200. ₹1,200 ÷ ₹8,000 × 100 = 15%."
    },
    {
      question: "What should you compare when evaluating a loan?",
      options: ["Only the advertised monthly payment", "Interest rate, fees and total repayment", "Only the lender's logo", "Only the loan duration"],
      answer: 1,
      explanation: "Rates, fees and total repayment together reveal the overall borrowing cost."
    }
  ],
  "Very Hard": [
    {
      question: "An investment of ₹20,000 earns a 10% return in one year. If the entire amount is reinvested, what is the total after the second year at the same annual return?",
      options: ["₹22,000", "₹24,000", "₹24,200", "₹25,000"],
      answer: 2,
      explanation: "₹20,000 × 1.10 × 1.10 = ₹24,200."
    },
    {
      question: "Your portfolio has ₹30,000 in Fund A and ₹70,000 in Fund B. What percentage is invested in Fund B?",
      options: ["30%", "50%", "60%", "70%"],
      answer: 3,
      explanation: "₹70,000 ÷ ₹100,000 × 100 = 70%."
    },
    {
      question: "Inflation is 6% and your savings account earns 4% interest over the same period. Ignoring taxes, what is approximately the real return?",
      options: ["2% positive", "10% positive", "2% negative", "6% positive"],
      answer: 2,
      explanation: "The approximate real return is 4% − 6% = −2%."
    },
    {
      question: "A loan charges 12% nominal annual interest compounded monthly. Which monthly rate is used for the calculation?",
      options: ["0.5%", "1%", "6%", "12%"],
      answer: 1,
      explanation: "The nominal annual rate divided by 12 is 1% per month."
    },
    {
      question: "You have ₹50,000 in savings and an unexpected bill of ₹12,500. What percentage of your savings does the bill use?",
      options: ["20%", "25%", "30%", "40%"],
      answer: 1,
      explanation: "₹12,500 ÷ ₹50,000 × 100 = 25%."
    }
  ]
};

const money = (amount) =>
  `₹${Number(amount).toLocaleString("en-IN")}`;

function readHistory() {
  try {
    const saved = localStorage.getItem(QUIZ_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function QuizPage() {
  const [history, setHistory] = useState(readHistory);
  const [difficulty, setDifficulty] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [review, setReview] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Could not save quiz history:", error);
    }
  }, [history]);

  const startQuiz = (level) => {
    const bank = QUESTION_BANK[level];
    const shuffled = [...bank]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(5, bank.length));

    setDifficulty(level);
    setQuestions(shuffled);
    setAnswers({});
    setQuestionIndex(0);
    setFinished(false);
    setReview(false);
  };

  const currentQuestion = questions[questionIndex];

  const score = questions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.answer ? 1 : 0),
    0
  );

  const finishQuiz = () => {
    const finalScore = questions.reduce(
      (total, question, index) =>
        total + (answers[index] === question.answer ? 1 : 0),
      0
    );

    const attempt = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: new Date().toISOString(),
      difficulty,
      score: finalScore,
      total: questions.length,
      percentage: Math.round((finalScore / questions.length) * 100)
    };

    setHistory((previous) => [attempt, ...previous].slice(0, 100));
    setFinished(true);
  };

  const resetQuiz = () => {
    setDifficulty(null);
    setQuestions([]);
    setAnswers({});
    setQuestionIndex(0);
    setFinished(false);
    setReview(false);
  };

  const totalAttempts = history.length;
  const totalCorrect = history.reduce((sum, item) => sum + item.score, 0);
  const totalQuestions = history.reduce((sum, item) => sum + item.total, 0);
  const overallAccuracy = totalQuestions
    ? Math.round((totalCorrect / totalQuestions) * 100)
    : 0;

  const difficultyDetails = [
    {
      name: "Easy",
      subtitle: "Fundamentals & basics",
      icon: "🌱",
      color: "easy",
      stars: "●",
      reward: "+10 pts"
    },
    {
      name: "Medium",
      subtitle: "Intermediate concepts",
      icon: "🧠",
      color: "medium",
      stars: "●●",
      reward: "+20 pts"
    },
    {
      name: "Hard",
      subtitle: "Advanced finance",
      icon: "💪",
      color: "hard",
      stars: "●●●",
      reward: "+30 pts"
    },
    {
      name: "Very Hard",
      subtitle: "Expert level only",
      icon: "🧠",
      color: "very-hard",
      stars: "●●●●",
      reward: "+40 pts"
    }
  ];

  return (
    <div className="ss-content ss-quiz-page">
      <div className="ss-quiz-heading">
        <div>
          <h1>Quiz</h1>
          <p>Test your financial knowledge and track your progress.</p>
        </div>
        {difficulty && (
          <button className="ss-quiz-secondary" onClick={resetQuiz}>
            Back to difficulty
          </button>
        )}
      </div>

      {!difficulty && (
        <>
          <section className="ss-quiz-difficulty-grid">
            {difficultyDetails.map((item) => (
              <button
                type="button"
                key={item.name}
                className={`ss-quiz-difficulty ${item.color}`}
                onClick={() => startQuiz(item.name)}
              >
                <span className="ss-quiz-level-icon">{item.icon}</span>
                <strong>{item.name}</strong>
                <span className="ss-quiz-level-subtitle">{item.subtitle}</span>
                <div className="ss-quiz-level-bottom">
                  <span className="ss-quiz-stars">{item.stars}</span>
                  <span className="ss-quiz-reward">{item.reward}</span>
                </div>
              </button>
            ))}
          </section>

          <section className="ss-card ss-quiz-stats">
            <h2>Your Quiz Statistics</h2>
            <div className="ss-quiz-stat-grid">
              <div>
                <span>Attempts</span>
                <strong>{totalAttempts}</strong>
              </div>
              <div>
                <span>Questions answered</span>
                <strong>{totalQuestions}</strong>
              </div>
              <div>
                <span>Overall accuracy</span>
                <strong>{overallAccuracy}%</strong>
              </div>
              <div>
                <span>Total correct</span>
                <strong>{totalCorrect}</strong>
              </div>
            </div>
          </section>

          <section className="ss-card ss-quiz-history">
            <div className="ss-quiz-section-heading">
              <h2>Score History</h2>
              <span>{totalAttempts} attempts</span>
            </div>

            {history.length === 0 ? (
              <p className="ss-quiz-empty">
                No quiz attempts yet. Choose a difficulty above to begin.
              </p>
            ) : (
              <>
                <div className="ss-quiz-activity-bars" aria-label="Recent scores">
                  {history.slice(0, 12).reverse().map((item) => (
                    <div
                      key={item.id}
                      className={`ss-quiz-activity-bar ${
                        item.percentage >= 80
                          ? "good"
                          : item.percentage >= 50
                            ? "average"
                            : "low"
                      }`}
                      style={{ height: `${Math.max(8, item.percentage)}%` }}
                      title={`${item.difficulty}: ${item.score}/${item.total}`}
                    />
                  ))}
                </div>

                <div className="ss-quiz-table-wrap">
                  <table className="ss-quiz-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Difficulty</th>
                        <th>Score</th>
                        <th>Accuracy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.slice(0, 10).map((item) => (
                        <tr key={item.id}>
                          <td>{new Date(item.date).toLocaleDateString("en-IN")}</td>
                          <td>
                            <span className={`ss-quiz-badge ${item.difficulty.toLowerCase().replace(" ", "-")}`}>
                              {item.difficulty}
                            </span>
                          </td>
                          <td>{item.score}/{item.total}</td>
                          <td>{item.percentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </section>
        </>
      )}

      {difficulty && !finished && currentQuestion && (
        <section className="ss-card ss-quiz-question-card">
          <div className="ss-quiz-question-top">
            <span className={`ss-quiz-badge ${difficulty.toLowerCase().replace(" ", "-")}`}>
              {difficulty}
            </span>
            <span>Question {questionIndex + 1} of {questions.length}</span>
          </div>

          <div className="ss-quiz-progress-track">
            <span
              style={{
                width: `${((questionIndex + 1) / questions.length) * 100}%`
              }}
            />
          </div>

          <h2>{currentQuestion.question}</h2>

          <div className="ss-quiz-options">
            {currentQuestion.options.map((option, index) => (
              <button
                type="button"
                key={option}
                className={`ss-quiz-option ${
                  answers[questionIndex] === index ? "selected" : ""
                }`}
                onClick={() =>
                  setAnswers((previous) => ({
                    ...previous,
                    [questionIndex]: index
                  }))
                }
              >
                <span>{String.fromCharCode(65 + index)}</span>
                {option}
              </button>
            ))}
          </div>

          <div className="ss-quiz-question-actions">
            <button
              type="button"
              className="ss-quiz-secondary"
              disabled={questionIndex === 0}
              onClick={() => setQuestionIndex((index) => index - 1)}
            >
              Previous
            </button>

            {questionIndex < questions.length - 1 ? (
              <button
                type="button"
                className="ss-quiz-primary"
                disabled={answers[questionIndex] === undefined}
                onClick={() => setQuestionIndex((index) => index + 1)}
              >
                Next question →
              </button>
            ) : (
              <button
                type="button"
                className="ss-quiz-primary"
                disabled={Object.keys(answers).length !== questions.length}
                onClick={finishQuiz}
              >
                Submit quiz
              </button>
            )}
          </div>
        </section>
      )}

      {difficulty && finished && (
        <section className="ss-card ss-quiz-result">
          <span className="ss-quiz-result-icon">
            {score / questions.length >= 0.8 ? "🏆" : "🎯"}
          </span>
          <h2>Quiz completed!</h2>
          <p>{difficulty} difficulty</p>
          <strong className="ss-quiz-result-score">
            {score}/{questions.length}
          </strong>
          <p>
            Accuracy: {Math.round((score / questions.length) * 100)}%
          </p>

          <button
            type="button"
            className="ss-quiz-secondary"
            onClick={() => setReview((value) => !value)}
          >
            {review ? "Hide answers" : "Review answers"}
          </button>

          {review && (
            <div className="ss-quiz-review">
              {questions.map((question, index) => (
                <article key={`${question.question}-${index}`}>
                  <h3>{index + 1}. {question.question}</h3>
                  <p>
                    Your answer: {question.options[answers[index]]}
                  </p>
                  <p>
                    Correct answer: {question.options[question.answer]}
                  </p>
                  <small>{question.explanation}</small>
                </article>
              ))}
            </div>
          )}

          <button
            type="button"
            className="ss-quiz-primary"
            onClick={resetQuiz}
          >
            Return to Quiz
          </button>
        </section>
      )}
    </div>
  );
}