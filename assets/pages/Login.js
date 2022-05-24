import React from 'react';

const Login = () => {
  return (
    <div className="container">
      <form
        method="post"
        action="/login_check"
        className="p-3 m-3 bg-white rounded"
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
            required
          ></input>
        </div>
        <input
          type="submit"
          name="submit"
          value="Submit"
          className="btn btn-dark"
        />
      </form>
      {/* Register */}
      <div className="register">
        <div className="register-form">
          <form
            method="post"
            action="/register"
            className="p-3 m-3 bg-white rounded"
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
