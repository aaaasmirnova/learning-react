import { useState } from "react";
import { questions } from "./data";
// import "./styles.css";

export const QuestionsApp2 = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const changeActiveIndex = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div>
      <ul>
        {questions.map((elem, index) => (
          <li>
            <p>{elem.question}</p>
            {activeIndex === index && <p> {elem.answer}</p>}
            <button onClick={() => changeActiveIndex(index)} className="button">
              {activeIndex === index ? "Скрыть ответ" : "Показать ответ"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
