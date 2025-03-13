import { useState } from "react";
import "./styles.css";
export const CreationFigures = () => {
  const [figure, setFigure] = useState("");
  const [list, setList] = useState([]);
  const [activeColor, setActiveColor] = useState(null);
  const [shownFigures, setShownFigures] = useState(8);

  const colors = [
    { id: "1", color: "blue" },
    { id: "2", color: "red" },
    { id: "3", color: "violet" },
    { id: "4", color: "green" },
    { id: "5", color: "orange" },
  ];

  const changeFigureValue = (event) => {
    setFigure(event.target.value);
  };

  const changeActiveColor = (color) => {
    setActiveColor(color);
  };

  const addFigureToList = () => {
    if (figure && activeColor) {
      setList([
        {
          figureType: figure,
          figureColor: activeColor,
        },
        ...list,
      ]);
    }
    setFigure("");
    setActiveColor(null);
  };

  const showOthersFigures = () => {
    setShownFigures(shownFigures + (list.length - 8));
  };
  // console.log(list);

  return (
    <div>
      <div className="select-checkbox-wrapper">
        <select value={figure} onChange={changeFigureValue}>
          <option value="id">Выберите фигуру</option>
          <option value="circle">Круг</option>
          <option value="square">Квадрат</option>
        </select>
        <div className="checkbox-container-inside">
          {colors.map((elem) => (
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={activeColor === elem.color}
                onChange={() => changeActiveColor(elem.color)}
              ></input>
              <span
                className={`checkmark ${
                  activeColor === elem.color ? "active-checkmark" : ""
                } ${elem.color}`}
              ></span>
            </label>
          ))}
        </div>
      </div>
      <button onClick={addFigureToList}>ДОБАВИТЬ ФИГУРУ</button>
      <div className="list-figures-wrapper">
        {list.slice(0, shownFigures).map((elem) => (
          <div className={`${elem.figureColor} ${elem.figureType}`}></div>
        ))}
        {list.length > shownFigures && (
          <button onClick={showOthersFigures}>
            Посмотреть остальные ({list.length - 8})
          </button>
        )}
        {/* {shownFigures &&
          list
            .slice(8, list.length)
            .map((elem) => (
              <div className={`${elem.figureColor} ${elem.figureType}`}></div>
            ))} */}
      </div>
    </div>
  );
};
