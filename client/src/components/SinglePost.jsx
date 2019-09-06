import React, { useEffect, useState } from "react";
import Votes from "./Votes";
import Comment from "./Comment";
import { AuthConsumer } from "./AuthContext";

export default function SinglePost({ match }) {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [rootCommentContent, setRootCommentContent] = useState('');

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
      const json = await res.json();
      setComments([
        ...comments,
        {
          id: json.id,
          content,
          votes: json.votes,
          parentId: null,
          username
        }
      ]);
    }
  };

  const createSubcomment = async (
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
      const json = await res.json();
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

  comments.sort((comment1, comment2) => comment2.votes - comment1.votes);

  return (
    <main className="single-post-page">
      <AuthConsumer>
        {({ user }) => (
          <>
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
                  <div className="single-post-link">
                    <img className="single-post-picture" src={post.link_url} alt=""/>
                  </div>
                  <div className="single-post-content">
                    <p>{post.content}</p>
                  </div>
                  <div className="create-comment">
                    <h2>Add a Comment!</h2>
                    <form
                      className="comment-form"
                      onSubmit={async e => {
                        e.preventDefault();
                        await createRootComment(post.id, user.id, user.username, rootCommentContent);
                        setRootCommentContent('');
                      }}
                    >
                      <textarea
                        className="comment-form-input"
                        name="comment"
                        id="comment"
                        value={rootCommentContent}
                        onChange={
                          e => {
                            setRootCommentContent(e.target.value);
                          }
                        }
                      ></textarea>
                      <button className="form-button" type="submit">Add Comment</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="comments">
              <h2 className="comments-header">Comments</h2>
              {
                comments
                .filter(comment => comment.parentId === null)
                .map(comment => (
                  <Comment
                    key={comment.id}
                    comments={comments}
                    comment={comment}
                    upvoteComment={upvoteComment}
                    downvoteComment={downvoteComment}
                    createSubcomment={createSubcomment}
                    user={user}
                    postId={post.id}
                  />
                ))
              }
            </div>
          </>
        )}
      </AuthConsumer>
    </main>
  );
}
