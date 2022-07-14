import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Game from "./components/Game";

let routes = (
  <Switch>
    <Route exact path="/">
      <Login />
    </Route>
    <Route path="/game">
      <Game />
    </Route>
  </Switch>
);
console.log(routes);
function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [gameData, setGameData] = useState([]);
  const [higherRatedQuestion, setHighestRatedQuestion] = useState([]);

  // Fetch game data
  useEffect(() => {
    fetch("http://localhost:9292/game")
      .then((r) => r.json())
      .then((data) => setGameData(data));
  }, []);

  // Fetch comments
  useEffect(() => {
    fetch("http://localhost:9292/comment")
      .then((r) => r.json())
      .then((comment) => highestAmongComments(comment));
  }, [gameData]);
  console.log(gameData.id);
  // Get the highest rated question
  const highestAmongComments = (arr) => {
    let sortByRate = arr.sort((a, b) => b.rating - a.rating)[0];
    let highestRated = gameData.find((item) => (item.id = sortByRate.game_id));
    setHighestRatedQuestion(highestRated);
  };

  const changeUser = (user) => {
    setCurrentUser(user);
  };

  return (
    <div className="App">
      <Route exact path="/">
        <Login changeUser={changeUser} />
      </Route>
      <Route path="/game">
        <Game
          higherRatedQuestion={higherRatedQuestion}
          currentUser={currentUser}
        />
      </Route>

      {/* {currentUser === "" ? (
        <Route exact path="/">
          <Login changeUser={changeUser} />
        </Route>
      ) : (
        <Route exact path="/game">
          <Game
            higherRatedQuestion={higherRatedQuestion}
            currentUser={currentUser}
          />
        </Route>
      )} */}
    </div>
  );
}

export default App;
