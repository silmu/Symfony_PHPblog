import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Account from './pages/Account';
import Header from './components/Header';

const Main = () => {
  const [loggedIn, setLoggedIn] = useState('');
  const [username, setUsername] = useState('test');

  useEffect(() => {
    console.log('Main useEffect');
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Login />} />
          <Route path="/account/:username" element={<Account />} />
          {/* <Route
            path="/account"
            element={<Navigate to={`/account/${username}`} />}
          /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Main;

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
