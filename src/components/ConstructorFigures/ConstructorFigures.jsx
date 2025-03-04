import { useState } from "react";
import "./styles.css";

export const ConstructorFigures = () => {
  const colors = [
    { name: "СИНИЙ", value: "blue" },
    { name: "КРАСНЫЙ", value: "red" },
    { name: "ЖЕЛТЫЙ", value: "yellow" },
  ];
  const figures = [
    { name: "КВАДРАТ", value: "square" },
    { name: "КРУГ", value: "circle" },
  ];

  const [activeColor, setActiveColor] = useState(null);
  const [activeFigure, setActiveFigure] = useState(null);
  const chooseColor = (color) => {
    setActiveColor(color);
  };

  const chooseFigure = (figure) => {
    setActiveFigure(figure);
  };

  return (
    <div className="constructor-wrapper">
      <div className="constructor-data">
        <p className="constructor-title">Конструктор фигуры</p>
        <div className="buttons-color-wrapper">
          {colors.map((color) => (
            <button
              className={activeColor?.name === color.name ? "activeButton" : ""}
              onClick={() => chooseColor(color)}
            >
              {color.name}
            </button>
          ))}
        </div>
        <div className="buttons-figure-wrapper">
          {figures.map((figure) => (
            <button
              className={
                activeFigure?.name === figure.name ? "activeButton" : ""
              }
              onClick={() => chooseFigure(figure)}
            >
              {figure.name}
            </button>
          ))}
        </div>
      </div>
      <p className="constructor-result">РЕЗУЛЬТАТ:</p>
      <div className={`${activeColor?.value} ${activeFigure?.value}`}></div>
    </div>
  );
};
