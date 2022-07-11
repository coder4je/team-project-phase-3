import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Login({ changeUser }) {
  const [userLogin, setUserLogin] = useState({ username: "", password: "" });
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);

    fetch("http://localhost:4000/login")
      .then((r) => r.json())
      .then((data) => {
        setUserLogin(data);
        console.log(data[0]);
        if (
          userLogin.username === data[0].username &&
          userLogin.password === data[0].password
        ) {
          changeUser(userLogin);
          console.log("Success");
          history.push(`/game`);
        } else {
          console.log("Fail");
          history.push(`/login`);
        }
      });
  };

  const handleChange = (e) => {
    setUserLogin({ ...userLogin, username: e.target.value });
  };

  const handleChangePassword = (e) => {
    setUserLogin({ ...userLogin, password: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="login" value="Username">
            Username:
          </label>
          <br />
          <input
            type="text"
            name="login"
            value={userLogin.username}
            onChange={handleChange}
            autoFocus={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={userLogin.password}
            onChange={handleChangePassword}
          />
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
