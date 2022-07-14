import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Game from "./components/Game";

// let routes = (
//   <Switch>
//     <Route exact path="/">
//       <Login />
//     </Route>
//     <Route path="/game">
//       <Game />
//     </Route>
//   </Switch>
// );

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [gameData, setGameData] = useState([]);
  const [higherRatedQuestion, setHighestRatedQuestion] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1);

  // Fetch game data
  useEffect(() => {
    fetch("http://localhost:9292/game")
      .then((r) => r.json())
      .then((data) =>
        setGameData(data.filter((game) => game.level === currentLevel))
      );
  }, [currentLevel]);

  // Fetch comments
  useEffect(() => {
    fetch("http://localhost:9292/comment")
      .then((r) => r.json())
      .then((comment) => highestAmongComments(comment));
  }, [gameData, currentLevel]);

  // Find the highest rated questions
  const highestAmongComments = (arr) => {
    let sortByRate = arr.sort((a, b) => b.rating - a.rating)[0];
    let highestRated = gameData.find((item) => (item.id = sortByRate.game_id));
    setHighestRatedQuestion(highestRated);
  };

  // find a current user
  const changeUser = (user) => {
    setCurrentUser(user);
  };

  return (
    <div className="App">
      <Route exact path="/">
        <Login setCurrentUser={setCurrentUser} />
      </Route>
      <Route path="/game">
        <Game
          higherRatedQuestion={higherRatedQuestion}
          currentUser={currentUser}
          setCurrentLevel={setCurrentLevel}
          currentLevel={currentLevel}
        />
      </Route>
    </div>
  );
}

export default App;
