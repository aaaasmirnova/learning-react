export const AddFigure = ({
  figure,
  changeFigureValue,
  activeColor,
  changeActiveColor,
}) => {
  const colors = [
    { id: "1", color: "blue" },
    { id: "2", color: "red" },
    { id: "3", color: "violet" },
    { id: "4", color: "green" },
    { id: "5", color: "orange" },
  ];

  return (
    <div className="select-checkbox-wrapper">
      <select
        className="select-figures"
        value={figure}
        onChange={changeFigureValue}
      >
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
  );
};
