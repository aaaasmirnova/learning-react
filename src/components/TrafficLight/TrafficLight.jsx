import { useState } from "react";
import "./styles.css";

export const TrafficLight = () => {
  const [activeColor, setActiveColor] = useState("yellow");
  const colors = ["red", "yellow", "green"];
  const changeColor = () => {
    let newActiveColorIndex = colors.indexOf(activeColor);
    if (newActiveColorIndex === colors.length - 1) {
      newActiveColorIndex = 0;
    } else {
      newActiveColorIndex++;
    }
    setActiveColor(colors[newActiveColorIndex]);
  };

  return (
    <div className="traffic-light-wrapper">
      <ul className="traffic-light">
        {colors.map((elem) => (
          <li
            className={`circle ${activeColor === elem ? `${elem}` : ""}`}
          ></li>
        ))}
      </ul>
      <button onClick={() => changeColor()} className="changing-color">
        CЛЕДУЮЩИЙ ЦВЕТ
      </button>
    </div>
  );
};
