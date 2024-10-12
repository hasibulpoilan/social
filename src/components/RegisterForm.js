import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css'; // Create CSS file for styling

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Handle registration with the API call
    try {
      await axios.post('http://localhost:5000/api/register', { name, handle, username, password });
      // You can add some redirection here on successful registration (like navigating to a login page)
    } catch (error) {
      setErrorMessage("An error occurred: " + error.message); // Set the error message
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        {/* Name input */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        
        {/* Handle input */}
        <input
          type="text"
          placeholder="Handle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          required
        />

        {/* Username input */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Submit button */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
