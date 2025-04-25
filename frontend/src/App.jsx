import React, { useState } from 'react';
import './App.css';

function App() {
  const indian = [
    { name: 'Butter Naan', price: 40 },
    { name: 'Paneer Curry', price: 120 },
    { name: 'Dal', price: 100 },
    { name: 'Biryani', price: 150 },
    { name: 'Samosa', price: 20 },
    { name: 'Rajma', price: 90 },
    { name: 'Chole', price: 110 },
    { name: 'Aloo Paratha', price: 60 },
    { name: 'Dosa', price: 80 },
    { name: 'Idli', price: 50 }
  ];

  const chinese = [
    { name: 'Fried Rice', price: 100 },
    { name: 'Chilli Chicken', price: 150 },
    { name: 'Hakka Noodles', price: 120 },
    { name: 'Soup', price: 70 },
    { name: 'Spring Roll', price: 60 },
    { name: 'Schezwan Rice', price: 110 },
    { name: 'Hone', price: 90 },
    { name: 'Kung', price: 160 },
    { name: 'Dis', price: 80 },
    { name: 'Hot Garlic Noodles', price: 130 }
  ];

  const japanese = [
    { name: 'Shi', price: 300 },
    { name: 'Ran', price: 250 },
    { name: 'Tem', price: 200 },
    { name: 'Noodles', price: 180 },
    { name: 'Soup', price: 100 },
    { name: 'tori', price: 220 },
    { name: 'Ori', price: 90 },
    { name: 'yaki', price: 240 },
    { name: 'Sami', price: 320 },
    { name: 'Ton', price: 230 }
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price;
  }
  const placeOrder = () => {
    fetch('http://localhost:5000/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart })
    })
    .then(res => res.json())
    .then(() => {
    console.log('Order placed:', cart); 
    alert('Order placed successfully!');
      setCart([]);
    });
  };

  return (
    <div>
      <h1>SanRestaurant</h1>

      <div className="container">
        <div className="mn">
          <h2>Indian</h2>
          {indian.map((item, i) => (
            <div key={i}>
              {item.name} - Rs:{item.price}
              <button onClick={() => addToCart(item)}>Add</button>
            </div>
          ))}

          <h2>Chinese</h2>
          {chinese.map((item, i) => (
            <div key={i}>
              {item.name} - Rs:{item.price}
              <button onClick={() => addToCart(item)}>Add</button>
            </div>
          ))}

          <h2>Japanese</h2>
          {japanese.map((item, i) => (
            <div key={i}>
              {item.name} - Rs:{item.price}
              <button onClick={() => addToCart(item)}>Add</button>
            </div>
          ))}
        </div>

        <div className="ct">
          <h2>Cart</h2>
          {cart.map((item, i) => (
            <div key={i}>{item.name} - Rs:{item.price}</div>
          ))}
          <h3>Total: Rs:{total}</h3>
          <button onClick={placeOrder}>Place Order</button>
        </div>
      </div>
    </div>
  );
}

export default App;
