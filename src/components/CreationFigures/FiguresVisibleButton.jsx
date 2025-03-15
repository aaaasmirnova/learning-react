export const FiguresVisibleButton = ({
  isVisible,
  showOthersFigures,
  hiddenOthersFigures,
}) => {
  {
    isVisible ? (
      list.length > 8 && (
        <button onClick={showOthersFigures}>
          Посмотреть остальные ({list.length - 8})
        </button>
      )
    ) : (
      <button onClick={hiddenOthersFigures}>Скрыть фигуры</button>
    );
  }
};
