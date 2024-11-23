import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import App from './App';
import About from './components/About';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Emps from './components/Emps';
import Depts from './components/Depts';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <h3 style={{ textAlign: 'center' }}>
        Routing Implementation in React Applications
      </h3>
      <hr />
      <div style={{ textAlign: 'center' }}>
        <Link to="/">Home</Link> | <Link to="/Emps">Employees</Link> |{' '}
        <Link to="/Depts">Departments</Link> | <Link to="/About">About Us</Link> |{' '}
        <Link to="/Contact">Contact Us</Link> | <Link to="/Hello">Invalid</Link> |{' '}
        <Link to="/Login">Login</Link>
      </div>
      <hr />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route
          path="/Emps"
          element={
            <ProtectedRoute role="user" allowedRoles={['admin', 'user']}>
              <Emps />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Depts"
          element={
            <ProtectedRoute role="admin" allowedRoles={['admin']}>
              <Depts />
            </ProtectedRoute>
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
