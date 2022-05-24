import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="navbar-expand{-sm|-md|-lg|-xl} ">
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark p-3 mb-2"
        role="navigation"
      >
        <Link to="/" className="navbar-brand">
          My Blog
        </Link>
        <Link to="login" className="nav-link link-light">
          Login
        </Link>
      </nav>
    </div>
  );
};
export default Header;
