import React from "react";
import { Customer } from "../types";
import styles from "../styles/CustomerList.module.css";

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: string) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={styles.customerList}>
      <h2>Customer List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customerId}>
              <td>{customer.name}</td>
              <td>{customer.city}</td>
              <td>{customer.contactNumber}</td>
              <td>
                <button onClick={() => onEdit(customer)}>Edit</button>
                <button onClick={() => onDelete(customer.customerId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
