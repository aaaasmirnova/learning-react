// components/ToDoList2/ToDoList2.jsx
import { useState } from "react";
import "./styles.css";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from "axios";
import { TanstackToDoItem } from "./TanstackToDoItem";

const API_URL = 'https://7041eb88d5db9031.mokky.dev/items';

const options = [
  { value: "id", name: "по умолчанию" },
  { value: "checked", name: "завершенности" },
  { value: "title", name: "названию" },
];

export const TanstackToDoList = () => {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [sort, setSort] = useState("");

  // ------ 1. ПОЛУЧЕНИЕ СПИСКА (useQuery) ------
  const { data: list = [], isLoading, isError, error } = useQuery({
    queryKey: ['todos', { sort, searchValue }],
    queryFn: async () => {
      const params = {};
      
      if (sort === "title") {
        params.sortBy = "text";
      } else if (sort === "checked") {
        params.sortBy = "-check";
      }
      
      if (searchValue) {
        params.text = `*${searchValue}*`;
      }
      
      const response = await axios.get(API_URL, { params });
      return response.data;
    },
  });

  // ------ 2. ДОБАВЛЕНИЕ (useMutation) ------
  const addMutation = useMutation({
    mutationFn: (newTodo) => axios.post(API_URL, newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setValue("");
    },
  });

  // ------ 3. УДАЛЕНИЕ (useMutation) ------
  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`${API_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // ------ 4. ОБНОВЛЕНИЕ ЧЕКБОКСА (useMutation) ------
  const toggleCheckMutation = useMutation({
    mutationFn: ({ id, check }) => 
      axios.patch(`${API_URL}/${id}`, { check: !check }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // ------ 5. ОБНОВЛЕНИЕ ТЕКСТА (useMutation) ------
  const updateTextMutation = useMutation({
    mutationFn: ({ id, text }) => 
      axios.patch(`${API_URL}/${id}`, { text }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // ------ 6. ОБРАБОТЧИКИ ------
  const changeValue = (event) => setValue(event.target.value);
  const changeSearchValue = (event) => setSearchValue(event.target.value);
  const changeSortValue = (event) => setSort(event.target.value);

  const addValueToList = (event) => {
    event.preventDefault();
    if (!value.trim()) return;
    addMutation.mutate({ text: value, check: false });
  };

  const deleteTask = (id) => deleteMutation.mutate(id);
  
  const changeValueCheckbox = (id, check) => 
    toggleCheckMutation.mutate({ id, check });
  
  const updateText = (id, text) => 
    updateTextMutation.mutate({ id, text });

  // ------ 7. РЕНДЕРИНГ ------
  return (
    <div className="todolist-wrapper">
      <h1>Todo List</h1>
      
      <div className="sort-filter-wrapper">
        <select value={sort} onChange={changeSortValue}>
          {options.map((elem) => (
            <option key={elem.value} value={elem.value}>
              {elem.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={searchValue}
          placeholder="🔍 Поиск"
          onChange={changeSearchValue}
        />
      </div>

      <form className="add-task-form" onSubmit={addValueToList}>
        <input
          type="text"
          className="task-text"
          value={value}
          placeholder="Get some eggs..."
          onChange={changeValue}
        />
        <button 
          className="add-task-button to-do-button" 
          type="submit"
          disabled={addMutation.isPending || !value.trim()}
        >
          {addMutation.isPending ? 'Добавление...' : 'Добавить'}
        </button>
      </form>

      {/* ------ 8. ОТОБРАЖЕНИЕ СОСТОЯНИЙ ------ */}
      {isLoading && <div className="loader">Загрузка...</div>}
      
      {isError && (
        <div className="error-message">
          ❌ Ошибка: {error?.message || 'Неизвестная ошибка'}
        </div>
      )}

      {!isLoading && !isError && list.length === 0 && (
        <div className="empty-message">Список пуст. Добавьте первую задачу!</div>
      )}

      {!isLoading && !isError && list.map((item) => (
        <TanstackToDoItem
          key={item.id}
          item={item}
          deleteTask={deleteTask}
          changeValueCheckbox={changeValueCheckbox}
          updateText={updateText}
          isUpdating={updateTextMutation.isPending}
        />
      ))}
    </div>
  );
};