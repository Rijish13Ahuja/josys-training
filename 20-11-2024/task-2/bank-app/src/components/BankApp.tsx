import React, { useReducer, useState } from 'react';
import './BankApp.css';

type ActionType =
  | { type: 'DEPOSIT'; amount: number }
  | { type: 'WITHDRAW'; amount: number };

type StateType = {
  balance: number;
};

const balanceReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'DEPOSIT':
      return { balance: state.balance + action.amount };
    case 'WITHDRAW':
      if (state.balance >= action.amount) {
        return { balance: state.balance - action.amount };
      } else {
        alert('Insufficient funds for this withdrawal.');
        return state;
      }
    default:
      return state;
  }
};

const BankApp: React.FC = () => {
  const [state, dispatch] = useReducer(balanceReducer, { balance: 0 });
  const [amount, setAmount] = useState<string>('0');

  const handleAction = (type: 'DEPOSIT' | 'WITHDRAW') => {
    const numericAmount = Number(amount);
    if (numericAmount <= 0) {
      alert('Please enter a valid amount greater than 0.');
      return;
    }
    dispatch({ type, amount: numericAmount });
    setAmount('0');
  };

  return (
    <div className="bank-app">
      <h1 className="app-title">My Bank Account</h1>
      <div className="balance-display">
        <p>Available Balance</p>
        <h2>${state.balance.toFixed(2)}</h2>
      </div>
      <div className="input-section">
        <input
          type="number"
          value={amount}
          onFocus={() => setAmount('')} 
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
        />
        <div className="action-buttons">
          <button className="deposit-btn" onClick={() => handleAction('DEPOSIT')}>
            Deposit
          </button>
          <button className="withdraw-btn" onClick={() => handleAction('WITHDRAW')}>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankApp;
