import { useEffect, useState } from "react";
import { GiTomato } from "react-icons/gi";

export const PomadoroTimer = () => {
  const [time, setTime] = useState(10);
  const [isWorking, setIsWorking] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    if (time === 0) {
      setIsWorking(!isWorking);
      setTime(isWorking ? 5 : 10);

      if (!isWorking) {
        setCount(count + 1);
      }
    }
    return () => clearInterval(interval);
  }, [time, isWorking, isActive]);

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsWorking(true);
    setTime(10);
    setIsActive(false);
    setCount(0);
  };

  const getArray = () => {
    const pomodoros = [];
    for (let i = 1; i <= count; i++) {
      pomodoros.push(i);
    }
    return pomodoros;
  };

  const pomodoros = getArray();

  return (
    <div>
      <p>{isWorking ? "Work Time" : "Rest Time"}</p>
      <p>{time}</p>
      <button onClick={startTimer}>start</button>
      <button onClick={stopTimer}>stop</button>
      <button onClick={resetTimer}>reset</button>

      {pomodoros.map(() => (
        <GiTomato color="red" />
      ))}
    </div>
  );
};
