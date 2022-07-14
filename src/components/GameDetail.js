import React, { useState } from "react";

<<<<<<< HEAD
function GameDetail({ word, higherRatedQuestion, handleChange, handleSubmit }) {
  // const [currentLevel, setCurrentLevel] = useState("");

  console.log(word.box1);

=======
function GameDetail({
  word,
  higherRatedQuestion,
  handleChange,
  handleSubmit,
  currentLevel,
}) {
  // Create game answer boxes
>>>>>>> d6c8fe85738d0fcc8a48fcd52c23159247224ebe
  const levels = [];
  const levelMaker = (level) => {
    for (let i = 1; i < level + 3; i++) {
      levels.push(`box${i}`);
    }
  };
  levelMaker(currentLevel);

  const generator = levels.map((element) => (
    <input
      maxLength={1}
      type="text"
      key={element}
      name={element}
      value={word.element}
      onChange={handleChange}
    />
  ));
  return (
    <form className="game-form" onSubmit={handleSubmit}>
      <h2 className="">Q: {higherRatedQuestion.prompt}</h2>
      {generator}
      <input className="submitButton" type="submit" id="mySubmit" value="Submit" />
    </form>
  );
}

export default GameDetail;
