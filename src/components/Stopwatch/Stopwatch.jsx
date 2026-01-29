import { useState } from "react";

export const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [timerId, setTimerId] = useState(null);

  const startTimer = () => {
    const newTimerId = setInterval(() => setTime((time) => time + 10), 10);
    setTimerId(newTimerId);
  };

  const stopTimer = () => {
    clearInterval(timerId);
  };

  const clearTimer = () => {
    setTime(0);
    stopTimer();
  };

  const getTime = (totalTime) => {
    const milliseconds = (totalTime % 1000) / 10;
    const seconds = Math.floor(totalTime / 1000) % 60;
    const minutes = Math.floor(totalTime / 1000 / 60) % 60;

    return `${minutes < 10 ? "0" + minutes : minutes} : ${
      seconds < 10 ? "0" + seconds : seconds
    } : ${milliseconds < 10 ? "0" + milliseconds : milliseconds}`;
  };

  return (
    <div>
      <p>{getTime(time)}</p>
      <button onClick={startTimer}>Старт</button>
      <button onClick={stopTimer}>Пауза</button>
      <button onClick={clearTimer}>сброс</button>
    </div>
  );
};
