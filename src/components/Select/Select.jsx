import "./styles.css";

export const Select = ({ options }) => {
  return (
    <select className="">
      {options.map((elem, index) => (
        <option key={index}>{elem}</option>
      ))}
    </select>
  );
};
