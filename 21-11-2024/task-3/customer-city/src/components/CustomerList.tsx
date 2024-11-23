import React, { useEffect, useState } from 'react';
import styles from '../styles/CustomerList.module.css';
import CustomerForm from './CustomerForm';

type Customer = {
  id: string;
  name: string;
  city: string;
  email: string;
};

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [newCustomer, setNewCustomer] = useState<Customer>({
    id: '',
    name: '',
    city: '',
    email: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('https://randomuser.me/api/?results=10');
        const data = await response.json();

        const transformedData: Customer[] = data.results.map((user: any) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          city: user.location.city,
          email: user.email,
        }));

        const cityList = Array.from(new Set(transformedData.map((cust) => cust.city)));

        setCustomers(transformedData);
        setFilteredCustomers(transformedData);
        setCities(['All', ...cityList]);
      } catch (err) {
        setError('Failed to fetch customer data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setSelectedCity(city);

    if (city === 'All') {
      setFilteredCustomers(customers);
    } else {
      setFilteredCustomers(customers.filter((cust) => cust.city === city));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = () => {
    const newEntry = { ...newCustomer, id: crypto.randomUUID() };
    setCustomers((prev) => [...prev, newEntry]);
    setFilteredCustomers((prev) => [...prev, newEntry]);

    if (!cities.includes(newCustomer.city)) {
      setCities((prev) => [...prev, newCustomer.city]);
    }

    setNewCustomer({ id: '', name: '', city: '', email: '' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <h2 className={styles.title}>Add New Customer</h2>

        <CustomerForm
          newCustomer={newCustomer}
          handleInputChange={handleInputChange}
          handleAddCustomer={handleAddCustomer}
        />
      </div>

      <div className={styles.rightSection}>
        {error && <div className={styles.errorMessage}>{error}</div>}

        {loading ? (
          <div>Loading customers...</div>
        ) : (
          <>
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className={styles.select}
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>City</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.city}</td>
                    <td>{customer.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
