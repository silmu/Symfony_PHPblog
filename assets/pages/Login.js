import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [loginMsg, setLoginMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Login: Logged in: ', sessionStorage.getItem('logged_in'));
  }, []);

  //If logged in set session to true
  const toggleLogin = (username) => {
    window.sessionStorage.setItem('logged_in', username);
    console.log('Login: Logged in: ', sessionStorage.getItem('logged_in'));
  };

  //Check if username and password are correct
  const handleLoginCheck = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    axios
      .post('/api/login_check', formData)
      .then((res) => {
        setLoginMsg(res.data);
        console.log(res.data);
        Swal.fire({
          icon: 'success',
          title: 'Logged in successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        //If login is successful redirect to account
        toggleLogin(true);
        navigate(`/account/${username}`);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: err?.response?.data,
          showConfirmButton: false,
          timer: 1500,
        });
        toggleLogin(false);
        setLoginMsg(err?.response?.data);
      });
  };

  const handleRegistry = (e) => {
    e.preventDefault();
    console.log('Registry check');
    let formData = new FormData();
    formData.append('username', usernameReg);
    formData.append('password', passwordReg);
    axios
      .post('/api/register', formData)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Registered successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(res.data);
        toggleLogin(true);
        navigate(`/account/${usernameReg}`);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: err?.response?.data,
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(err.data);
        toggleLogin(false);
      });
  };

  return (
    <div className="container">
      <form
        method="post"
        onSubmit={(e) => handleLoginCheck(e)}
        className="p-3 mx-auto bg-white rounded"
      >
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="username"></label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            autoComplete="username"
            className="form-control"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password"></label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="current-password"
            className="form-control"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          ></input>
        </div>
        <button
          type="submit"
          name="submit"
          value="Submit"
          className="btn btn-dark"
        >
          Submit
        </button>
        {/* Login error or success message */}
        <div>{loginMsg}</div>
      </form>
      {/* Register */}
      <div className="register">
        <div className="register-form">
          <form
            method="post"
            onSubmit={(e) => handleRegistry(e)}
            className="p-3 mx-auto bg-white rounded"
          >
            <h2>Register</h2>
            <div className="form-group">
              <label htmlFor="reg_username"></label>
              <input
                type="text"
                name="reg_username"
                id="reg_username"
                placeholder="Username"
                autoComplete="username"
                className="form-control"
                onChange={(e) => {
                  setUsernameReg(e.target.value);
                }}
                required
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="reg_password"></label>
              <input
                type="password"
                name="reg_password"
                id="reg_password"
                placeholder="Password"
                autoComplete="new-password"
                className="form-control"
                onChange={(e) => {
                  setPasswordReg(e.target.value);
                }}
                required
              ></input>
            </div>
            <input
              type="submit"
              name="register"
              value="Submit"
              className="btn btn-dark"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
