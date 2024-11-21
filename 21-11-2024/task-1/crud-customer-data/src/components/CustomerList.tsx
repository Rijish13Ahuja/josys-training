import { Customer } from '../types/Customer';
import styles from '../styles/CustomerList.module.css';

interface CustomerListProps {
  customers: Customer[];
  onUpdateCustomer: (customer: Customer) => void;
  onDeleteCustomer: (id: number) => void;
  setSelectedCustomer: (customer: Customer | null) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  onDeleteCustomer,
  setSelectedCustomer,
}) => {
  return (
    <div className={styles.list}>
      {customers.map((customer) => (
        <div key={customer.customerId} className={styles.customer}>
          <img src={customer.photo} alt={customer.name} />
          <div>
            <h3>{customer.name}</h3>
            <p>City: {customer.city}</p>
            <p>Contact: {customer.contactNumber}</p>
            <p>Total Purchases: ${customer.totalPurchasesPerYear}</p>
          </div>
          <div>
            <button onClick={() => setSelectedCustomer(customer)}>Edit</button>
            <button onClick={() => onDeleteCustomer(customer.customerId)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerList;
