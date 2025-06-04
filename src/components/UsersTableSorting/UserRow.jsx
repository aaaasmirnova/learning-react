import { useState } from "react";
import "./styles.css";
import axios from "axios";
export const UserRow = ({
  user,
  getUsers,
  selectedUsers,
  changeUserCheckboxValue,
}) => {
  const [activeEdit, setActiveEdit] = useState(false);
  const [newUser, setNewUser] = useState(user);

  const clickEditButton = () => {
    setActiveEdit(true);
  };

  const changeUserInfo = (event, key) => {
    setNewUser({ ...newUser, [key]: event.target.value });
  };

  const saveChanges = async () => {
    try {
      await axios.patch(`https://fce1eb7b66e07ec3.mokky.dev/users/${user.id}`, {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        age: newUser.age,
        email: newUser.email,
      });
      setActiveEdit(false);
      getUsers();
    } catch (err) {
      console.error("Произошла ошибка!", err);
    }
  };

  const cancelChanges = () => {
    setNewUser(user);
    setActiveEdit(false);
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`https://fce1eb7b66e07ec3.mokky.dev/users/${user.id}`);
      getUsers();
    } catch (err) {
      console.error("Произошла ошибка!", err);
    }
  };
  return (
    <tr key={user.id}>
      <td>
        <input
          type="checkbox"
          checked={selectedUsers.includes(user.id)}
          onChange={() => {
            changeUserCheckboxValue(user.id);
          }}
        />
      </td>
      {Object.keys(newUser)
        .filter((key) => key !== "id")
        .map((key) => (
          <td key={key}>
            {activeEdit ? (
              <input
                type={key === "age" ? "number" : "text"}
                value={newUser[key]}
                onChange={(event) => changeUserInfo(event, key)}
              />
            ) : (
              newUser[key]
            )}
          </td>
        ))}

      <div>
        {activeEdit ? (
          <div>
            {" "}
            <button onClick={saveChanges}>Сохранить</button>
            <button onClick={cancelChanges}>Отменить</button>
          </div>
        ) : (
          <div>
            <button onClick={clickEditButton}>Редактировать</button>
            <button onClick={deleteUser}>Удалить</button>
          </div>
        )}
      </div>
    </tr>
  );
};
