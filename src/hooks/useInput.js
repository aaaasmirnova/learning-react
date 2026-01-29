import { useState } from "react";

export const useInput = (initialValue, isRequired) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleBlur = () => {
    if (!value.trim() && isRequired) {
      setError("Заполните обязательное поле");
    } else {
      setError("");
    }
  };

  return {
    value,
    onChange: handleChange,
    onBlur: handleBlur,
    error,
  };
};
