import React, { useState, useEffect } from "react";
import { Customer } from "../types";
import styles from "../styles/CustomerForm.module.css";

interface CustomerFormProps {
    onAddCustomer: (customer: Customer) => void;
    onUpdateCustomer: (updatedCustomer: Customer) => void;
    selectedCustomer: Customer | null;
  }
  
  const CustomerForm: React.FC<CustomerFormProps> = ({
    onAddCustomer,
    onUpdateCustomer,
    selectedCustomer,
  }) => {
    const [formData, setFormData] = useState<Customer>({
      customerId: "",
      name: "",
      city: "",
      contactNumber: "",
      year: "",
      photo: "",
      totalPurchasesPerYear: 0,
    });
  
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const validationErrors: { [key: string]: string } = {};
  
      if (!formData.name) validationErrors.name = "Name is required.";
      if (!formData.city) validationErrors.city = "City is required.";
      if (!formData.contactNumber || formData.contactNumber.length !== 10) {
        validationErrors.contactNumber = "Contact Number must be 10 digits.";
      }
      if (!formData.year) validationErrors.year = "Year is required.";
      if (!formData.totalPurchasesPerYear)
        validationErrors.totalPurchasesPerYear = "Total Purchases are required.";
  
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
  
      if (selectedCustomer) {
        onUpdateCustomer(formData);
      } else {
        onAddCustomer(formData);
      }
  
      setFormData({
        customerId: "",
        name: "",
        city: "",
        contactNumber: "",
        year: "",
        photo: "",
        totalPurchasesPerYear: 0,
      });
    };
  
    useEffect(() => {
      if (selectedCustomer) {
        setFormData(selectedCustomer);
      }
    }, [selectedCustomer]);
  
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className={styles.input}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
  
        <div className={styles["form-group"]}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className={styles.input}
          />
          {errors.city && <span className={styles.error}>{errors.city}</span>}
        </div>
  
        <div className={styles["form-group"]}>
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            className={styles.input}
          />
          {errors.contactNumber && (
            <span className={styles.error}>{errors.contactNumber}</span>
          )}
        </div>
  
        <div className={styles["form-group"]}>
          <label htmlFor="year">Year</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Year"
            className={styles.input}
          />
          {errors.year && <span className={styles.error}>{errors.year}</span>}
        </div>
  
        <div className={styles["form-group"]}>
          <label htmlFor="photo">Photo URL</label>
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="Photo URL"
            className={styles.input}
          />
        </div>
  
        <div className={styles["form-group"]}>
          <label htmlFor="totalPurchasesPerYear">Total Purchases Per Year</label>
          <input
            type="number"
            name="totalPurchasesPerYear"
            value={formData.totalPurchasesPerYear}
            onChange={handleChange}
            placeholder="Total Purchases Per Year"
            className={styles.input}
          />
          {errors.totalPurchasesPerYear && (
            <span className={styles.error}>{errors.totalPurchasesPerYear}</span>
          )}
        </div>
  
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            {selectedCustomer ? "Update Customer" : "Add Customer"}
          </button>
        </div>
      </form>
    );
  };
  
  export default CustomerForm;