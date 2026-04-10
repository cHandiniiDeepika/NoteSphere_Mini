import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext.jsx';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/FireBaseConfig';
import './Navbar.css';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/signin');
  };

  const { theme, toggleTheme } = useTheme();

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-brand">
        <Link to="/home" className="brand-link">
          <span className="brand-icon">📚</span>
          <span className="brand-name">NoteSphere</span>
        </Link>
      </div>
      
      {user && (
        <div className={`navbar-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link 
            to="/home" 
            className={`nav-item ${isActivePath('/home') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">🏠</span>
            <span>Home</span>
          </Link>
          
          <Link 
            to="/upload" 
            className={`nav-item ${isActivePath('/upload') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">📤</span>
            <span>Upload</span>
          </Link>
          
          <Link 
            to="/browse" 
            className={`nav-item ${isActivePath('/browse') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">🔍</span>
            <span>Browse</span>
          </Link>
          
          <Link 
            to="/my-notes" 
            className={`nav-item ${isActivePath('/my-notes') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">📝</span>
            <span>My Notes</span>
          </Link>
          
          <Link 
            to="/favorites" 
            className={`nav-item ${isActivePath('/favorites') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">❤️</span>
            <span>Favorites</span>
          </Link>
          
          <Link 
            to="/profile" 
            className={`nav-item ${isActivePath('/profile') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">👤</span>
            <span>Profile</span>
          </Link>

          <button type="button" className="nav-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      )}
      
      <div className="navbar-controls">
        {user && (
          <div className="navbar-user">
            <div className="user-profile">
              <div className="user-avatar">
                <span className="avatar-text">
                  {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
            </div>
            <button className="signout-btn" onClick={handleSignOut}>
              <span className="btn-icon">🚪</span>
              <span className="btn-text">Logout</span>
            </button>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
