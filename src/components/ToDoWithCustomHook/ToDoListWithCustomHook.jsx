import { useState } from "react";
import { useTodo } from "../../hooks/useTodo";
import { ToDoItem } from "./ToDoItem";

export const ToDoListWithCustomHook = () => {
  const {
    addValueToList,
    changeValueCheckbox,
    changeSearchValue,
    deleteTask,
    deleteDoneTasks,
    changeSortValue,
    updateText,
    getList,
    searchValue,
    sort,
    value,
    changeValue,
  } = useTodo();

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
