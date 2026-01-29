import { useState } from "react";
import { usePrevious } from "../../hooks/usePrevious";

export const CounterWithUsePrevious = () => {
  const [value, setValue] = useState(0);
  const lastValue = usePrevious(value);

  return (
    <div>
      <p>
        Текущее: {value} - Предыдущее: {lastValue}
      </p>
      <button onClick={() => setValue(value + 1)}>Увеличить</button>
    </div>
  );
};
