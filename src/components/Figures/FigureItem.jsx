const FigureItem = ({ isDark, form, color }) => {
  return (
    <div className={`block ${form} ${color} ${isDark ? "dark" : ""}`}></div>
  );
};

export default FigureItem;
