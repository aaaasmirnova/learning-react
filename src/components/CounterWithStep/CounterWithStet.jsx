import { useState } from "react";
import "./styles.css";

export const CounterWithStep = () => {
  const [count, setCount] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const steps = [1, 5, 10, 20, 50, 100];
  const decreaseCount = () => {
    return count >= activeStep ? setCount(count - activeStep) : 0;
  };

  const chooseStep = (step) => {
    if (activeStep !== step) {
      setActiveStep(step);
    }
  };

  return (
    <div className="counter-wrapper">
      <div className="counter-display-wrapper">
        <p className="count">{count}</p>
        <button onClick={() => setCount(count + activeStep)}>++</button>
        <button disabled={count === 0} onClick={() => decreaseCount()}>
          --
        </button>
        <button disabled={count === 0} onClick={() => setCount(0)}>
          CLEAR
        </button>
      </div>
      <div className="step-display-wrapper">
        <p>Текущий шаг: {activeStep}</p>
        <div className="steps-container">
          {steps.map((step) => (
            <button
              className={`step-changing ${
                activeStep === step ? "activeStep" : ""
              }`}
              onClick={() => chooseStep(step)}
            >
              {step}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
