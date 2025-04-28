import { useState } from "react";
import { syrops } from "./data";
import { LuPlus } from "react-icons/lu";
import { FiMinus } from "react-icons/fi";
import uuid from "react-uuid";
export const CoffeeItem = ({
  item,
  cart,
  setCart,
  increaseCount,
  decreaseCount,
}) => {
  const [activeVolume, setActiveVolume] = useState(item.prices[0].size);
  const [activeSyrop, setActiveSyrop] = useState(null);
  const [sugar, setSugar] = useState(false);

  const changeActiveVolume = (event) => {
    setActiveVolume(Number(event.target.value));
  };

  const chooseSyrop = (syrop) => {
    setActiveSyrop(syrop);
  };

  const changeSugar = () => {
    setSugar(!sugar);
  };

  const getSameCoffee = () => {
    const coffee = cart.find(
      (coffee) =>
        coffee.title === item.title &&
        coffee.size === activeVolume &&
        coffee.isSugar === sugar &&
        coffee.syrop === activeSyrop?.title
    );
    return coffee;
  };

  const sameCoffee = getSameCoffee();

  const getPriceOneCoffee = () => {
    const activePrice = item.prices.find(
      (elem) => elem.size === activeVolume
    )?.price;

    const activeSyropPrice = activeSyrop ? activeSyrop?.price : 0;
    return activePrice + activeSyropPrice;
  };

  const addCoffeToCart = (coffee) => {
    setCart([
      ...cart,
      {
        id: uuid(),
        title: coffee.title,
        size: activeVolume,
        price: getPriceOneCoffee(),
        syrop: activeSyrop?.title,
        isSugar: sugar,
        count: 1,
      },
    ]);
  };

  return (
    <div className="coffee-card">
      <h2 className="coffee-name">
        {item.title} {getPriceOneCoffee()} руб
      </h2>
      <select
        className="coffee-volume"
        value={activeVolume}
        onChange={(event) => changeActiveVolume(event)}
      >
        {item.prices.map((elem, index) => (
          <option value={elem.size} key={index}>
            {elem.size} мл / {elem.price} руб
          </option>
        ))}
      </select>
      <button
        className={`coffee-syrop-button ${
          activeSyrop === null ? "active-syrop-button" : ""
        }`}
        onClick={() => chooseSyrop(null)}
      >
        Без сиропа
      </button>
      {syrops.map((syrop) => (
        <button
          className={`coffee-syrop-button ${
            activeSyrop?.title === syrop.title ? "active-syrop-button" : ""
          }`}
          onClick={() => chooseSyrop(syrop)}
        >
          {syrop.title}
        </button>
      ))}
      <div className="sugar-checkbox">
        <input
          type="checkbox"
          checked={sugar}
          onChange={() => changeSugar()}
          id="sugar"
        />
        <label htmlFor="sugar">Без сахара</label>
      </div>
      {sameCoffee?.count > 0 ? (
        <div className="change-count-coffee-card-wrapper">
          <button
            className="change-count-coffee increase-count-coffee"
            onClick={() => increaseCount(sameCoffee.id)}
          >
            <LuPlus color="green" />
          </button>
          <p className="coffee-count">{sameCoffee?.count}</p>
          <button
            className="change-count-coffee"
            onClick={() => decreaseCount(sameCoffee.id, sameCoffee.count)}
          >
            <FiMinus color="red" />
          </button>
        </div>
      ) : (
        <button
          className="add-coffee-button"
          onClick={() => addCoffeToCart(item)}
        >
          Добавить
        </button>
      )}
    </div>
  );
};
