import React, { useState, useEffect } from "react";
import styles from "../styles/CustomerForm.module.css";

interface Customer {
  customerId: string;
  name: string;
  city: string;
  contactNumber: string;
  year: number;
  photo: string;
  totalPurchasesPerYear: number;
}

interface CustomerFormProps {
  onAddCustomer: (customer: Customer) => void;
  onUpdateCustomer: (updatedCustomer: Customer) => void;
  selectedCustomer: Customer | null;
  setSelectedCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  onAddCustomer,
  onUpdateCustomer,
  selectedCustomer,
  setSelectedCustomer,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    contactNumber: "",
    year: "",
    photo: "",
    totalPurchasesPerYear: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    city: "",
    contactNumber: "",
    year: "",
    photo: "",
    totalPurchasesPerYear: "",
  });

  useEffect(() => {
    if (selectedCustomer) {
      setFormData({
        name: selectedCustomer.name,
        city: selectedCustomer.city,
        contactNumber: selectedCustomer.contactNumber,
        year: selectedCustomer.year.toString(),
        photo: selectedCustomer.photo,
        totalPurchasesPerYear: selectedCustomer.totalPurchasesPerYear.toString(),
      });
    } else {
      resetForm();
    }
  }, [selectedCustomer]);

  const validate = () => {
    const newErrors = {
      name: formData.name ? "" : "Name is required",
      city: formData.city ? "" : "City is required",
      contactNumber:
        formData.contactNumber.length === 10
          ? ""
          : "Contact number must be 10 digits",
      year:
        Number(formData.year) > 1900 && Number(formData.year) <= new Date().getFullYear()
          ? ""
          : "Year must be valid",
      photo: formData.photo ? "" : "Photo URL is required",
      totalPurchasesPerYear:
        Number(formData.totalPurchasesPerYear) > 0
          ? ""
          : "Total purchases must be positive",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      const newCustomer: Customer = {
        customerId: selectedCustomer?.customerId || new Date().toISOString(),
        name: formData.name,
        city: formData.city,
        contactNumber: formData.contactNumber,
        year: Number(formData.year),
        photo: formData.photo,
        totalPurchasesPerYear: Number(formData.totalPurchasesPerYear),
      };

      if (selectedCustomer) {
        onUpdateCustomer(newCustomer);
      } else {
        onAddCustomer(newCustomer);
      }

      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      city: "",
      contactNumber: "",
      year: "",
      photo: "",
      totalPurchasesPerYear: "",
    });
    setErrors({
      name: "",
      city: "",
      contactNumber: "",
      year: "",
      photo: "",
      totalPurchasesPerYear: "",
    });
    setSelectedCustomer(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className={styles.customerForm} onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>
      <div>
        <label>City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        {errors.city && <span className={styles.error}>{errors.city}</span>}
      </div>
      <div>
        <label>Contact Number</label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
        />
        {errors.contactNumber && (
          <span className={styles.error}>{errors.contactNumber}</span>
        )}
      </div>
      <div>
        <label>Year</label>
        <input
          type="text"
          name="year"
          value={formData.year}
          onChange={handleChange}
        />
        {errors.year && <span className={styles.error}>{errors.year}</span>}
      </div>
      <div>
        <label>Photo URL</label>
        <input
          type="text"
          name="photo"
          value={formData.photo}
          onChange={handleChange}
        />
        {errors.photo && <span className={styles.error}>{errors.photo}</span>}
      </div>
      <div>
        <label>Total Purchases Per Year</label>
        <input
          type="text"
          name="totalPurchasesPerYear"
          value={formData.totalPurchasesPerYear}
          onChange={handleChange}
        />
        {errors.totalPurchasesPerYear && (
          <span className={styles.error}>{errors.totalPurchasesPerYear}</span>
        )}
      </div>
      <div className={styles.formActions}>
        <button type="submit">
          {selectedCustomer ? "Update" : "Add"} Customer
        </button>
        <button type="button" onClick={resetForm}>
          Clear
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
