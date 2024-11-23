import React from 'react';
import CustomerList from './components/CustomerList';
import styles from './styles/App.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <CustomerList />
      </div>
    </div>
  );
};

export default App;
