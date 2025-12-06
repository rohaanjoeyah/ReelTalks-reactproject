import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../assets/css/styles.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">ReelTalks</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/toprated">Top Rated</Link></li>
        {/* Note: Reviews page is now just a redirect/info page since reviews are on Movie Detail */}
        <li><Link to="/reviews">Reviews</Link></li> 
        <li><Link to="/about">About</Link></li>
        
        {/* 👇 CONDITIONAL RENDERING 👇 */}
        {user ? (
          <>
            {/* 👑 ADMIN ONLY LINK */}
            {user.role === 'admin' && (
              <li>
                <Link to="/admin" style={{ color: '#ffc107', fontWeight: 'bold' }}>
                  Dashboard
                </Link>
              </li>
            )}

            <li className="user-greeting">Hi, {user.name}</li>
            <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="btn-login">Login</Link></li>
            {/* 🆕 REGISTER LINK */}
            <li><Link to="/register" className="btn-register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;