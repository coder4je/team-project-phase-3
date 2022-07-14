import React, { useState } from "react";
import CommentForm from "./CommentForm";
import { Redirect } from "react-router-dom";
import GameDetail from "./GameDetail";

function Game({ higherRatedQuestion, currentUser }) {
  const initialValue = {
    box1: "",
    box2: "",
    box3: "",
  };
  const i = 1;
  const [word, setWord] = useState(initialValue);
  const [currentLevel, setCurrentLevel] = useState(i);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      word.box1.toUpperCase() ===
        higherRatedQuestion.answers[0].toUpperCase() &&
      word.box2.toUpperCase() ===
        higherRatedQuestion.answers[1].toUpperCase() &&
      word.box3.toUpperCase() === higherRatedQuestion.answers[2].toUpperCase()
    ) {
      console.log("You're Right!!");
      setIsCorrect(!isCorrect);
    } else {
      console.log("Try Again");
    }
    setWord(initialValue);
  };

  console.log(word);
  const handleChange = (e) => {
    setWord({ ...word, [e.target.name]: e.target.value.toUpperCase() });
  };

  const onClickNext = () => {
    setCurrentLevel(i + 1);
  };
  console.log(currentLevel);

  return (
    <>
      <GameDetail
        higherRatedQuestion={higherRatedQuestion}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        word={word}
      />
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