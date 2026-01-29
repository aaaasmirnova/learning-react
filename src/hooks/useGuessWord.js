import { useState } from "react";

export const useGuessWord = (answer, word) => {
  const [letters, setLetters] = useState(word.split(""));

  const showHiddenLetter = (index) => {
    const newLetters = [...letters];
    newLetters[index] = answer[index];
    setLetters(newLetters);
  };

  return { letters, showHiddenLetter };
};
