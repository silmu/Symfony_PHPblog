import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('logged_in'));
  const [username, setUsername] = useState(sessionStorage.getItem('username'));

  useEffect(() => {
    setLoggedIn(sessionStorage.getItem('logged_in'));
    setUsername(sessionStorage.getItem('username') ?? '');
  }, [username, loggedIn]);

  const toggleLogin = () => {
    setLoggedIn(sessionStorage.getItem('logged_in'));
    if (loggedIn == 'true') {
      window.sessionStorage.setItem('logged_in', 'false');
      window.sessionStorage.setItem('username', '');
      setLoggedIn('false');
      setUsername('');
    }
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark p-3 mb-2"
        role="navigation"
      >
        <Link to="/" className="navbar-brand">
          BlogBook
        </Link>
        <Link to={`account/${username}`} className="nav-link link-light">
          My account
        </Link>
        <Link to="login" className="nav-link link-light" onClick={toggleLogin}>
          {loggedIn == 'true' ? 'Logout' : 'Login'}
        </Link>
      </nav>
    </div>
  );
};
export default Header;
