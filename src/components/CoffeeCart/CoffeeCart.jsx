import { useState } from "react";
import { items, syrops } from "./data";
import "./styles.css";
import { LuPlus } from "react-icons/lu";
import { FiMinus } from "react-icons/fi";
import { CoffeeItem } from "./CoffeeItem";

export const CoffeeCart = () => {
  const [cart, setCart] = useState([]);

  const increaseCount = (id) => {
    setCart(
      cart.map((coffee) =>
        coffee.id === id ? { ...coffee, count: coffee.count + 1 } : coffee
      )
    );
  };

  const decreaseCount = (id, count) => {
    if (count > 1) {
      setCart(
        cart.map((coffee) =>
          coffee.id === id ? { ...coffee, count: coffee.count - 1 } : coffee
        )
      );
    } else {
      setCart(cart.filter((coffee) => coffee.id !== id));
    }
  };

  const getTotalCartPrice = () => {
    return cart.reduce((sum, elem) => sum + elem.count * elem.price, 0);
  };

  const totalPrice = getTotalCartPrice();

  console.log(cart);

  return (
    <div className="coffee-wrapper">
      <div className="coffee-cards-wrapper">
        {items.map((item) => (
          <CoffeeItem
            item={item}
            cart={cart}
            setCart={setCart}
            increaseCount={increaseCount}
            decreaseCount={decreaseCount}
          />
        ))}
      </div>
      <h2 className="cart-title">Корзина</h2>
      <div className="coffee-cart-wrapper">
        {cart.map((elem) => (
          <div className="coffee-in-cart">
            <div>
              <p className="coffee-info-cart">
                {elem.title} {elem.price} р
              </p>
              <p className="coffee-info-cart">
                ({elem.isSugar ? "без сахара" : "с сахаром"},{" "}
                {elem.syrop ? elem.syrop : "без сиропа"}, {elem.size} мл)
              </p>
            </div>
            <div className="change-count-coffee-cart-wrapper">
              <button
                className="change-count-coffee increase-count-coffee"
                onClick={() => increaseCount(elem.id)}
              >
                <LuPlus color="green" />
              </button>
              <p className="coffee-count">{elem.count}</p>
              <button
                className="change-count-coffee"
                onClick={() => decreaseCount(elem.id, elem.count)}
              >
                <FiMinus color="red" />
              </button>

              <p className="coffee-price coffee-info-cart">
                {elem.count} шт {elem.count * elem.price} р
              </p>
            </div>
          </div>
        ))}
        <span className="empty-cart">
          {cart.length === 0 ? "Вы не добавили ни одного товара" : ""}{" "}
        </span>
        <p className="total-coffee-price">Всего {totalPrice} р</p>
      </div>
    </div>
  );
};
