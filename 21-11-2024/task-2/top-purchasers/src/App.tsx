import React, { useState, useEffect } from "react";
import CustomerForm from "./components/CustomerForm";
import CustomerList from "./components/CustomerList";
import TopPurchasers from "./components/TopPurchasers";
import { Customer } from "./types";
import "./App.css";

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Fetch data from the API on component mount
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((response) => response.json())
      .then((data) =>
        setCustomers(
          data.results.map((user: any) => ({
            customerId: user.login.uuid,
            name: `${user.name.first} ${user.name.last}`,
            city: user.location.city,
            photo: user.picture.medium,
            totalPurchasesPerYear: Math.floor(Math.random() * 1000), // Mock purchases
          }))
        )
      )
      .catch((error) => console.error("Error fetching customers:", error));
  }, []); // Empty dependency array ensures this runs once on mount

  const handleAddCustomer = (newCustomer: Customer) => {
    setCustomers([...customers, newCustomer]);
  };

  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    setCustomers(
      customers.map((customer) =>
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
    <div className="app">
      <div className="container">
        <CustomerForm
          onAddCustomer={handleAddCustomer}
          onUpdateCustomer={handleUpdateCustomer}
          selectedCustomer={selectedCustomer}
        />
        <CustomerList
          customers={customers}
          onEdit={handleEditCustomer}
          onDelete={handleDeleteCustomer}
        />
      </div>
      <TopPurchasers customers={customers} />
    </div>
  );
};

export default App;
