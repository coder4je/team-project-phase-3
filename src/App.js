import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Login from "./components/login";
import Game from "./components/game";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [qAndA, setQAndA] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions/")
      .then((r) => r.json())
      .then((qAndA) => setQAndA(qAndA));
  }, []);

  // const highestRatedQuestion = dataSet.map((data) => Math.max(data.rating))

  const changeUser = (user) => {
    setCurrentUser(user);
  };

  console.log(qAndA);

  // setError(error);

  return (
    <div className="App">
      {currentUser !== "" ? (
        <Route exact path="/game">
          <Game qAndA={qAndA} currentUser={currentUser} />
        </Route>
      ) : (
        <Route exact path="/">
          <Login changeUser={changeUser} />
        </Route>
      )}
    </div>
  );
}

export default App;
