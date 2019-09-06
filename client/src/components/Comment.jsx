import React, { useState } from "react";
import Votes from "./Votes";

export default function Comment({
  comments,
  comment,
  upvoteComment,
  downvoteComment,
  createSubcomment,
  user,
  postId
}) {
  const [showForm, setShowForm] = useState(false);
  const [subcommentContent, setSubcommentContent] = useState("");

  const toggleForm = () => setShowForm(!showForm);

  const subComments = comments.filter(
    subComment => comment.id === subComment.parentId
  );
  const subCommentsJsx = subComments.map(subComment => (
    <Comment
      key={subComment.id}
      comments={comments}
      comment={subComment}
      upvoteComment={upvoteComment}
      downvoteComment={downvoteComment}
      createSubcomment={createSubcomment}
      user={user}
      postId={postId}
    />
  ));

  return (
    <div className="comment">
      <div className="comment-left">
        <Votes
          id={comment.id}
          upvote={upvoteComment}
          downvote={downvoteComment}
          votes={comment.votes}
        />
        <div className="threadline-container">
          <div className="threadline"></div>
        </div>
      </div>
      <div className="comment-info">
        <div className="comment-author-date">{`u/${comment.username}`}</div>
        <div className="comment-content">
          <p>{comment.content}</p>
        </div>
        <button onClick={toggleForm} className="comment-reply">
          Reply to this Comment
        </button>
        {showForm && (
          <form
            className="subcomment-form"
            onSubmit={async e => {
              console.log(user)
              console.log(comment)
              e.preventDefault();
              await createSubcomment(
                postId,
                user.id,
                user.username,
                subcommentContent,
                comment.id
              );
              setSubcommentContent('');
            }}
          >
            <textarea
              className="subcomment-form-input"
              name="subcomment"
              id="subcomment"
              value={subcommentContent}
              onChange={e => {
                setSubcommentContent(e.target.value);
              }}
            ></textarea>
            <button className="form-button">Add Comment</button>
          </form>
        )}
        {subCommentsJsx}
      </div>
    </div>
  );
}
