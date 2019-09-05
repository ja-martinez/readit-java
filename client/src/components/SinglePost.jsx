import React, { useEffect, useState } from "react";
import Votes from "./Votes";
import Comment from "./Comment";

export default function SinglePost({ match }) {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(
        `http://localhost:8080/api/v1/posts/${match.params.id}`
      );
      const json = await res.json();
      setPost(json);
    };

    const fetchComments = async () => {
      const res = await fetch(
        `http://localhost:8080/api/v1/posts/${match.params.id}/comments`
      );
      const json = await res.json();
      setComments(json);
    };

    fetchPost();
    fetchComments();
  }, []);

  const createRootComment = async (postId, userId, username, content) => {
    const res = await fetch("http://localhost:8080/api/v1/comments", {
      method: "POST",
      body: JSON.stringify({
        post_id: postId,
        user_id: userId,
        content
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.ok) {
      const json = res.json();
      const commentId = json.id;
      setComments([
        ...comments,
        {
          id: commentId,
          content,
          votes: json.votes,
          parentId: null,
          username
        }
      ]);
    }
  };

  const createSubComment = async (
    postId,
    userId,
    username,
    content,
    parentId
  ) => {
    const res = await fetch(
      `http://localhost:8080/api/v1/comments/${parentId}/comments`,
      {
        method: "POST",
        body: JSON.stringify({
          post_id: postId,
          user_id: userId,
          content
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (res.ok) {
      const json = res.json();
      const commentId = json.id;
      setComments([
        ...comments,
        {
          id: commentId,
          content,
          votes: json.votes,
          parentId: parentId,
          username
        }
      ]);
    }
  };

  const upvoteComment = async (commentId, doTwice) => {
    if (!doTwice) {
      const res = await fetch(
        `http://localhost:8080/api/v1/comments/${commentId}/upvote`,
        {
          method: "PATCH"
        }
      );
      if (res.ok) {
        setComments(
          comments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                votes: comment.votes + 1
              };
            } else {
              return comment;
            }
          })
        );
      }
    } else {
      let res = await fetch(
        `http://localhost:8080/api/v1/comments/${commentId}/upvote`,
        {
          method: "PATCH"
        }
      );
      if (res.ok) {
        res = await fetch(
          `http://localhost:8080/api/v1/comments/${commentId}/upvote`,
          {
            method: "PATCH"
          }
        );
        if (res.ok) {
          setComments(
            comments.map(comment => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  votes: comment.votes + 2
                };
              } else {
                return comment;
              }
            })
          );
        }
      }
    }
  };

  const downvoteComment = async (commentId, doTwice) => {
    if (!doTwice) {
      const res = await fetch(
        `http://localhost:8080/api/v1/comments/${commentId}/downvote`,
        {
          method: "PATCH"
        }
      );
      if (res.ok) {
        setComments(
          comments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                votes: comment.votes - 1
              };
            } else {
              return comment;
            }
          })
        );
      }
    } else {
      let res = await fetch(
        `http://localhost:8080/api/v1/comments/${commentId}/downvote`,
        {
          method: "PATCH"
        }
      );
      if (res.ok) {
        res = await fetch(
          `http://localhost:8080/api/v1/comments/${commentId}/downvote`,
          {
            method: "PATCH"
          }
        );
        if (res.ok) {
          setComments(
            comments.map(comment => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  votes: comment.votes - 2
                };
              } else {
                return comment;
              }
            })
          );
        }
      }
    }
  };

  const upvotePost = async (postId, doTwice) => {
    if (!doTwice) {
      const res = await fetch(
        `http://localhost:8080/api/v1/posts/${postId}/upvotePost`,
        {
          method: "PATCH"
        }
      );
      if (res.ok) {
        setPost({
          ...post,
          votes: post.votes + 1
        });
      }
    } else {
      let res = await fetch(
        `http://localhost:8080/api/v1/posts/${postId}/upvotePost`,
        {
          method: "PATCH"
        }
      );
      if (res.ok) {
        res = await fetch(
          `http://localhost:8080/api/v1/posts/${postId}/upvotePost`,
          {
            method: "PATCH"
          }
        );
        if (res.ok) {
          setPost({
            ...post,
            votes: post.votes + 2
          });
        }
      }
    }
  };

  const downvotePost = async (postId, doTwice) => {
    if (!doTwice) {
      const res = await fetch(
        `http://localhost:8080/api/v1/posts/${postId}/downvote`,
        {
          method: "PATCH"
        }
      );
      if (res.ok) {
        setPost({
          ...post,
          votes: post.votes - 1
        });
      }
    } else {
      let res = await fetch(
        `http://localhost:8080/api/v1/posts/${postId}/downvote`,
        {
          method: "PATCH"
        }
      );
      if (res.ok) {
        res = await fetch(
          `http://localhost:8080/api/v1/posts/${postId}/downvote`,
          {
            method: "PATCH"
          }
        );
        if (res.ok) {
          setPost({
            ...post,
            votes: postMessage.votes - 2
          });
        }
      }
    }
  };

  const rootCommentsJsx = comments
    .filter(comment => comment.parentId === null)
    .map(comment => (
      <Comment
        key={comment.id}
        comments={comments}
        comment={comment}
        upvoteComment={upvoteComment}
        downvoteComment={downvoteComment}
      />
    ));

  console.log(comments);
  return (
    <main>
      <div className="single-post">
        <div className="single-post-header">
          <Votes
            id={post.id}
            upvote={upvotePost}
            downvote={downvotePost}
            votes={post.votes}
          />
          <div className="single-post-info">
            <div className="single-post-sub-date">{`r/${post.subreadit}`}</div>
            <div className="single-post-title">{post.title}</div>
            <div className="single-post-link"></div>
            <div className="single-post-content">
              <p>{post.content}</p>
            </div>
            <div className="create-comment">
              <h2>Add a Comment!</h2>
              <form className="comment-form">
                <textarea
                  className="comment-form-input"
                  name="comment"
                  id="comment"
                ></textarea>
                <button className="form-button">Add Comment</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="comments">
        <h2>Comments</h2>
        {rootCommentsJsx}
      </div>
    </main>
  );
}
