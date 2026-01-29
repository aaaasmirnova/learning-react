import { useState } from "react";

export const ToDoItem = ({
  item,
  changeValueCheckbox,
  deleteTask,
  updateText,
}) => {
  const [activeEdit, setActiveEdit] = useState(false);
  const [value, setValue] = useState(item.text);

  const clickEditButton = () => {
    setActiveEdit(true);
  };

  const changeNewText = (event) => {
    setValue(event.target.value);
  };

  const confirmChanges = () => {
    updateText(item.id, value);
    setActiveEdit(false);
  };

  const cancelChanges = () => {
    setValue(item.text);
    setActiveEdit(false);
  };

  return (
    <div className="task-checkbox-wrapper">
      <input
        type="checkbox"
        checked={item.check}
        onChange={() => changeValueCheckbox(item.id)}
      ></input>
      {activeEdit ? (
        <div className="">
          <input
            type="text"
            className="task-text"
            value={value}
            onChange={changeNewText}
          ></input>
          <button onClick={confirmChanges}>Подтвердить</button>
          <button onClick={cancelChanges}>Отменить</button>
        </div>
      ) : (
        <div className="task-button-wrapper">
          <div className="task-wrapper">
            <p className={item.check ? "strikethrough-item" : ""}>
              {item.text}
            </p>
          </div>
          <div className="edit-delete-buttons-wrapper">
            <button onClick={clickEditButton}>Редактировать</button>
            <button className="delete-task" onClick={() => deleteTask(item.id)}>
              Delete
            </button>{" "}
          </div>
        </div>
      )}
    </div>
  );
};
