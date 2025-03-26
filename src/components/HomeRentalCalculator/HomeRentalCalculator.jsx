import { useState } from "react";
import "./styles.css";
export const HomeRentalCalculator = () => {
  //   const [currentPrice, setCurrentPrice] = useState(0);
  const [peopleCount, setPeopleCount] = useState(2);
  const [inputNumber, setInputNumber] = useState();
  const [value, setValue] = useState("Будни");
  const [days, setDays] = useState("1");
  const [petsIndex, setPetsIndex] = useState([]);

  const BASE_PRICE = 5000;
  const numbersPeople = [1, 2, 3, 4];
  const pets = ["с котом (+ 1000 рублей)", "с собакой (+ 1000 рублей)"];
  const visitedDays = [
    { name: "1 день", count: "1" },
    { name: "2 дня (скидка 5%)", count: "2" },
    { name: "3 дня (скидка 10%)", count: "3" },
  ];

  const chooseRadioValueDays = (value) => {
    setValue(value);
  };

  const chooseYourOwnNumbersPeople = (event) => {
    setInputNumber(event.target.value);
    setPeopleCount("");
  };

  const chooseNumbersPeople = (number) => {
    setPeopleCount(number);
    setInputNumber("");
  };

  const chooseDays = (value) => {
    setDays(value);
  };

  const getPriceForAdditionalPerson = (number) => {
    let priceForAdditionalPeople = 0;
    if (number > 2) {
      priceForAdditionalPeople = (number - 2) * 500;
    }

    return priceForAdditionalPeople;
  };

  const getPetInfo = (index) => {
    if (!petsIndex.includes(index)) {
      setPetsIndex([...petsIndex, index]);
    } else {
      setPetsIndex(petsIndex.filter((el) => el !== index));
    }
  };

  const getTotalPrice = () => {
    let totalPrice = BASE_PRICE;

    if (value === "Выходные") {
      totalPrice += 2000;
    }

    if ((peopleCount && inputNumber) || inputNumber) {
      totalPrice += getPriceForAdditionalPerson(inputNumber);
    } else if (peopleCount) {
      totalPrice += getPriceForAdditionalPerson(peopleCount);
    }

    if (days === "2") {
      totalPrice = totalPrice * 2 * (1 - 0.05);
    } else if (days === "3") {
      totalPrice = totalPrice * 3 * (1 - 0.1);
    }

    for (let i = 0; i < petsIndex.length; i++) {
      totalPrice += 1000;
    }

    return totalPrice;
  };

  const totalPrice = getTotalPrice();

  return (
    <div>
      <h1 className="rental-calculator-title">Калькулятор аренды дома</h1>
      <img
        src="https://scandiecodom.ru/wp-content/uploads/2023/01/proekt-karkasnogo-doma-kd-380-1.jpg"
        width="280"
        height="200"
        alt="Каркасный дом."
      ></img>
      <p className="base-rental-price">Базовая цена: 5000 руб.</p>
      <div className="radio-group-wrapper">
        <div className="radio-item-wrapper">
          <input
            type="radio"
            id="workday"
            checked={value === "Будни"}
            value="Будни"
            onChange={() => chooseRadioValueDays("Будни")}
          ></input>
          <label for="workday" className="rental-calculator-text">
            Будни
          </label>
        </div>

        <div className="radio-item-wrapper">
          <input
            type="radio"
            id="day-off"
            value="Выходные"
            checked={value === "Выходные"}
            onChange={() => chooseRadioValueDays("Выходные")}
          ></input>
          <label for="day-off" className="rental-calculator-text">
            Выходные (+ 2000 руб.)
          </label>
        </div>
      </div>

      <p className="rental-calculator-text">Выберите кол-во человек:</p>
      <div className="number-people-buttons-wrapper">
        {numbersPeople.map((number) => (
          <button
            onClick={() => chooseNumbersPeople(number)}
            className={`number-people-button ${
              peopleCount === number ? "active-number-people-button" : ""
            }`}
          >
            {number} чел.
          </button>
        ))}
      </div>
      <div>
        <label for="required-value" className="rental-calculator-text">
          Или введите свое значение:
        </label>
        <input
          type="number"
          id="required-value"
          value={inputNumber}
          onChange={chooseYourOwnNumbersPeople}
        ></input>
        <p>(если более 2-х человек, доплата 500р с человека)</p>
      </div>
      <div className="radio-group-wrapper">
        {visitedDays.map((elem) => (
          <div className="radio-item-wrapper">
            <input
              type="radio"
              id="numbersDaysChoice1"
              name="days"
              value={elem.count}
              checked={days === elem.count}
              onChange={() => chooseDays(elem.count)}
            ></input>
            <label for="numbersDaysChoice1" className="rental-calculator-text">
              {elem.name}
            </label>
          </div>
        ))}
      </div>
      {pets.map((pet, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id="pet"
            onChange={() => getPetInfo(index)}
          ></input>
          <label for="pet" className="rental-calculator-text">
            {pet}
          </label>
        </div>
      ))}
      <p>{totalPrice}</p>
    </div>
  );
};
