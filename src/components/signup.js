import React, { useState } from "react";

function Signup() {
  const [signup, setSignup] = useState({
    username: "",
    password: "",
  });
  console.log(signup);

  function handleChange(e) {
    setSignup({
      ...signup,
      username: e.target.value,
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

    fetch(`http://localhost:4000/login/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: signup.username,
        password: signup.password,
      }),
    });
    setSignup({ username: "", password: "" });
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <input
        type="text"
        name="signup"
        placeholder="username"
        value={signup.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={signup.password}
        onChange={handleChangePassword}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Signup;
