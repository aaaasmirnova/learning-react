import { useState } from "react";
import { words } from "./data";
import "./styles.css";

export const GuessTheWordGame = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisibleAnswer, setIsVisibleAnswer] = useState(false);

  const showNextWord = () => {
    let newActiveIndex = activeIndex;
    if (newActiveIndex === words.length - 1) {
      newActiveIndex = 0;
    } else {
      newActiveIndex++;
    }
    setActiveIndex(newActiveIndex);
    setIsVisibleAnswer(false);
  };

  const showAnswer = () => {
    setIsVisibleAnswer(true);
  };

  return (
    <div className="word-game-wrapper">
      <div className="word-wrapper">
        {words[activeIndex][isVisibleAnswer ? "word" : "hidden"]
          .split("")
          .map((letter, index) => (
            <button
              key={index}
              className={`letter-button ${
                letter !== "_" ? "shown-letter-button" : ""
              }`}
            >
              {letter == "_" ? "" : letter}
            </button>
          ))}
      </div>
      <p className="word-description">{words[activeIndex].description}</p>
      <div className="word-game-buttons-wrapper">
        <button
          className="word-game-button word-game-answer-button"
          onClick={showAnswer}
        >
          ПОСМОТРЕТЬ ОТВЕТ
        </button>
        <button className="word-game-button" onClick={showNextWord}>
          СЛЕДУЮЩЕЕ СЛОВО
        </button>
      </div>
    </div>
  );
};
