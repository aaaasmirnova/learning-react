// api/testsApi.js
import axios from "axios";

const API_URL = "https://a790a47683b7980e.mokky.dev/tests";

// Получить все тесты
export const fetchTests = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Получить тест по ID
export const fetchTestById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Создать новый тест
export const createTest = async (test) => {
  const response = await axios.post(API_URL, test);
  return response.data;
};

// Обновить тест
export const updateTest = async (id, test) => {
  const response = await axios.put(`${API_URL}/${id}`, test);
  return response.data;
};

// Удалить тест
export const deleteTest = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};