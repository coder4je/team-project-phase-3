import React, { useState } from "react";

function GameDetail({ word, higherRatedQuestion, handleChange, handleSubmit }) {
  // const [currentLevel, setCurrentLevel] = useState("");

  console.log(word.box1);

  const levels = [];
  const levelMaker = (level) => {
    for (let i = 1; i < level + 3; i++) {
      levels.push(`box${i}`);
    }
  };
  levelMaker(1);
  console.log(levels);

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
      <h2>Q: {higherRatedQuestion.prompt}</h2>
      {generator}
      <input type="submit" id="mySubmit" value="Submit" />
    </form>
  );
}

export default GameDetail;
