import React, { useState } from "react";

function GameDetail() {
  const level1 = [1, 2, 3];
  const level2 = [1, 2, 3, 4];
  const level3 = [1, 2, 3, 4, 5];
  const level4 = [1, 2, 3, 4, 5, 6];
  const level5 = [1, 2, 3, 4, 5, 6, 7];

  const [level, setLevel] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(e.target.value);
  };

  const generator = level1.map((element) => (
    <input
      maxLength={1}
      type="text"
      key={element}
      name={element}
      value={level}
      onChange={handleChange}
    />
  ));
  return (
    <form className="" onSubmit={handleSubmit}>
      <h2>hi</h2>
      {generator}
      <input type="submit" id="mySubmit" value="Go" />
    </form>
  );
}

export default GameDetail;
