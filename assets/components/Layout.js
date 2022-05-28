import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="container align-items-center">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
