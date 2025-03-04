import { useState } from "react";
import { pizzaCatalog } from "./data";
import { LuPlus } from "react-icons/lu";
import { FiMinus } from "react-icons/fi";
import "./styles.css";

export const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (newPizza) => {
    const samePizza = cart.find((elem) => elem.id === newPizza.id);
    if (samePizza) {
      setCart(
        cart.map((pizza) =>
          samePizza.id === pizza.id
            ? { ...pizza, count: pizza.count + 1 }
            : pizza
        )
      );
    } else {
      setCart([...cart, { ...newPizza, count: 1 }]);
    }
  };

  const totalSum = () => {
    return cart.reduce((sum, elem) => sum + elem.count * elem.price, 0);
  };

  const increaseCount = (id) => {
    setCart(
      cart.map((pizza) =>
        pizza.id === id ? { ...pizza, count: pizza.count + 1 } : pizza
      )
    );
  };

  const decreaseCount = (id, count) => {
    if (count > 1) {
      setCart(
        cart.map((pizza) =>
          pizza.id === id ? { ...pizza, count: pizza.count - 1 } : pizza
        )
      );
    } else {
      setCart(cart.filter((pizza) => pizza.id !== id));
    }
  };

  const getSamePizzaCount = (id) => {
    const pizza = cart.find((pizza) => pizza.id === id);
    return pizza ? pizza.count : 0;
  };

  const decreaseCountInCard = (id) => {
    if (getSamePizzaCount(id) > 1) {
      setCart(
        cart.map((pizza) =>
          pizza.id === id ? { ...pizza, count: pizza.count - 1 } : pizza
        )
      );
    } else {
      setCart(cart.filter((pizza) => pizza.id !== id));
    }
  };

  return (
    <div className="pizza-wrapper">
      <div className="pizza-catalog">
        {pizzaCatalog.map((pizza) => (
          <div className="pizza-card" key={pizza.id}>
            <h1 className="pizza-name">{pizza.name}</h1>
            <p className="pizza-price">{pizza.price}</p>
            {getSamePizzaCount(pizza.id) > 0 ? (
              <div className="change-count-pizza-card-wrapper">
                <button
                  className="change-count-pizza"
                  onClick={() => increaseCount(pizza.id)}
                >
                  <LuPlus />
                </button>
                <p>{getSamePizzaCount(pizza.id)}</p>
                <button
                  className="change-count-pizza"
                  onClick={() => decreaseCountInCard(pizza.id)}
                >
                  <FiMinus />
                </button>
              </div>
            ) : (
              <button className="add-pizza" onClick={() => addToCart(pizza)}>
                ДОБАВИТЬ
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="cart">
        {cart.map((elem) => (
          <div className="cart-pizza-wrapper">
            <div className="cart-pizza-inner-wrapper">
              <p className="pizza-name pizza-name-cart">{elem.name}</p>
              <div className="change-count-pizza-cart-wrapper">
                <button
                  className="change-count-pizza"
                  onClick={() => increaseCount(elem.id)}
                >
                  <LuPlus />
                </button>
                <p>{elem.count}</p>
                <button
                  className="change-count-pizza"
                  onClick={() => decreaseCount(elem.id, elem.count)}
                >
                  <FiMinus />
                </button>
              </div>
              <p className="pizza-one-price">{elem.count * elem.price}</p>
            </div>
          </div>
        ))}
        {cart.length > 0 && <p className="pizza-price-total">{totalSum()}</p>}
      </div>
    </div>
  );
};
