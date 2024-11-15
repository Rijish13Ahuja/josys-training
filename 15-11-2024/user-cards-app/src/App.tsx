import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from './components/UserCard';

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showUsers, setShowUsers] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/users/');
      setUsers(response.data.data);
      setShowUsers(true);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div
      style={{
        textAlign: 'center',
        fontFamily: '"Arial", sans-serif',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', margin: '20px 0', color: '#333' }}>
        User-Card App
      </h1>
      <button
        onClick={fetchUsers}
        style={{
          padding: '10px 20px',
          fontSize: '1rem',
          color: '#fff',
          backgroundColor: '#007bff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        Get Users
      </button>
      {showUsers && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            marginTop: '30px',
          }}
        >
          {users.map((user) => (
            <UserCard
              key={user.id}
              firstName={user.first_name}
              lastName={user.last_name}
              email={user.email}
              avatar={user.avatar}
              id={0}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
