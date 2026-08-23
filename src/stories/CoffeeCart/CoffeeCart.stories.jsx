// src/stories/CoffeeCart/CoffeeCart.stories.jsx
import React from 'react';
import { CoffeeCart } from '../../components/CoffeeCart/CoffeeCart';
import '../../components/CoffeeCart/styles.css';

export default {
  title: 'Coffee/CoffeeCart',
  component: CoffeeCart,
  parameters: {
    layout: 'centered',
  },
};

// Пустая корзина
export const EmptyCart = () => <CoffeeCart />;
EmptyCart.storyName = '🛒 Пустая корзина';

// С предзаполненной корзиной
const WithItems = () => {
  const [cart, setCart] = React.useState([
    {
      id: '1',
      title: 'Капучино',
      size: 300,
      price: 300,
      syrop: 'Карамель',
      isSugar: false,
      count: 2,
    },
    {
      id: '2',
      title: 'Латте',
      size: 400,
      price: 370,
      syrop: null,
      isSugar: true,
      count: 1,
    },
  ]);

  return <CoffeeCart cart={cart} setCart={setCart} />;
};

export const WithItemsCart = () => <WithItems />;
WithItemsCart.storyName = '🛒 С товарами в корзине';