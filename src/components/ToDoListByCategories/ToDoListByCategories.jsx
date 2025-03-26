import { useState } from "react";
import "./styles.css";
export const ToDoListByCategories = () => {
  const [todos, setTodos] = useState({ job: [], home: [], hobbie: [] });
  const [value, setValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const changeValue = (event) => {
    setValue(event.target.value);
  };

  const chooseActiveCategory = (category) => {
    setActiveCategory(category);
  };

  const addValueToList = (event) => {
    event.preventDefault();
    const id =
      todos[activeCategory]?.length !== 0
        ? todos[activeCategory]?.[todos[activeCategory]?.length - 1].id + 1
        : 1;
    if (activeCategory) {
      setTodos({
        ...todos,
        [activeCategory]: [
          ...todos[activeCategory],
          { id, text: value, isChecked: false },
        ],
      });
    }

    setValue("");
  };

  const changeValueCheckbox = (index) => {
    setTodos({
      ...todos,
      [activeCategory]: todos[activeCategory].map((elem, ind) =>
        ind === index ? { ...elem, isChecked: !elem.isChecked } : elem
      ),
    });
  };

  //   console.log(activeCategory);
  console.log(todos);

  return (
    <div>
      <div className="category-buttons-wrapper">
        {Object.keys(todos).map((category) => (
          <button
            className={`category-button ${
              activeCategory === category ? "active-category-button" : ""
            }`}
            onClick={() => chooseActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <form className="todo-category-form">
        <input type="text" value={value} onChange={changeValue}></input>
        <button className="add-todo-button" onClick={addValueToList}>
          Add
        </button>
      </form>

      {todos[activeCategory]?.map((elem, index) => (
        <div>
          <div className="checkbox-todo-wrapper">
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={elem.isChecked}
              onChange={() => {
                changeValueCheckbox(index);
              }}
            ></input>
            <p
              className={`todo-text ${
                elem.isChecked ? "strikethrough-item" : ""
              }`}
            >
              {elem.text}
            </p>{" "}
          </div>
        </div>
      ))}
    </div>
  );
};
