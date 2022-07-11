import React, { useState } from "react";

function CommentForm({ qAndA, currentUser }) {
  const [reviews, setReviews] = useState("");
  const [selectedNumber, setSelectedNumber] = useState(0);

  console.log(currentUser.id);

  const onChange = (e) => {
    setReviews(e.target.value);
  };

  const onClick = (e) => {
    e.preventDefault();
    setSelectedNumber(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("Form Submitted");
    fetch("http://localhost:4000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: reviews,
        rating: selectedNumber,
        questions_id: qAndA[0].id,
        login_id: currentUser.id,
      }),
    });
    setReviews("");
  };
  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <label htmlFor="review">Review</label>
        <br />
        <button onClick={onClick} value="1">
          1
        </button>
        <button onClick={onClick} value="2">
          2
        </button>
        <button onClick={onClick} value="3">
          3
        </button>
        <button onClick={onClick} value="4">
          4
        </button>
        <button onClick={onClick} value="5">
          5
        </button>
        <br />
        <input
          type="text"
          placeholder="enter your review"
          value={reviews}
          onChange={onChange}
        />
        <button type="submit" style={{ background: "Green" }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
