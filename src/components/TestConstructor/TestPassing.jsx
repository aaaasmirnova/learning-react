// components/TestConstructor/TestPassing.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTestById } from "./api/testsApi";
import "./styles.css";

export const TestPassing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const { data: test, isLoading, error } = useQuery({
    queryKey: ["test", id],
    queryFn: () => fetchTestById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="test-passing">
        <div className="loading">⏳ Загрузка теста...</div>
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="test-passing">
        <div className="error-state">❌ Тест не найден</div>
        <button className="back-btn" onClick={() => navigate("/")}>
          ← На главную
        </button>
      </div>
    );
  }

  const question = test.questions[currentQuestion];
  const totalQuestions = test.questions.length;

  const handleAnswer = (answerId) => {
    const currentAnswers = answers[question.questionId] || [];

    if (question.isOneCorrect) {
      setAnswers({ ...answers, [question.questionId]: [answerId] });
    } else {
      const newAnswers = currentAnswers.includes(answerId)
        ? currentAnswers.filter((id) => id !== answerId)
        : [...currentAnswers, answerId];
      setAnswers({ ...answers, [question.questionId]: newAnswers });
    }
  };

  const isAnswered = () => {
    const answer = answers[question.questionId];
    return answer && answer.length > 0;
  };

  const goToNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishTest = () => {
    setFinished(true);
    let correct = 0;
    test.questions.forEach((q) => {
      const userAnswer = answers[q.questionId] || [];
      const correctAnswers = q.answers
        .filter((a) => a.isRight)
        .map((a) => a.answerId);
      const sortedUser = [...userAnswer].sort();
      const sortedCorrect = [...correctAnswers].sort();
      if (JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect)) {
        correct++;
      }
    });
    navigate(`/result/${test.id}`, {
      state: { correct, total: totalQuestions },
    });
  };

  if (finished) return null;

  return (
    <div className="test-passing">
      <div className="test-passing-header">
        <h1>{test.testName}</h1>
        <span className="test-passing-progress">
          {currentQuestion + 1} / {totalQuestions}
        </span>
      </div>

      <div className="question-block">
        <div className="question-number">Вопрос {currentQuestion + 1}</div>
        <div className="question-text">{question.questionText}</div>

        <div className="options-list">
          {question.answers.map((answer) => {
            const isSelected = (answers[question.questionId] || []).includes(
              answer.answerId
            );
            return (
              <label
                key={answer.answerId}
                className={`option-item ${isSelected ? "selected" : ""}`}
              >
                <input
                  type={question.isOneCorrect ? "radio" : "checkbox"}
                  name={`question-${question.questionId}`}
                  checked={isSelected}
                  onChange={() => handleAnswer(answer.answerId)}
                />
                <span className="option-label">{answer.answerText}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="test-passing-actions">
        <button className="exit-btn" onClick={() => navigate("/")}>
          Выйти
        </button>
        <div>
          <button
            className="prev-btn"
            onClick={goToPrev}
            disabled={currentQuestion === 0}
          >
            ← Назад
          </button>
          {currentQuestion === totalQuestions - 1 ? (
            <button
              className="finish-btn"
              onClick={finishTest}
              disabled={!isAnswered()}
            >
              Закончить
            </button>
          ) : (
            <button
              className="next-btn"
              onClick={goToNext}
              disabled={!isAnswered()}
            >
              Далее →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};