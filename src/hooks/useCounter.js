import { useState } from "react";

export const useCounter = (initialCount, initialStep) => {
  const [count, setCount] = useState(initialCount);
  const [activeStep, setActiveStep] = useState(initialStep);

  const decreaseCount = () => {
    if (count >= activeStep) {
      setCount(count - activeStep);
    }
  };

  const increaseCount = () => {
    setCount(count + activeStep);
  };

  const resetCount = () => {
    setCount(0);
  };

  const chooseStep = (step) => {
    setActiveStep(step);
  };

  return {
    count,
    activeStep,
    decreaseCount,
    increaseCount,
    resetCount,
    chooseStep,
  };
};
