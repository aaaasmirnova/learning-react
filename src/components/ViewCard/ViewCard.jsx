import { useState } from "react";
import "./styles.css";
import { MdOutlineGridView } from "react-icons/md";
import { TfiViewList } from "react-icons/tfi";

export const ViewCard = () => {
  const names = ["Игорь", "Катя", "Никита", "Вася", "Вадим", "Игнат"];
  const [viewMode, setViewMode] = useState("table");
  const buttons = [
    { name: "table", icon: <MdOutlineGridView color="rgb(239, 101, 101)" /> },
    { name: "list", icon: <TfiViewList color="rgb(239, 101, 101)" /> },
  ];

  const changeViewMode = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="catalog-wrapper">
      <div className="view-card-buttons-wrapper">
        {buttons.map((button) => (
          <button
            className={`view-card-button ${
              viewMode === button.name ? "activeButton" : ""
            }`}
            onClick={() => changeViewMode(button.name)}
          >
            {button.icon}
          </button>
        ))}
      </div>
      <ul
        className={
          viewMode === "table" ? "cards-table-wrapper" : "cards-list-wrapper"
        }
      >
        {names.map((name) => (
          <li className={viewMode === "table" ? "card-table" : "card-list"}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};
