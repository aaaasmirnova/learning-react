import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);
  const checkValue = () => {
    return count > 0 ? setCount(count - 1) : 0;
  };
  return (
    <div>
      <p>{count}</p>
      <button className="decrease" onClick={() => checkValue()}>
        -
      </button>
      <button className="reset" onClick={() => setCount(0)}>
        Reset
      </button>
      <button className="increase" onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  );
};
