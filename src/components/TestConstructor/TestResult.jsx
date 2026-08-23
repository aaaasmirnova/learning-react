// components/TestConstructor/TestResult.jsx
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./styles.css";

export const TestResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Получаем данные из state (переданные из TestPassing)
  const { correct, total } = location.state || { correct: 0, total: 0 };

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  // Определяем уровень
  let level = "";
  let emoji = "";
  if (percentage === 100) {
    level = "🎉 Идеально! Вы гений!";
    emoji = "🏆";
  } else if (percentage >= 80) {
    level = "🌟 Отлично! Вы хорошо знаете тему!";
    emoji = "🌟";
  } else if (percentage >= 60) {
    level = "📚 Хороший результат! Есть куда расти!";
    emoji = "📚";
  } else if (percentage >= 40) {
    level = "🤔 Неплохо, но стоит повторить материал";
    emoji = "🤔";
  } else {
    level = "😅 Попробуйте пройти тест ещё раз";
    emoji = "📖";
  }

  return (
    <div className="test-result">
      <div className="result-icon">{emoji}</div>
      <h1 className="result-title">Результаты теста</h1>

      <div className="result-score">
        {correct} / {total}
      </div>

      <div className="result-percentage">{percentage}%</div>

      <div className="result-details">
        <p className="result-level">{level}</p>
        <p className="result-stats">
          ✅ Правильных ответов: <strong>{correct}</strong>
          <br />
          ❌ Неправильных: <strong>{total - correct}</strong>
        </p>
      </div>

      <div className="result-actions">
        <button
          className="retry-btn"
          onClick={() => navigate(`/test/${id}`)}
        >
          🔄 Пройти заново
        </button>
        <button
          className="home-btn"
          onClick={() => navigate("/")}
        >
          🏠 На главную
        </button>
      </div>

      {/* Показываем разбор ошибок? Можно добавить позже */}
      {correct < total && (
        <div className="result-tips">
          <p>💡 Совет: повторите материал, на котором ошиблись</p>
        </div>
      )}
    </div>
  );
};