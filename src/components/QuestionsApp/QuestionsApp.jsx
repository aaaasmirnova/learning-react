import { useState } from "react";
import { questions } from "./data";
import "./styles.css";

export const QuestionsApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const changeVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button onClick={changeVisible} className="button">
        {isVisible ? "Скрыть ответы" : "Показать ответы"}
      </button>
      <ul>
        {questions.map((elem) => (
          <li>
            <p>{elem.question}</p>
            {isVisible && <p> {elem.answer}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};
