// src/components/TopPurchasers.tsx
import React from "react";
import { Customer } from "../types";
import styles from "../styles/TopPurchasers.module.css";

interface TopPurchasersProps {
  customers: Customer[];
}

const TopPurchasers: React.FC<TopPurchasersProps> = ({ customers }) => {
  const top5Purchasers = [...customers]
    .sort((a, b) => b.totalPurchasesPerYear - a.totalPurchasesPerYear)
    .slice(0, 5);

  return (
    <div className={styles.topPurchasers}>
      <h2>Top 5 Purchasers</h2>
      <div className={styles.cardContainer}>
        {top5Purchasers.map((customer) => (
          <div key={customer.customerId} className={styles.card}>
            <img
              src={customer.photo || "default-profile.png"}
              alt={`Photo of ${customer.name}`}
              className={styles.cardImage}
            />
            <div className={styles.cardDetails}>
              <h3>{customer.name}</h3>
              <p>{customer.city || "City not provided"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPurchasers;
