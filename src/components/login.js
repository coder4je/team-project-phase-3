import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Signup from "./signup";

function Login({ changeUser }) {
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);

    fetch(`http://localhost:4000/login/`)
      .then((r) => r.json())
      .then((data) => {
        setUserLogin(data);
        const currentUser = data.find(
          (user) => user.username === userLogin.username
        );
        console.log(currentUser);
        if (
          userLogin.username === currentUser.username &&
          userLogin.password === currentUser.password
        ) {
          changeUser(currentUser);
          console.log("Success");
          history.push(`/game`);
        } else {
          console.log("Fail");
          history.push(`/`);
        }
      });
  };

  const handleChange = (e) => {
    setUserLogin({ ...userLogin, username: e.target.value });
  };

  const handleChangePassword = (e) => {
    setUserLogin({ ...userLogin, password: e.target.value });
  };

  const onClick = (e) => {
    setIsSignup(!isSignup);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="login" value="username">
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
      <button onClick={onClick}>Sign up</button>
      {isSignup ? <Signup /> : null}
    </div>
  );
}

export default Login;
