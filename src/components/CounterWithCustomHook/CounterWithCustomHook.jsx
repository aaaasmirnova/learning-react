import { useCounter } from "../../hooks/useCounter";
import "./styles.css";

export const CounterWithCustomHook = () => {
  const {
    count,
    activeStep,
    decreaseCount,
    increaseCount,
    resetCount,
    chooseStep,
  } = useCounter(0, 1);
  const steps = [1, 5, 10, 20, 50, 100];

  return (
    <div className="counter-wrapper">
      <div className="counter-display-wrapper">
        <p className="count">{count}</p>
        <button onClick={increaseCount}>++</button>
        <button disabled={count === 0} onClick={decreaseCount}>
          --
        </button>
        <button disabled={count === 0} onClick={resetCount}>
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
