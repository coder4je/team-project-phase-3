import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Signup from "./Signup";

function Login({ setCurrentUser }) {
  const [userLogin, setUserLogin] = useState({
    user_name: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:9292/user`)
      .then((r) => r.json())
      .then((data) => {
        setUserLogin(data);
        const currentUser = data.find(
          (user) => user.user_name === userLogin.user_name
        );
        if (
          userLogin.user_name === currentUser.user_name &&
          userLogin.password === currentUser.password
        ) {
          setCurrentUser(currentUser);
          console.log("Success");
          history.push(`/game`);
        } else {
          console.log("Fail");
          history.push(`/`);
        }
      });
  };

  const handleChange = (e) => {
    setUserLogin({ ...userLogin, user_name: e.target.value });
  };

  const handleChangePassword = (e) => {
    setUserLogin({ ...userLogin, password: e.target.value });
  };

  const onClick = (e) => {
    setIsSignup(!isSignup);
  };

  return (
    <div>
      <img
        className="drawing"
        src="https://mariasplace.com/wp-content/uploads/2019/04/Hangman-game-played.jpg"
      />
      <form onSubmit={handleSubmit}>
        <h2>
          Login
          <link
            rel="stylesheet"
            type="text/css"
            href="//fonts.googleapis.com/css?family=Bubblegum+Sans"
          />
        </h2>
        <div className="form-group">
          <label htmlFor="login" value="user_name">
            Username:
          </label>
          <br />
          <input
            type="text"
            name="login"
            value={userLogin.user_name}
            onChange={handleChange}
            autoFocus={true}
          />
        </div>
        <div className="form-group1">
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            name="password"
            value={userLogin.password}
            onChange={handleChangePassword}
          />
        </div>
        <input className="buttonLogin" type="submit" value="Login" />
      </form>
      <button className="buttonSign" onClick={onClick}>
        Sign up
      </button>
      {isSignup ? <Signup setCurrentUser={setCurrentUser} /> : null}
    </div>
  );
}

export default Login;
