import React from 'react';

type UserCardProps = {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
};

const UserCard: React.FC<UserCardProps> = ({ firstName, lastName, email, avatar }) => (
  <div
    style={{
      border: '1px solid #e0e0e0',
      borderRadius: '15px',
      padding: '20px',
      margin: '10px',
      textAlign: 'center',
      width: '200px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)';
      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    }}
  >
    <img
      src={avatar}
      alt={`${firstName} ${lastName}`}
      style={{
        borderRadius: '50%',
        width: '100px',
        height: '100px',
        marginBottom: '10px',
        border: '2px solid #f0f0f0',
      }}
    />
    <h3
      style={{
        color: '#333',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        margin: '10px 0',
        textTransform: 'capitalize',
      }}
    >
      {`${firstName} ${lastName}`}
    </h3>
    <p style={{ color: '#777', fontSize: '0.9rem', margin: '5px 0' }}>{email}</p>
  </div>
);

export default UserCard;
