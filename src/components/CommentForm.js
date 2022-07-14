import React, { useState, useEffect } from "react";

function CommentForm({ higherRatedQuestion, currentUser }) {
  const [reviews, setReviews] = useState("");
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [currentComment, setCurrentComment] = useState("");
  const [isEditMode, setIsEditMode] = useState("");
  const [currentId, setCurrentId] = useState("");

  // Get Comment!!

  useEffect(() => {
    fetch("http://localhost:9292/comment")
      .then((r) => r.json())
      .then((comment) => {
        const id = comment.map((c) => c.id);
        setCurrentId(id.pop());
      });
  }, []);
  console.log(currentId);

  // Edit Comment!!

  const onChangeEdit = (e) => {
    setCurrentComment(e.target.value);
  };

  const onClickEdit = (e) => {
    e.preventDefault();
    setIsEditMode(!isEditMode);
    setCurrentComment("");
    console.log(currentComment);
  };

  const onSubmitEdit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9292/comment/${currentId + 1}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ body: currentComment }),
    }).then((r) => {
      if (!r.ok) {
        throw new Error(`Error status: ${r.status}`);
      }
      return r.json();
    });

    setIsEditMode(!isEditMode);
    console.log("Form Submitted");
  };

  // Delete comment
  const onDelete = (e) => {
    fetch(`http://localhost:9292/comment/${currentId + 1}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then((data) => console.log(`${data} has been DELETED`));
    setCurrentComment("");
  };

  // Post comments
  const onChange = (e) => {
    setReviews(e.target.value);
  };

  const onClick = (e) => {
    e.preventDefault();
    setSelectedNumber(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setCurrentComment(reviews);

    console.log(reviews);
    console.log(selectedNumber);

    fetch("http://localhost:9292/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: reviews,
        rating: selectedNumber,
        game_id: higherRatedQuestion.id,
        user_id: currentUser.id,
      }),
    });
    setReviews("");
    console.log("Form Submitted");
  };
  return (
    <>
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <label htmlFor="review">Review</label>
          <br />
          <>
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
          </>
          <br />
          <input
            type="text"
            placeholder="enter review"
            value={reviews}
            onChange={onChange}
          />
          <button>Submit</button>
        </form>
      </div>
      <div>
        <h3>User: {currentUser.user_name}</h3>
        <h4>#: {currentUser.id}</h4>
        <h4>Comment</h4>
        <p> {currentComment}</p>
      </div>

      <button onClick={onClickEdit} value="edit">
        Edit
      </button>

      {isEditMode ? (
        <form onSubmit={onSubmitEdit}>
          <input
            type="text"
            placeholder="enter review"
            value={currentComment}
            onChange={onChangeEdit}
          />
          <button>Submit</button>
        </form>
      ) : null}
      <br />
      <button onClick={onDelete} value="delete">
        Delete
      </button>
    </>
  );
}

export default CommentForm;
