import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import './NotFound.css';

function NotFound() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`not-found ${theme}`}>
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="back-home">Go back to Home</Link>
    </div>
  );
}

export default NotFound;
