import { useState } from "react";
import { users } from "./data";
import "./styles.css";

export const UsersTable = () => {
  const [checkedKeys, setCheckedKeys] = useState([
    { name: "id", isVisible: true },
    { name: "name", isVisible: true },
    { name: "hasCat", isVisible: true },
    { name: "company", isVisible: true },
    { name: "age", isVisible: true },
    { name: "city", isVisible: true },
  ]);
  const allCheck = checkedKeys.every((elem) => elem.isVisible);

  const changeCheckboxValue = (key) => {
    setCheckedKeys(
      checkedKeys.map((elem) =>
        elem.name === key ? { ...elem, isVisible: !elem.isVisible } : elem
      )
    );
  };

  const chooseAllCheckbox = () => {
    setCheckedKeys(
      checkedKeys.map((elem) => ({
        ...elem,
        isVisible: !allCheck,
      }))
    );
  };

  console.log(checkedKeys);

  return (
    <div>
      <input
        type="checkbox"
        id="all"
        checked={allCheck}
        onChange={chooseAllCheckbox}
      />
      <label htmlFor="all">Выбрать все</label>
      {checkedKeys.map((elem) => (
        <div key={elem.name}>
          <input
            type="checkbox"
            checked={elem.isVisible}
            id={elem.name}
            onChange={() => changeCheckboxValue(elem.name)}
          />
          <label htmlFor={elem.name}>{elem.name}</label>
        </div>
      ))}
      <table className="users-table">
        <thead>
          <tr>
            {checkedKeys
              .filter((elem) => elem.isVisible)
              .map((elem) => (
                <th>{elem.isVisible ? elem.name : ""}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              {checkedKeys
                .filter((elem) => elem.isVisible)
                .map((item) => (
                  <td>{user[item.name]}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
