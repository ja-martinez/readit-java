import React from "react";
import Votes from "./Votes";

export default function Comment({
  comments,
  comment,
  upvoteComment,
  downvoteComment
}) {
  const subComments = comments.filter(
    subComment => comment.id === subComment.parentId
  );
  const subCommentsJsx = subComments.map(subComment => (
    <Comment
      comments={comments}
      comment={subComment}
      upvoteComment={upvoteComment}
      downvoteComment={downvoteComment}
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
        { subCommentsJsx }
      </div>
    </div>
  );
}
