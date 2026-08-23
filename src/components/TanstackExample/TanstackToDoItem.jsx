// components/ToDoList2/ToDoItem2.jsx
import { useState } from "react";

export const TanstackToDoItem = ({
  item,
  changeValueCheckbox,
  deleteTask,
  updateText,
  isUpdating = false,
}) => {
  const [activeEdit, setActiveEdit] = useState(false);
  const [value, setValue] = useState(item.text);

  const clickEditButton = () => setActiveEdit(true);
  const changeNewText = (event) => setValue(event.target.value);

  const confirmChanges = () => {
    if (value.trim()) {
      updateText(item.id, value);
      setActiveEdit(false);
    }
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
        disabled={isUpdating}
      />
      
      {activeEdit ? (
        <div className="edit-mode-wrapper">
          <input
            type="text"
            className="task-text edit-input"
            value={value}
            onChange={changeNewText}
            disabled={isUpdating}
          />
          <div className="edit-buttons-wrapper">
            <button
              className="confirm-button to-do-button"
              onClick={confirmChanges}
              disabled={!value.trim() || isUpdating}
            >
              {isUpdating ? 'Сохранение...' : 'Подтвердить'}
            </button>
            <button
              className="cancel-button to-do-button"
              onClick={cancelChanges}
              disabled={isUpdating}
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
              disabled={isUpdating}
            >
              Редактировать
            </button>
            <button
              className="delete-task to-do-button"
              onClick={() => deleteTask(item.id)}
              disabled={isUpdating}
            >
              Удалить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};