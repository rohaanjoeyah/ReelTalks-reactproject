// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navStyle = { marginRight: '1rem', color: '#fff', textDecoration: 'none' };
  return (
    <nav style={{ padding: '1rem', background: '#333', color: '#fff' }}>
      <Link to="/" style={navStyle}>Home</Link>
      <Link to="/movies" style={navStyle}>Movies</Link>
      <Link to="/reviews" style={navStyle}>Reviews</Link>
      <Link to="/toprated" style={navStyle}>Top Rated</Link>
      <Link to="/about" style={navStyle}>About</Link>
    </nav>
  );
};

export default Navbar;
