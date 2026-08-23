// components/TestConstructor/TestEditor.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { fetchTestById, createTest, updateTest } from "./api/testsApi";
import "./styles.css";

export const TestEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isNew = id === "new";

  const [testName, setTestName] = useState("");
  const [questions, setQuestions] = useState([]);

  const { data: existingTest, isLoading } = useQuery({
    queryKey: ["test", id],
    queryFn: () => fetchTestById(id),
    enabled: !isNew && !!id,
  });

  useEffect(() => {
    if (!isNew && existingTest) {
      setTestName(existingTest.testName);
      setQuestions(existingTest.questions || []);
    }
  }, [existingTest, isNew]);

  const saveMutation = useMutation({
    mutationFn: (data) => {
      if (isNew) {
        return createTest(data);
      } else {
        return updateTest(id, data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tests"] });
      toast.success(isNew ? "Тест создан!" : "Тест обновлён!");
      navigate("/");
    },
    onError: () => {
      toast.error("Ошибка при сохранении");
    },
  });

  const addQuestion = () => {
    const newQuestion = {
      questionId: Date.now(),
      questionText: "",
      isOneCorrect: true,
      answers: [
        { answerId: Date.now(), answerText: "", isRight: false },
        { answerId: Date.now() + 1, answerText: "", isRight: false },
      ],
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (qIndex, field, value) => {
    const updated = [...questions];
    updated[qIndex][field] = value;
    setQuestions(updated);
  };

  const updateAnswer = (qIndex, aIndex, field, value) => {
    const updated = [...questions];
    updated[qIndex].answers[aIndex][field] = value;
    setQuestions(updated);
  };

  const addAnswer = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].answers.push({
      answerId: Date.now(),
      answerText: "",
      isRight: false,
    });
    setQuestions(updated);
  };

  const removeAnswer = (qIndex, aIndex) => {
    const updated = [...questions];
    if (updated[qIndex].answers.length <= 1) return;
    updated[qIndex].answers.splice(aIndex, 1);
    setQuestions(updated);
  };

  const deleteQuestion = (qIndex) => {
    setQuestions(questions.filter((_, i) => i !== qIndex));
  };

  const toggleCorrect = (qIndex, aIndex) => {
    const updated = [...questions];
    const q = updated[qIndex];
    if (q.isOneCorrect) {
      q.answers.forEach((a) => (a.isRight = false));
      q.answers[aIndex].isRight = true;
    } else {
      q.answers[aIndex].isRight = !q.answers[aIndex].isRight;
    }
    setQuestions(updated);
  };

  const handleSave = () => {
    if (!testName.trim()) {
      toast.warning("Введите название теста");
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.questionText.trim()) {
        toast.warning(`Вопрос ${i + 1} не имеет текста`);
        return;
      }
      if (q.answers.some((a) => !a.answerText.trim())) {
        toast.warning(`В вопросе ${i + 1} есть пустые варианты ответов`);
        return;
      }
      if (!q.answers.some((a) => a.isRight)) {
        toast.warning(`В вопросе ${i + 1} нет правильного ответа`);
        return;
      }
    }

    const testData = {
      testName: testName.trim(),
      questions: questions.map((q) => ({
        ...q,
        questionText: q.questionText.trim(),
        answers: q.answers.map((a) => ({
          ...a,
          answerText: a.answerText.trim(),
        })),
      })),
    };

    saveMutation.mutate(testData);
  };

  if (isLoading) {
    return (
      <div className="test-editor">
        <div className="loading">⏳ Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="test-editor">
      <div className="test-editor-header">
        <h1>{isNew ? "📝 Создание нового теста" : "✏️ Редактирование теста"}</h1>
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Назад
        </button>
      </div>

      <input
        className="test-title-input"
        type="text"
        value={testName}
        onChange={(e) => setTestName(e.target.value)}
        placeholder="Введите название теста..."
      />

      {questions.map((q, qIndex) => (
        <div key={q.questionId || qIndex} className="question-editor">
          <div className="question-editor-header">
            <span className="q-number">Вопрос {qIndex + 1}</span>
            <button className="delete-q-btn" onClick={() => deleteQuestion(qIndex)}>
              <FaTrash />
            </button>
          </div>

          <input
            className="q-text-input"
            type="text"
            value={q.questionText}
            onChange={(e) => updateQuestion(qIndex, "questionText", e.target.value)}
            placeholder="Введите текст вопроса..."
          />

          <div className="q-type-selector">
            <label>
              <input
                type="radio"
                checked={q.isOneCorrect === true}
                onChange={() => updateQuestion(qIndex, "isOneCorrect", true)}
              />
              Один вариант ответа
            </label>
            <label>
              <input
                type="radio"
                checked={q.isOneCorrect === false}
                onChange={() => updateQuestion(qIndex, "isOneCorrect", false)}
              />
              Несколько вариантов
            </label>
          </div>

          <div className="options-editor">
            {q.answers.map((answer, aIndex) => (
              <div key={answer.answerId || aIndex} className="option-row">
                <input
                  type="text"
                  value={answer.answerText}
                  onChange={(e) =>
                    updateAnswer(qIndex, aIndex, "answerText", e.target.value)
                  }
                  placeholder={`Вариант ${aIndex + 1}`}
                />
                <button
                  className={`correct-toggle ${answer.isRight ? "correct" : ""}`}
                  onClick={() => toggleCorrect(qIndex, aIndex)}
                >
                  {answer.isRight ? "✅" : "⬜"}
                </button>
                <button
                  className="remove-option-btn"
                  onClick={() => removeAnswer(qIndex, aIndex)}
                  disabled={q.answers.length <= 1}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <button className="add-option-btn" onClick={() => addAnswer(qIndex)}>
            <FaPlus /> добавить вариант
          </button>
        </div>
      ))}

      <button className="add-question-btn" onClick={addQuestion}>
        <FaPlus /> Добавить вопрос
      </button>

      <div className="test-editor-actions">
        <button className="cancel-btn" onClick={() => navigate("/")}>
          Отменить
        </button>
        <button
          className="save-btn"
          onClick={handleSave}
          disabled={saveMutation.isPending}
        >
          {saveMutation.isPending
            ? "⏳ Сохранение..."
            : isNew
            ? "💾 Создать тест"
            : "💾 Сохранить изменения"}
        </button>
      </div>
    </div>
  );
};