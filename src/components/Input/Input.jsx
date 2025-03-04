import "./styles.css";

export const Input = ({ placeholder, type, labelText }) => {
  return (
    <>
      <label for="e-mail">{labelText}:</label>
      <input
        className="field"
        type={type}
        id="e-mail"
        placeholder={placeholder}
      ></input>
    </>
  );
};
