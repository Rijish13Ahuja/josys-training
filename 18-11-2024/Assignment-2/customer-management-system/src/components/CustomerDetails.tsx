import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CustomerDetails.css";

interface Customer {
  Name: string;
  City: string;
  Country: string;
}

const CustomerDetails: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [showCustomers, setShowCustomers] = useState<boolean>(false);
  useEffect(() => {
    axios
      .get("https://www.w3schools.com/angular/customers.php")
      .then((response) => {
        const customerData: Customer[] = response.data.records;
        setCustomers(customerData);

        const countryList = Array.from(
          new Set(customerData.map((customer) => customer.Country))
        );
        setCountries(countryList);
      })
      .catch((error) => console.error("Error fetching customer data:", error));
  }, []);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const country = event.target.value;
    setSelectedCountry(country);
  };

  const handleShowCustomers = () => {
    let filtered = customers;

    if (selectedCountry !== "") {
      filtered = customers.filter(
        (customer) => customer.Country === selectedCountry
      );
    }

    setFilteredCustomers(filtered);
    setShowCustomers(true);
  };

  return (
    <div>
      <h2>Customer Details</h2>
      <div>
        <label htmlFor="country-select">Select Country:</label>
        <select
          id="country-select"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="">All Countries</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
        <button onClick={handleShowCustomers}>Show Customers</button>
      </div>

      {showCustomers && (
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>City Name</th>
              <th>Country Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.Name}</td>
                <td>{customer.City}</td>
                <td>{customer.Country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerDetails;
