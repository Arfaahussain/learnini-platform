import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Logic for authentication
    // For simplicity, I'll just redirect based on hard-coded values
    if (email === 'student@kletech.ac.in') {
      navigate('/user-dashboard');
    } else if (email === 'staff@kletech.ac.in') {
      navigate('/admin-dashboard');
    } else {
      alert('Invalid email!');
    }
  };

  return (
    <div className="login-page">
      <header className="header">
        <h1>Welcome to Your Learning Platform</h1>
      </header>

      <div className="login-section">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required // Add required attribute
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required // Add required attribute
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      
      <footer className="footer">
        &copy; Minor Project Team 42.
      </footer>
    </div>
  );
}

export default Login;
