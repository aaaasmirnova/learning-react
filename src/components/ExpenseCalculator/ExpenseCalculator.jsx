import { useState } from "react";
import "./styles.css";
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const icons = [
  "⏰",
  "🎰",
  "🎸",
  "🥁",
  "🏀",
  "🚗",
  "🚬",
  "🛍",
  "🎁",
  "📕",
  "🍔",
  "⚰️",
  "🛏",
];

export const ExpenseCalculator = () => {
  const [nameCategory, setNameCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [activeIcon, setActiveIcon] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [activeCategory, setActiveCategory] = useState();
  const [activeNumbers, setActiveNumbers] = useState("");

  const changeNameCategory = (event) => {
    setNameCategory(event.target.value);
  };

  const addNewCategory = () => {
    if (
      nameCategory.trim() === "" ||
      categories.find((elem) => elem.category === nameCategory)
    )
      return;

    setCategories([
      ...categories,
      { category: nameCategory, icon: activeIcon, expense: 0 },
    ]);

    if (!activeCategory) {
      setActiveCategory(nameCategory);
    }
    setNameCategory("");
    setShowIcons(false);
    setActiveIcon(false);
  };

  const getIcon = (elem) => {
    setActiveIcon(elem);
    setShowIcons(false);
  };

  const chooseIcon = () => {
    setShowIcons(true);
  };

  const getAnotherIcon = () => {
    setShowIcons(true);
  };

  const changeCategory = (event) => {
    setActiveCategory(event.target.value);
  };

  const addNumber = (number) => {
    setActiveNumbers(activeNumbers + number);
  };

  const addExpense = () => {
    setCategories(
      categories.map((category) =>
        category.category === activeCategory
          ? { ...category, expense: category.expense + activeNumbers }
          : category
      )
    );
    setActiveNumbers("");
  };

  const clearExpense = () => {
    setActiveNumbers("");
  };

  return (
    <div className="expense-calculator-wrapper">
      <h1 className="expense-calculator-title">Приложение по учету расходов</h1>
      {categories.map((elem) => (
        <p className="category-info">
          {elem.icon} {elem.category} {elem.expense} рублей
        </p>
      ))}
      <h2 className="expense-calculator-title-second">Добавить категорию:</h2>
      {activeIcon && <p>Выбранная иконк: {activeIcon}</p>}
      <div className="adding-category-wrapper">
        <div className="expense-calculator-input-wrapper">
          <label for="category">Введите название:</label>
          <input
            type="text"
            id="category"
            value={nameCategory}
            onChange={changeNameCategory}
          />
        </div>
        {showIcons ? (
          <div className="icons-wrapper">
            {icons.map((elem) => (
              <button className="icon-button" onClick={() => getIcon(elem)}>
                {elem}
              </button>
            ))}
          </div>
        ) : activeIcon ? (
          <button
            className="expense-calculator-button"
            onClick={getAnotherIcon}
          >
            🤔 Изменить иконку
          </button>
        ) : (
          <button className="expense-calculator-button" onClick={chooseIcon}>
            🤔 Выбрать иконку
          </button>
        )}

        <button className="expense-calculator-button" onClick={addNewCategory}>
          ✅ Новая категория
        </button>
      </div>
      <h2 className="expense-calculator-title-second">Добавить трату:</h2>
      <select value={activeCategory} onChange={changeCategory}>
        {categories.map((elem) => (
          <option value={elem.category}>{elem.category}</option>
        ))}
      </select>
      <p>{activeNumbers} рублей</p>
      <div className="calculator-wrapper">
        {numbers.map((number) => (
          <button
            className="calculator-button"
            onClick={() => addNumber(number)}
          >
            {number}
          </button>
        ))}
      </div>

      <button className="calculator-clear-button" onClick={clearExpense}>
        Очистить
      </button>
      <button
        className="calculator-add-button"
        onClick={addExpense}
        disabled={activeNumbers.length === 0}
      >
        ✅ Добавить
      </button>
    </div>
  );
};
