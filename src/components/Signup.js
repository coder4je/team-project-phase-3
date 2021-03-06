import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Signup({ setCurrentUser }) {
  const [signup, setSignup] = useState({
    user_name: "",
    password: "",
  });
  const history = useHistory();

  function handleChange(e) {
    setSignup({
      ...signup,
      user_name: e.target.value,
    });
  }

  function handleChangePassword(e) {
    setSignup({
      ...signup,
      password: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign up Submitted");

    fetch(`http://localhost:9292/user`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user_name: signup.user_name,
        password: signup.password,
      }),
    });
    setCurrentUser(signup);
    setSignup({ user_name: "", password: "" });
    history.push(`/game`);
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <input
        className="signuser"
        type="text"
        name="signup"
        placeholder="user_name"
        value={signup.user_name}
        onChange={handleChange}
      />
      <input
        className="signpassword"
        type="password"
        name="password"
        placeholder="password"
        value={signup.password}
        onChange={handleChangePassword}
      />
      <input className="signsubmit" type="submit" value="Submit" />
    </form>
  );
}

export default Signup;
