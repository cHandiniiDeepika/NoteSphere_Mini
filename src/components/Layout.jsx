import React from 'react';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Hide navbar only on Sign In and Sign Up pages
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/';
  const showNavbar = user && !isAuthPage;

  return (
    <div className="app-layout">
      {showNavbar && <Navbar />}
      <main className={`layout-main ${showNavbar ? 'with-navbar' : 'without-navbar'}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
