import { useInput } from "../../hooks/useInput";
import "./styles.css";

export const InputWithCustomHook = () => {
  const name = useInput("hello world", true);

  return (
    <div>
      <form>
        <input {...name} className={name.error ? "error" : ""} />
        {name.error && <span style={{ color: "red" }}>{name.error}</span>}
      </form>
    </div>
  );
};
