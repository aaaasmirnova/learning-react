import "./styles.css";

export const Button = ({
  text,
  backgroundColor,
  isDisabled,
  hasBorderRadius,
  hasBorder,
  hasUpperCaseText,
}) => {
  return (
    <button
      className={`button ${hasBorderRadius ? "hasBorderRadius" : ""} ${
        hasBorder ? "hasBorder" : ""
      } ${hasUpperCaseText ? "hasUpperCaseText" : ""}`}
      style={{ background: backgroundColor }}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};
