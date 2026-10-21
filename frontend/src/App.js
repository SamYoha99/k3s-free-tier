import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  // Update this to your EC2 public IP or use an Ingress rule
  const API_URL = `http://${window.location.hostname}:30005/api/items`;

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    const newItem = await res.json();
    setItems([...items, newItem]);
    setName('');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Three-Tier App on Kubernetes</h1>
      <form onSubmit={handleSubmit}>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter item name" 
        />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {items.map((item, index) => <li key={index}>{item.name}</li>)}
      </ul>
    </div>
  );
}

export default App;