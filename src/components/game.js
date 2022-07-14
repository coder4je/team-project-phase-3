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
    // setWord(initialValue);
    e.target.reset();
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
        currentLevel={currentLevel}
      />

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
