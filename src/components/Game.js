import React, { useState } from "react";
import CommentForm from "./CommentForm";
import { useHistory } from "react-router-dom";
import GameDetail from "./GameDetail";

function Game({
  higherRatedQuestion,
  currentUser,
  currentLevel,
  setCurrentLevel,
}) {
  const initialValue = {
    box1: "",
    box2: "",
    box3: "",
    box4: "",
    box5: "",
  };

  const [word, setWord] = useState(initialValue);
  const [isCorrect, setIsCorrect] = useState(false);
  const history = useHistory();

  // Validate user's answers
  const answerWords = higherRatedQuestion.answers.split("");
  console.log(answerWords);
  const userAnswer = Object.values(word);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = (currentLevel) => {
      for (let i = 1; i < currentLevel + 1; i++) {
        return answerWords[i].toUpperCase() === userAnswer[i].toUpperCase();
      }
    };

    if (validation(currentLevel) && currentLevel === 3) {
      alert("Congratulations!! You completed all levels!");
      history.push(`/`);
    } else if (validation(currentLevel)) {
      alert("You're Right!! Please leave your comment");
      setIsCorrect(!isCorrect);
    } else {
      alert("Try Again");
    }
    e.target.reset();
  };

  const handleChange = (e) => {
    setWord({ ...word, [e.target.name]: e.target.value.toUpperCase() });
  };

  // Move to next questions
  const onClickNext = () => {
    setCurrentLevel(currentLevel + 1);
    history.push(`/game`);
    setIsCorrect(!isCorrect);
  };

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
          {currentLevel < 3 ? (
            <button onClick={onClickNext}>NEXT</button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export default Game;
