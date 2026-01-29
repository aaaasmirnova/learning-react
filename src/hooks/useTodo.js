import { useState } from "react";

export const useTodo = () => {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [sort, setSort] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const changeValue = (event) => {
    setValue(event.target.value);
  };

  const addValueToList = (event) => {
    event.preventDefault();
    const id = list.length !== 0 ? list[list.length - 1].id + 1 : 1;
    setList([...list, { id, text: value, check: false }]);

    setValue("");
  };

  const changeValueCheckbox = (id) => {
    setList(
      list.map((elem) =>
        elem.id === id ? { ...elem, check: !elem.check } : elem
      )
    );
  };

  const changeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const deleteTask = (id) => {
    setList(list.filter((elem) => elem.id !== id));
  };

  const deleteDoneTasks = () => {
    setList(list.filter((elem) => !elem.check));
  };

  const changeSortValue = (event) => {
    setSort(event.target.value);
  };

  const updateText = (id, newText) => {
    setList(
      list.map((elem) => (elem.id === id ? { ...elem, text: newText } : elem))
    );
  };

  const getFilteredList = () => {
    return list.filter((elem) =>
      elem.text.toLowerCase().startsWith(searchValue)
    );
  };

  const getSortedList = (newList) => {
    if (sort === "title") {
      return [...newList].sort((a, b) => a.text.localeCompare(b.text));
    }
    if (sort === "checked") {
      return [...newList].sort((a, b) => b.check - a.check);
    }
    return newList;
  };

  const getList = () => {
    let initialList = [...list];
    if (searchValue) {
      initialList = getFilteredList();
    }
    if (sort) {
      initialList = getSortedList(initialList);
    }

    return initialList;
  };

  return {
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
  };
};
