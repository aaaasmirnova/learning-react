// src/stories/CoffeeCart/CoffeeItem.stories.jsx
import React from 'react';
import { CoffeeItem } from '../../components/CoffeeCart/CoffeeItem';
import { items, syrops } from './data';
import '../../components/CoffeeCart/styles.css';

export default {
  title: 'Coffee/CoffeeItem',
  component: CoffeeItem,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

// ============================================================
// 1. ЦЕЛАЯ КАРТОЧКА (разные состояния)
// ============================================================

// 🔵 Дефолтное состояние (без активных кнопок)
export const Default = () => {
  const [cart, setCart] = React.useState([]);
  
  return (
    <CoffeeItem
      item={items[0]}
      cart={cart}
      setCart={setCart}
      increaseCount={() => {}}
      decreaseCount={() => {}}
    />
  );
};
Default.storyName = '☕ Дефолтное состояние';

export const ActiveSyropButton = () => {
  const [cart, setCart] = React.useState([]);
  
  return (
    <CoffeeItem
      item={items[1]}
      cart={cart}
      setCart={setCart}
      increaseCount={() => {}}
      decreaseCount={() => {}}
      defaultSyrop={syrops[0]}  // ← Карамель активна!
    />
  );
};
ActiveSyropButton.storyName = '🔴 Карточка с активным сиропом';

// 🔄 Уже в корзине
export const InCartWithButtons = () => {
  const [cart, setCart] = React.useState([
    {
      id: '1',
      title: 'Капучино',
      size: 300,
      price: 300,
      syrop: null,
      isSugar: false,
      count: 2,
    },
  ]);
  
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

  return (
    <CoffeeItem
      item={items[1]}
      cart={cart}
      setCart={setCart}
      increaseCount={increaseCount}
      decreaseCount={decreaseCount}
    />
  );
};
InCartWithButtons.storyName = '🔄 Уже в корзине';

// ============================================================
// 2. ОТДЕЛЬНЫЕ КНОПКИ (изолированные состояния)
// ============================================================

// 🟣 Кнопка "Без сиропа" (неактивная)
export const NoSyropButtonDefault = () => (
  <button className="coffee-syrop-button">
    Без сиропа
  </button>
);
NoSyropButtonDefault.storyName = '🔘 Кнопка "Без сиропа" (обычная)';

// 🔴 Кнопка "Без сиропа" (активная — красная обводка)
export const NoSyropButtonActive = () => (
  <button className="coffee-syrop-button active-syrop-button">
    Без сиропа
  </button>
);
NoSyropButtonActive.storyName = '🔴 Кнопка "Без сиропа" (активная)';

// 🟣 Кнопка сиропа (неактивная)
export const SyropButtonDefault = () => (
  <button className="coffee-syrop-button">
    Карамель
  </button>
);
SyropButtonDefault.storyName = '🔘 Кнопка сиропа (обычная)';

// 🔴 Кнопка сиропа (активная — красная обводка)
export const SyropButtonActive = () => (
  <button className="coffee-syrop-button active-syrop-button">
    Карамель
  </button>
);
SyropButtonActive.storyName = '🔴 Кнопка сиропа (активная)';

// 🟢 Кнопка "Добавить" (обычная)
export const AddButtonDefault = () => (
  <button className="add-coffee-button">
    Добавить
  </button>
);
AddButtonDefault.storyName = '🔘 Кнопка "Добавить" (обычная)';

// 🟢 Кнопка "Добавить" (активная — зелёная обводка с подсветкой)
export const AddButtonActive = () => (
  <button 
    className="add-coffee-button"
    style={{
      border: '2px solid rgb(70, 170, 70)',
      color: 'rgb(70, 170, 70)',
      backgroundColor: 'rgba(70, 170, 70, 0.1)',
    }}
  >
    ✅ Добавить
  </button>
);
AddButtonActive.storyName = '🟢 Кнопка "Добавить" (активная)';

// 🔴 Кнопка "-" (уменьшить количество)
export const MinusButton = () => (
  <button 
    className="change-count-coffee"
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '30px',
      height: '30px',
      backgroundColor: 'white',
      border: '2px solid rgb(230, 52, 52)',
      borderRadius: '5px',
      cursor: 'pointer',
    }}
  >
    <span style={{ color: 'red', fontSize: '20px', fontWeight: 'bold' }}>−</span>
  </button>
);
MinusButton.storyName = '🔴 Кнопка "-" (уменьшить)';

// 🟢 Кнопка "+" (увеличить количество)
export const PlusButton = () => (
  <button 
    className="change-count-coffee increase-count-coffee"
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '30px',
      height: '30px',
      backgroundColor: 'white',
      border: '2px solid green',
      borderRadius: '5px',
      cursor: 'pointer',
    }}
  >
    <span style={{ color: 'green', fontSize: '20px', fontWeight: 'bold' }}>+</span>
  </button>
);
PlusButton.storyName = '🟢 Кнопка "+" (увеличить)';

// 🔴🟢 Кнопки "+" и "-" вместе (в корзине)
export const PlusMinusButtonsTogether = () => (
  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
    <button 
      className="change-count-coffee increase-count-coffee"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30px',
        height: '30px',
        backgroundColor: 'white',
        border: '2px solid green',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      <span style={{ color: 'green', fontSize: '20px', fontWeight: 'bold' }}>+</span>
    </button>
    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1890a0' }}>2</span>
    <button 
      className="change-count-coffee"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30px',
        height: '30px',
        backgroundColor: 'white',
        border: '2px solid rgb(230, 52, 52)',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      <span style={{ color: 'red', fontSize: '20px', fontWeight: 'bold' }}>−</span>
    </button>
  </div>
);
PlusMinusButtonsTogether.storyName = '🔴🟢 Кнопки + и - (вместе)';

// ============================================================
// 3. ИНТЕРАКТИВНАЯ ИСТОРИЯ С CONTROLS
// ============================================================

// 🎮 Интерактивная песочница (можно менять пропсы через панель Controls)
export const Interactive = {
  args: {
    item: items[0],
    defaultSyrop: "Карамельный",
  },
  argTypes: {
    item: {
      control: 'object',
      description: 'Данные о кофе (название, цены, размеры)',
    },
    defaultSyrop: {
  control: 'select',
  options: ['null', 'Карамельный', 'Ореховый'],
  description: 'Сироп по умолчанию',
}
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cart, setCart] = React.useState([]);

    const getSyrop = (value) => {
  if (value === 'null') return null;
  if (value === 'Карамельный') return syrops[0];
  if (value === 'Ореховый') return syrops[1];
  return null;
};
    
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

    return (
      <CoffeeItem
        {...args}
        cart={cart}
        setCart={setCart}
        increaseCount={increaseCount}
        decreaseCount={decreaseCount}
         defaultSyrop={getSyrop(args.defaultSyrop)}
      />
    );
  },
};
Interactive.storyName = '🎮 Интерактивная (Controls)';