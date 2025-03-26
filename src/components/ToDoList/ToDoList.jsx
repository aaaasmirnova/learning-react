import { useState } from "react";

import "./styles.css";
import { ToDoItem } from "./ToDoItem";
export const ToDoList = () => {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [sort, setSort] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const changeValue = (event) => {
    setValue(event.target.value);
  };

  const changeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const addValueToList = (event) => {
    event.preventDefault();
    const id = list.length !== 0 ? list[list.length - 1].id + 1 : 1;
    setList([...list, { id, text: value, check: false }]);

    setValue("");
  };

  const changeValueCheckbox = (id) => {
    setList(
      list.map((elem) =>
        elem.id === id ? { ...elem, check: !elem.check } : elem
      )
    );
  };

  const deleteTask = (id) => {
    setList(list.filter((elem) => elem.id !== id));
  };

  const deleteDoneTasks = () => {
    setList(list.filter((elem) => !elem.check));
  };

  const changeSortValue = (event) => {
    setSort(event.target.value);
  };

  const updateText = (id, newText) => {
    setList(
      list.map((elem) => (elem.id === id ? { ...elem, text: newText } : elem))
    );
  };

  const getFilteredList = () => {
    return list.filter((elem) =>
      elem.text.toLowerCase().startsWith(searchValue)
    );
  };

  //   const filteredList = getFilteredList();

  const getSortedList = (newList) => {
    if (sort === "title") {
      return [...newList].sort((a, b) => a.text.localeCompare(b.text));
    }
    if (sort === "checked") {
      return [...newList].sort((a, b) => b.check - a.check);
    }
    return newList;
  };

  //   const sortedList = getSortedList();

  const getList = () => {
    let initialList = [...list];
    if (searchValue) {
      initialList = getFilteredList();
    }
    if (sort) {
      initialList = getSortedList(initialList);
    }

    return initialList;
  };

  return (
    <div className="todolist-wrapper">
      <h1>Todo List</h1>
      <form className="add-task-form">
        <input
          type="text"
          className="task-text"
          value={value}
          placeholder="Get some eggs..."
          onChange={changeValue}
        ></input>
        <button className="add-task-button" onClick={addValueToList}>
          Add
        </button>
      </form>
      <input
        type="text"
        value={searchValue}
        placeholder="Поиск"
        onChange={changeSearchValue}
      ></input>

      <select value={sort} onChange={changeSortValue}>
        {" "}
        <option value="id">по умолчанию</option>
        <option value="checked">завершенности</option>
        <option value="title">названию</option>
      </select>

      {getList().map((item, index) => (
        <ToDoItem
          item={item}
          key={index}
          deleteTask={deleteTask}
          changeValueCheckbox={changeValueCheckbox}
          updateText={updateText}
        />
      ))}
      <button onClick={deleteDoneTasks}>DeleteDoneTask</button>
    </div>
  );
};
