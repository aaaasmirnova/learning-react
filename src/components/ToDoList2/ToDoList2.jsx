import { useState } from "react";
import "./styles.css";
import axios from "axios";
import { useEffect } from "react";
import { ToDoItem2 } from "./ToDoItem2";

const options = [
  { value: "id", name: "по умолчанию" },
  { value: "checked", name: "завершенности" },
  { value: "title", name: "названию" },
];

export const ToDoList2 = () => {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  const changeValue = (event) => {
    setValue(event.target.value);
  };

  const changeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const changeSortValue = (event) => {
    setSort(event.target.value);
  };

  const deleteTask = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://7041eb88d5db9031.mokky.dev/items/${id}`);

      getList();
    } catch (err) {
      console.error("Произошла ошибка!", err);
    } finally {
      setLoading(false);
    }
  };

  const changeValueCheckbox = async (id, checkValue) => {
    try {
      setLoading(true);
      await axios.patch(`https://7041eb88d5db9031.mokky.dev/items/${id}`, {
        check: !checkValue,
      });

      getList();
    } catch (err) {
      console.error("Произошла ошибка!", err);
    } finally {
      setLoading(false);
    }
  };

  const updateText = async (id, newText) => {
    try {
      setLoading(true);
      await axios.patch(`https://7041eb88d5db9031.mokky.dev/items/${id}`, {
        text: newText,
      });
      getList();
    } catch (err) {
      console.error("Произошла ошибка!", err);
    } finally {
      setLoading(false);
    }
  };

  const addValueToList = async (event) => {
    event.preventDefault();
    if (!value.trim()) return;
    const newToDo = { text: value, check: false };

    try {
      setLoading(true);
      await axios.post("https://7041eb88d5db9031.mokky.dev/items", newToDo);
      setValue("");
      getList();
    } catch (err) {
      console.error("Произошла ошибка!", err);
    } finally {
      setLoading(false);
    }
  };

  const getList = async () => {
    try {
      setLoading(true);
      const params = {};

      if (sort === "title") {
        params.sortBy = "text";
      } else if (sort === "checked") {
        params.sortBy = "-check";
      }

      if (searchValue) {
        params.text = `*${searchValue}*`;
      }
      const response = await axios("https://7041eb88d5db9031.mokky.dev/items", {
        params,
      });
      setList(response.data);
    } catch (err) {
      console.error("Произошла ошибка!", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, [sort, searchValue]);

  return (
    <div className="todolist-wrapper">
      <h1>Todo List</h1>
      <div className="sort-filter-wrapper">
        <select value={sort} onChange={changeSortValue}>
          {options.map((elem) => (
            <option value={elem.value}>{elem.name}</option>
          ))}
        </select>

        <input
          type="text"
          value={searchValue}
          placeholder="🔍 Поиск"
          onChange={changeSearchValue}
        ></input>
      </div>
      <form className="add-task-form">
        <input
          type="text"
          className="task-text"
          value={value}
          placeholder="Get some eggs..."
          onChange={changeValue}
        ></input>

        <button
          className="add-task-button to-do-button"
          onClick={addValueToList}
        >
          Добавить
        </button>
      </form>

      {list.map((item, index) => (
        <ToDoItem2
          item={item}
          key={index}
          deleteTask={deleteTask}
          changeValueCheckbox={changeValueCheckbox}
          updateText={updateText}
          å
        />
      ))}
      {loading ? <div class="loader"></div> : ""}
    </div>
  );
};
