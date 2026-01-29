import { useGuessWord } from "../../hooks/useGuessWord";

export const GuessTheWord = () => {
  const { letters, showHiddenLetter } = useGuessWord(
    "витиеватый",
    "в_т_ев__ы_"
  );

  console.log(letters);

  return (
    <div className="word-wrapper">
      {letters.map((letter, index) => (
        <button
          key={index}
          className={`letter-button ${
            letter !== "_" ? "shown-letter-button" : ""
          }`}
          onClick={() => showHiddenLetter(index)}
        >
          {letter !== "_" ? letter : ""}
        </button>
      ))}
    </div>
  );
};
