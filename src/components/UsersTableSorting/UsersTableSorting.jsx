import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { TiArrowUnsorted } from "react-icons/ti";
import { FaArrowDownShortWide } from "react-icons/fa6";
import { FaArrowUpWideShort } from "react-icons/fa6";
import { UserRow } from "./UserRow";

const columnNames = ["Имя", "Фамилия", "Возраст", "e - mail", "Actions"];
const sortingKeys = ["firstName", "lastName", "age", "email"];

export const UsersTableSorting = () => {
  const [users, setUsers] = useState([]);
  const [sortingMode, setSortingMode] = useState([
    "default",
    "default",
    "default",
    "default",
  ]);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const isAllChecked = selectedUsers.length === users.length;

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios("https://fce1eb7b66e07ec3.mokky.dev/users");
      setUsers(response.data);
    } catch (err) {
      console.error("Произошла ошибка!", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const changeUserCheckboxValue = (id) => {
    if (!selectedUsers.includes(id)) {
      setSelectedUsers([...selectedUsers, id]);
    } else {
      setSelectedUsers(selectedUsers.filter((elem) => elem !== id));
    }
  };

  const chooseAllCheckbox = () => {
    if (!isAllChecked) {
      setSelectedUsers(users.map((elem) => elem.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const changeSortingMode = async (columnIndex) => {
    try {
      const params = {};
      if (sortingMode[columnIndex] === "default") {
        params.sortBy = `-${sortingKeys[columnIndex]}`;
        setSortingMode(
          sortingMode.map((_, index) =>
            index === columnIndex ? "descendingMode" : "default"
          )
        );
      }
      if (sortingMode[columnIndex] === "descendingMode") {
        params.sortBy = sortingKeys[columnIndex];
        setSortingMode(
          sortingMode.map((_, index) =>
            index === columnIndex ? "ascendingMode" : "default"
          )
        );
      }
      if (sortingMode[columnIndex] === "ascendingMode") {
        params.sortBy = "";
        setSortingMode(
          sortingMode.map((mode, index) =>
            index === columnIndex ? "default" : mode
          )
        );
      }

      const response = await axios("https://fce1eb7b66e07ec3.mokky.dev/users", {
        params,
      });

      setUsers(response.data);
    } catch (err) {
      console.error("Произошла ошибка!", err);
    }
  };

  const deleteSelectedUsers = async () => {
    try {
      await Promise.all(
        selectedUsers.map((id) =>
          axios.delete(`https://fce1eb7b66e07ec3.mokky.dev/users/${id}`)
        )
      );
      getUsers();
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    } catch (err) {
      console.error("Произошла ошибка!", err);
    }
  };

  const getSortingButton = (index) => {
    if (!sortingMode[index]) return;
    return (
      <button onClick={() => changeSortingMode(index)}>
        {sortingMode[index] === "default" ? (
          <TiArrowUnsorted />
        ) : sortingMode[index] === "descendingMode" ? (
          <FaArrowDownShortWide />
        ) : (
          <FaArrowUpWideShort />
        )}
      </button>
    );
  };

  return (
    <div>
      {selectedUsers.length > 0 && (
        <button onClick={deleteSelectedUsers}>
          Удалить выбранных ({selectedUsers.length})
        </button>
      )}
      <table className="users-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isAllChecked}
                onChange={chooseAllCheckbox}
              />
            </th>

            {columnNames.map((elem, index) => (
              <th>
                <div>
                  {elem} {getSortingButton(index)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              changeUserCheckboxValue={changeUserCheckboxValue}
              getUsers={getUsers}
              selectedUsers={selectedUsers}
            />
          ))}
        </tbody>
      </table>
      {loading && <div class="loader"></div>}
    </div>
  );
};
