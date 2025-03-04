import { useState } from "react";
import { user } from "./Data";
import "./styles.css";

export const UserData = () => {
  const [activeButton, setActiveButton] = useState(null);
  const changeActiveButton = (key) => {
    if (activeButton !== key) {
      setActiveButton(key);
    }
  };

  return (
    <div>
      <div className="buttons-wrapper">
        {Object.keys(user).map((key) => (
          <button
            className={`info ${activeButton === key ? "active" : ""}`}
            onClick={() => changeActiveButton(key)}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="result-wrapper">
        <p>{user[activeButton]}</p>
      </div>
    </div>
  );
};
