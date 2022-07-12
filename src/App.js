import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Login from "./components/login";
import Game from "./components/game";
import CommentForm from "./components/commentForm";

let routes = (
  <div>
    <Route path="/">
      <Login />
    </Route>
    <Route path="/game">
      <Game />
    </Route>
    <Route path="/comment">
      <CommentForm />
    </Route>
  </div>
);
console.log(routes);
function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [gameData, setGameData] = useState([]);
  const [higherRatedQuestion, setHighestRatedQuestion] = useState([]);

  // Fetch game data
  useEffect(() => {
    fetch("http://localhost:4000/questions/")
      .then((r) => r.json())
      .then((gameData) => setGameData(gameData));
  }, []);

  // Fetch comments
  useEffect(() => {
    fetch("http://localhost:4000/comments")
      .then((r) => r.json())
      .then((comment) => highestAmongComments(comment));
  }, [gameData]);

  // Get the highest rated question
  const highestAmongComments = (arr) => {
    let sortByRate = arr.sort((a, b) => b.rating - a.rating)[0];
    let highestRated = gameData.find(
      (item) => (item.id = sortByRate.questions_id)
    );
    setHighestRatedQuestion(highestRated);
  };

  console.log(higherRatedQuestion);
  console.log(currentUser);

  const changeUser = (user) => {
    setCurrentUser(user);
  };

  return (
    <div className="App">
      {currentUser === "" ? (
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
      )}
    </div>
  );
}

export default App;
