import React, { useState } from 'react';
import useStorage from '../hooks/useStorage';
import '../App.css';

const LocalStorageDemo: React.FC = () => {
  const { addItem, getItem, removeItem, clearStorage } = useStorage();
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [retrievedValue, setRetrievedValue] = useState<string | null>(null);

  const handleAdd = () => {
    addItem(key, value);
    alert(`Added: ${key} -> ${value}`);
  };

  const handleGet = () => {
    const storedValue = getItem(key);
    setRetrievedValue(storedValue);
  };

  const handleRemove = () => {
    removeItem(key);
    alert(`Removed: ${key}`);
  };

  const handleClear = () => {
    clearStorage();
    alert('Cleared all storage!');
  };

  return (
    <div className="container">
      <h1>Local Storage Manager</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Enter key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="buttons">
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleGet}>Get</button>
        <button onClick={handleRemove}>Remove</button>
        <button onClick={handleClear}>Clear All</button>
      </div>
      {retrievedValue !== null && (
        <div className="result">
          <h2>Retrieved Value:</h2>
          <p>{retrievedValue}</p>
        </div>
      )}
    </div>
  );
};

export default LocalStorageDemo;
