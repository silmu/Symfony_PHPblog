import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark p-3 mb-2"
        role="navigation"
      >
        <Link to="/" className="navbar-brand">
          BlogBook
        </Link>
        <Link to="login" className="nav-link link-light">
          Login
        </Link>
        <Link to="account" className="nav-link link-light">
          My account
        </Link>
      </nav>
    </div>
  );
};
export default Header;
