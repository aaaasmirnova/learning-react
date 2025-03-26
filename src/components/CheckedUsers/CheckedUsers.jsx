import { useState } from "react";
import { users } from "./data";
import "./styles.css";

export const CheckedUsers = () => {
  const [checkedList, setCheckedList] = useState([]);
  const isAllUsersChecked = checkedList.length === users.length;

  const changeValueCheckbox = (user) => {
    if (!checkedList.includes(user)) {
      setCheckedList([...checkedList, user]);
    } else {
      setCheckedList(checkedList.filter((elem) => elem !== user));
    }
  };

  const chooseAllUsers = () => {
    if (!isAllUsersChecked) {
      setCheckedList(users.map((elem) => elem.name));
    } else {
      setCheckedList([]);
    }
  };

  //   console.log(checkedList);
  return (
    <div className="checked-users-wrapper">
      <div className="checkbox-user-wrapper">
        <label className="checkbox-user">
          <input
            type="checkbox"
            checked={isAllUsersChecked}
            onChange={chooseAllUsers}
          ></input>
          <p className="users-list-text">Выбрать всех</p>
        </label>
        {users.map((user) => (
          <label className="checkbox-user">
            <input
              type="checkbox"
              checked={checkedList.includes(user.name)}
              onChange={() => changeValueCheckbox(user.name)}
            ></input>
            <p className="users-list-text">
              {user.name}, {user.age}
            </p>
          </label>
        ))}
      </div>
      <div className="checked-list-wrapper">
        <p className="checked-list-text">Выбранные:</p>
        {checkedList.map((name) => (
          <p className="checked-list-text">- {name}</p>
        ))}
      </div>
    </div>
  );
};
