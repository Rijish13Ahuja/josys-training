import React, { useState } from "react";
import styles from "../styles/ProductDetails.module.css";
const ProductDetails: React.FC = () => {
  const [itemName, setItemName] = useState<string>("");
  const [pricePerUnit, setPricePerUnit] = useState<number | string>("");
  const [quantity, setQuantity] = useState<number | string>("");
  const [total, setTotal] = useState<string>("Result:");
  const calculateTotal = () => {
    const price = parseFloat(pricePerUnit as string);
    const qty = parseInt(quantity as string, 10);
    if (isNaN(price) || isNaN(qty)) {
      alert("Enter valid numbers for price and quantity.");
      return;
    }
    let discount = 0;
    if (qty > 30) {
      discount = 0.2;
    } else if (qty > 20) {
      discount = 0.15;
    } else if (qty > 10) {
      discount = 0.1;
    }
    const totalAmount = price * qty * (1 - discount);
    setTotal(`Total Amount: $${totalAmount.toFixed(2)}`);
  };
  return (
    <div className={styles.operationsContainer}>
      <h2>Products</h2>
      <label htmlFor="item">Product Name:</label>
      <input
        type="text"
        id="item"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Enter product name"
      />
      <label htmlFor="price">Price per Unit:</label>
      <input
        type="number"
        id="price"
        value={pricePerUnit}
        onChange={(e) => setPricePerUnit(e.target.value)}
        placeholder="Enter price"
      />
      <label htmlFor="qty">Quantity:</label>
      <input
        type="number"
        id="qty"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Enter quantity"
      />
      <button onClick={calculateTotal}>Calculate Total</button>
      <h3 className={styles.total}>{total}</h3>
    </div>
  );
};
export default ProductDetails;