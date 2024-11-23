import React, { useState } from 'react';
import styles from '../styles/CustomerForm.module.css';

type Props = {
  newCustomer: {
    name: string;
    city: string;
    email: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddCustomer: () => void;
};

const CustomerForm: React.FC<Props> = ({ newCustomer, handleInputChange, handleAddCustomer }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!newCustomer.name) newErrors.name = 'Name is required';
    if (!newCustomer.city) newErrors.city = 'City is required';
    if (!newCustomer.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(newCustomer.email)) newErrors.email = 'Email is invalid';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      handleAddCustomer();
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Add New Customer</h3>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newCustomer.name}
        onChange={handleInputChange}
        className={`${styles.inputField} ${errors.name ? 'border-red-500' : ''}`}
      />
      {errors.name && <p className={styles.error}>{errors.name}</p>}

      <input
        type="text"
        name="city"
        placeholder="City"
        value={newCustomer.city}
        onChange={handleInputChange}
        className={`${styles.inputField} ${errors.city ? 'border-red-500' : ''}`}
      />
      {errors.city && <p className={styles.error}>{errors.city}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={newCustomer.email}
        onChange={handleInputChange}
        className={`${styles.inputField} ${errors.email ? 'border-red-500' : ''}`}
      />
      {errors.email && <p className={styles.error}>{errors.email}</p>}

      <button
        onClick={handleFormSubmit}
        className={styles.button}
        disabled={!newCustomer.name || !newCustomer.city || !newCustomer.email}
      >
        Add Customer
      </button>
    </div>
  );
};

export default CustomerForm;
