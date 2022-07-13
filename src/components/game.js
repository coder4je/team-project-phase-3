import React, { useState } from "react";
import CommentForm from "./commentForm";
import { Redirect } from "react-router-dom";
import GameDetail from "./gameDetail";

function Game({ higherRatedQuestion, currentUser }) {
  const initialValue = {
    firstBox: "",
    secondBox: "",
    thirdBox: "",
  };

  const [word, setWord] = useState(initialValue);
  const [isCorrect, setIsCorrect] = useState(false);
  // const { higherRatedQuestion.prompt, higherRatedQuestion.answers } = higherRatedQuestion;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      word.firstBox.toUpperCase() ===
        higherRatedQuestion.answers[0].toUpperCase() &&
      word.secondBox.toUpperCase() ===
        higherRatedQuestion.answers[1].toUpperCase() &&
      word.thirdBox.toUpperCase() ===
        higherRatedQuestion.answers[2].toUpperCase()
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

  const onClickNext = (e) => {
    return <Redirect to="/game" />;
  };

  return (
    <>
      <GameDetail />
      {/* <form className="" onSubmit={handleSubmit}>
        <h2>{higherRatedQuestion.prompt}</h2>
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
      </form> */}
      {isCorrect ? (
        <div>
          <CommentForm
            higherRatedQuestion={higherRatedQuestion}
            currentUser={currentUser}
          />
          <button onClick={onClickNext}>NEXT</button>
        </div>
      ) : null}
    </>
  );
}

export default Game;
