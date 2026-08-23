// components/TestConstructor/Home.jsx
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaPlus, FaPencilAlt, FaTrash, FaPlay } from "react-icons/fa";
import { toast } from "react-toastify";
import { fetchTests, deleteTest } from "./api/testsApi";
import "./styles.css";

export const Home = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ✅ Получение списка тестов
  const { data: tests = [], isLoading, error } = useQuery({
    queryKey: ["tests"],
    queryFn: fetchTests,
  });

  // ✅ Удаление теста
  const deleteMutation = useMutation({
    mutationFn: deleteTest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tests"] });
      toast.success("Тест удалён");
    },
    onError: () => {
      toast.error("Ошибка при удалении");
    },
  });

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Вы уверены, что хотите удалить этот тест?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="tests-page">
        <div className="loading">⏳ Загрузка тестов...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tests-page">
        <div className="error-state">❌ Ошибка загрузки тестов</div>
      </div>
    );
  }

  return (
    <div className="tests-page">
      <div className="tests-header">
        <h1>🧪 Конструктор тестов</h1>
        <button className="create-test-btn" onClick={() => navigate("/editor/new")}>
          <FaPlus /> Создать свой тест
        </button>
      </div>

      <div className="tests-grid">
        {tests.map((test) => (
          <div key={test.id} className="test-card">
            <div
              className="test-card-content"
              onClick={() => navigate(`/test/${test.id}`)}
            >
              <div className="test-card-left">
                <span className="test-icon">📝</span>
                <div>
                  <h3 className="test-title">{test.testName}</h3>
                  <span className="test-questions-count">
                    📋 {test.questions?.length || 0} вопросов
                  </span>
                </div>
              </div>
            </div>
            <div className="test-card-actions">
              <button
                className="play-btn"
                onClick={() => navigate(`/test/${test.id}`)}
                title="Пройти тест"
              >
                <FaPlay />
              </button>
              <button
                className="edit-btn"
                onClick={() => navigate(`/editor/${test.id}`)}
                title="Редактировать"
              >
                <FaPencilAlt />
              </button>
              <button
                className="delete-btn"
                onClick={(e) => handleDelete(e, test.id)}
                title="Удалить"
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "..." : <FaTrash />}
              </button>
            </div>
          </div>
        ))}

        {tests.length === 0 && (
          <div className="empty-state">
            <p>😕 У вас пока нет тестов</p>
            <p className="empty-hint">Создайте свой первый тест!</p>
          </div>
        )}
      </div>
    </div>
  );
};