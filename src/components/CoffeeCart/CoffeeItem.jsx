import { useState } from "react";
import { syrops } from "./data";
import { LuPlus } from "react-icons/lu";
import { FiMinus } from "react-icons/fi";
import uuid from "react-uuid";
export const CoffeeItem = ({ item, cart, setCart }) => {
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

  const addCoffeToCart = (coffee) => {
    const activePrice = coffee.prices.find(
      (elem) => elem.size === activeVolume
    );

    const activeSyropPrice = activeSyrop ? activeSyrop.price : 0;

    const sameCoffee = cart.find(
      (elem) =>
        elem.title === coffee.title &&
        elem.size === activeVolume &&
        elem.isSugar === sugar &&
        elem.syrop === activeSyrop?.title
    );
    if (sameCoffee) {
      setCart(
        cart.map((elem) =>
          sameCoffee.title === elem.title &&
          sameCoffee.size === elem.size &&
          sameCoffee.syrop === elem.syrop &&
          sameCoffee.isSugar === elem.isSugar
            ? { ...elem, count: elem.count + 1 }
            : elem
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: uuid(),
          title: coffee.title,
          size: activeVolume,
          price: activePrice?.price + activeSyropPrice,
          syrop: activeSyrop?.title,
          isSugar: sugar,
          count: 1,
        },
      ]);
    }
  };
  const getSameCoffee = (title, volume, syrop, sugar) => {
    const coffee = cart.find(
      (coffee) =>
        coffee.title === title &&
        coffee.size === volume &&
        coffee.isSugar === sugar &&
        coffee.syrop === syrop
    );
    return coffee;
  };

  const sameCoffee = getSameCoffee(
    item.title,
    activeVolume,
    activeSyrop?.title,
    sugar
  );

  const decreaseCountInCard = () => {
    if (sameCoffee?.count > 1) {
      setCart(
        cart.map((coffee) =>
          coffee.id === sameCoffee.id
            ? { ...coffee, count: coffee.count - 1 }
            : coffee
        )
      );
    } else {
      setCart(cart.filter((coffee) => coffee.id !== sameCoffee.id));
    }
  };

  const increaseCountInCard = () => {
    setCart(
      cart.map((coffee) =>
        coffee.id === sameCoffee.id
          ? { ...coffee, count: coffee.count + 1 }
          : coffee
      )
    );
  };
  const getPriceOneCoffee = (coffee, volume, syrop) => {
    const activePrice = coffee.prices.find(
      (elem) => elem.size === volume
    )?.price;

    const activeSyropPrice = syrop ? syrop?.price : 0;
    return activePrice + activeSyropPrice;
  };

  return (
    <div className="coffee-card">
      <h2 className="coffee-name">
        {item.title} {getPriceOneCoffee(item, activeVolume, activeSyrop)} руб
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
            onClick={() =>
              increaseCountInCard(
                item.title,
                activeVolume,
                activeSyrop?.title,
                sugar
              )
            }
          >
            <LuPlus color="green" />
          </button>
          <p className="coffee-count">{sameCoffee?.count}</p>
          <button
            className="change-count-coffee"
            onClick={() =>
              decreaseCountInCard(
                item.title,
                activeVolume,
                activeSyrop?.title,
                sugar
              )
            }
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
