import React, { useState } from "react";
import CustomerForm from "./components/CustomerForm";
import styles from "./styles/App.module.css";

interface Customer {
  customerId: string;
  name: string;
  city: string;
  contactNumber: string;
  year: number;
  photo: string;
  totalPurchasesPerYear: number;
}

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const handleAddCustomer = (newCustomer: Customer) => {
    setCustomers([...customers, newCustomer]);
  };

  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.customerId === updatedCustomer.customerId
          ? updatedCustomer
          : customer
      )
    );
    setSelectedCustomer(null);
  };

  const handleDeleteCustomer = (customerId: string) => {
    setCustomers(customers.filter((customer) => customer.customerId !== customerId));
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.leftPanel}>
        <h2>Customer Management</h2>
        <CustomerForm
          onAddCustomer={handleAddCustomer}
          onUpdateCustomer={handleUpdateCustomer}
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
        />
      </div>
      <div className={styles.rightPanel}>
        <h2>Customer List</h2>
        <table className={styles.customerTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Contact</th>
              <th>Year</th>
              <th>Photo</th>
              <th>Total Purchases</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customerId}>
                <td>{customer.name}</td>
                <td>{customer.city}</td>
                <td>{customer.contactNumber}</td>
                <td>{customer.year}</td>
                <td>
                  <img
                    src={customer.photo}
                    alt={customer.name}
                    className={styles.customerPhoto}
                  />
                </td>
                <td>{customer.totalPurchasesPerYear}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEditCustomer(customer)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteCustomer(customer.customerId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
