import { useEffect, useRef } from "react";

export const InputWithUseRef = () => {
  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);
  return (
    <>
      <input type="text" ref={usernameRef} />
      <button onClick={() => console.log(usernameRef.current.value)}>
        Show
      </button>
      <button
        onClick={() => {
          usernameRef.current.value = "";
        }}
      >
        Clear
      </button>
    </>
  );
};
