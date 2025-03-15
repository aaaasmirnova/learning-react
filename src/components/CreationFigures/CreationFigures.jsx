import { useState } from "react";
import "./styles.css";
import { FiguresVisibleButton } from "./FiguresVisibleButton";
import { AddFigure } from "./AddFigure";
export const CreationFigures = () => {
  const [figure, setFigure] = useState("");
  const [list, setList] = useState([]);
  const [activeColor, setActiveColor] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

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
    setIsVisible(false);
  };
  const hiddenOthersFigures = () => {
    setIsVisible(true);
  };

  return (
    <div>
      <AddFigure
        figure={figure}
        changeFigureValue={changeFigureValue}
        activeColor={activeColor}
        changeActiveColor={changeActiveColor}
      />
      <button onClick={addFigureToList}>ДОБАВИТЬ ФИГУРУ</button>
      <div className="list-figures-wrapper">
        {list.slice(0, isVisible ? 8 : list.length).map((elem) => (
          <div className={`${elem.figureColor} ${elem.figureType}`}></div>
        ))}
        <FiguresVisibleButton
          isVisible={isVisible}
          showOthersFigures={showOthersFigures}
          hiddenOthersFigures={hiddenOthersFigures}
        />
      </div>
    </div>
  );
};
