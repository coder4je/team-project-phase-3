import React, { useState } from "react";
import CommentForm from "./commentForm";

function Game({ qAndA, currentUser }) {
  const initialValue = {
    firstBox: "",
    secondBox: "",
    thirdBox: "",
  };

  const [word, setWord] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(word.firstBox);
    console.log(qAndA.answers[0]);

    if (word.firstBox === qAndA.answers[0].toUpperCase()) {
      console.log("Right!!");
    }
    setWord(initialValue);
  };

  const handleChange = (e) => {
    setWord({ ...word, [e.target.name]: e.target.value.toUpperCase() });
  };

  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <h2>Game</h2>
        <input
          maxLength={1}
          type="text"
          name="firstBox"
          value={word.firstBox}
          onChange={handleChange}
        />
        <input
          maxLength={1}
          type="text"
          id="empty_box"
          name="secondBox"
          value={word.secondBox}
          onChange={handleChange}
        />
        <input
          maxLength={1}
          type="text"
          id="empty_box"
          name="thirdBox"
          value={word.thirdBox}
          onChange={handleChange}
        />
        <input type="submit" id="mySubmit" value="Go" />
      </form>
      <div>
        <CommentForm qAndA={qAndA} currentUser={currentUser} />
      </div>
    </>
  );
}

export default Game;
