import React, { useState } from "react";
import CommentForm from "./commentForm";

function Game({ higherRatedQuestion, currentUser }) {
  const initialValue = {
    firstBox: "",
    secondBox: "",
    thirdBox: "",
  };

  const [word, setWord] = useState(initialValue);
  const [isCorrect, setIsCorrect] = useState(false);
  const { prompt, answers } = higherRatedQuestion;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      word.firstBox.toUpperCase() === answers[0].toUpperCase() &&
      word.secondBox.toUpperCase() === answers[1].toUpperCase() &&
      word.thirdBox.toUpperCase() === answers[2].toUpperCase()
    ) {
      console.log("You're Right!!");
      setIsCorrect(!isCorrect);
    } else {
      console.log("Try Again");
    }
    setWord(initialValue);
  };

  const handleChange = (e) => {
    setWord({ ...word, [e.target.name]: e.target.value.toUpperCase() });
  };

  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <h2>{prompt}</h2>
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
      {isCorrect ? (
        <div>
          <CommentForm
            higherRatedQuestion={higherRatedQuestion}
            currentUser={currentUser}
          />
        </div>
      ) : null}
    </>
  );
}

export default Game;
