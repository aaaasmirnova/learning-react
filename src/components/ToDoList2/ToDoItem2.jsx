import { useState } from "react";

export const ToDoItem2 = ({
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
        onChange={() => changeValueCheckbox(item.id, item.check)}
        className="task-checkbox"
      />
      {activeEdit ? (
        <div className="edit-mode-wrapper">
          <input
            type="text"
            className="task-text edit-input"
            value={value}
            onChange={changeNewText}
          />
          <div className="edit-buttons-wrapper">
            <button
              className="confirm-button to-do-button"
              onClick={confirmChanges}
              disabled={!value.trim()}
            >
              Подтвердить
            </button>
            <button
              className="cancel-button to-do-button"
              onClick={cancelChanges}
            >
              Отменить
            </button>
          </div>
        </div>
      ) : (
        <div className="task-button-wrapper">
          <div className="task-wrapper">
            <p className={item.check ? "strikethrough-item" : "to-do-text"}>
              {item.text}
            </p>
          </div>
          <div className="edit-delete-buttons-wrapper">
            <button
              className="edit-button to-do-button"
              onClick={clickEditButton}
            >
              Редактировать
            </button>

            <button
              className="delete-task to-do-button"
              onClick={() => deleteTask(item.id)}
            >
              Удалить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
