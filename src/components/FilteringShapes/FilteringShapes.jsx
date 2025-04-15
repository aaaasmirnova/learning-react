import { useState } from "react";
import { data } from "./data";
import "./styles.css";

export const FilteringShapes = () => {
  const colors = [
    { name: "КРАСНЫЕ", value: "red" },
    { name: "ЗЕЛЕНЫЕ", value: "green" },
    { name: "СИНИЕ", value: "blue" },
    { name: "ЖЕЛТЫЕ", value: "yellow" },
  ];
  const figures = [
    { name: "КРУГИ", value: "circle" },
    { name: "КВАДРАТЫ", value: "square" },
  ];
  const tones = ["ТЕМНЫЕ", "СВЕТЛЫЕ"];
  const [checkedColors, setCheckedColors] = useState([]);
  const [checkedFigures, setCheckedFigures] = useState([]);
  const [value, setValue] = useState("Все");

  const changeActiveColors = (color) => {
    if (!checkedColors.includes(color)) {
      setCheckedColors([...checkedColors, color]);
    } else {
      setCheckedColors(checkedColors.filter((elem) => elem !== color));
    }
  };

  const changeActiveFigures = (figure) => {
    if (!checkedFigures.includes(figure)) {
      setCheckedFigures([...checkedFigures, figure]);
    } else {
      setCheckedFigures(checkedFigures.filter((elem) => elem !== figure));
    }
  };

  const chooseToneOfFigures = (tone) => {
    setValue(tone);
  };

  const getFilteredList = () => {
    let filteredList = [...data];
    if (checkedColors.length > 0) {
      filteredList = filteredList.filter((elem) =>
        checkedColors.includes(elem.color)
      );
    }

    if (checkedFigures.length > 0) {
      filteredList = filteredList.filter((elem) =>
        checkedFigures.includes(elem.form)
      );
    }

    if (value === "ТЕМНЫЕ") {
      filteredList = filteredList.filter((elem) => elem.dark);
    } else if (value === "СВЕТЛЫЕ") {
      filteredList = filteredList.filter((elem) => !elem.dark);
    }

    return filteredList;
  };

  const chooseAllColors = () => {
    if (checkedColors.length < colors.length) {
      setCheckedColors(colors.map((elem) => elem.value));
    } else {
      setCheckedColors([]);
    }
  };

  const chooseAllFigures = () => {
    if (checkedFigures.length < figures.length) {
      setCheckedFigures(figures.map((elem) => elem.value));
    } else {
      setCheckedFigures([]);
    }
  };

  return (
    <div className="figures-wrapper">
      <div className="figures-checkbox-radio-wrapper">
        <div>
          <input
            type="checkbox"
            id="all-colors"
            checked={checkedColors.length === colors.length}
            onChange={chooseAllColors}
          ></input>
          <label htmlFor="all-colors">Все цвета</label>
          {colors.map((color) => (
            <div>
              <input
                type="checkbox"
                id={color.name}
                checked={checkedColors.includes(color.value)}
                onChange={() => changeActiveColors(color.value)}
              ></input>
              <label htmlFor={color.name}>{color.name}</label>
            </div>
          ))}
        </div>
        <div>
          <input
            type="checkbox"
            id="all-colors"
            checked={checkedFigures.length === figures.length}
            onChange={chooseAllFigures}
          ></input>
          <label htmlFor="all-colors">Все формы</label>
          {figures.map((figure) => (
            <div>
              <input
                type="checkbox"
                id={figure.name}
                checked={checkedFigures.includes(figure.value)}
                onChange={() => changeActiveFigures(figure.value)}
              ></input>
              <label htmlFor={figure.name}>{figure.name}</label>
            </div>
          ))}
        </div>
        <div>
          <input
            type="radio"
            value="Все"
            checked={value === "Все"}
            onChange={() => chooseToneOfFigures("Все")}
            id="all"
          ></input>
          <label htmlFor="all">ВСЕ</label>
          {tones.map((tone) => (
            <div>
              <input
                type="radio"
                value={tone}
                checked={value === tone}
                onChange={() => chooseToneOfFigures(tone)}
                id={tone}
              ></input>
              <label htmlFor={tone}>{tone}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="">
        {getFilteredList().map((figure) => (
          <div
            className={`block ${figure.form} ${figure.color} ${
              figure.dark ? "dark" : ""
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};
