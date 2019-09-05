import React, { useEffect, useState } from "react";
import Votes from './Votes'

export default function SinglePost({ match }) {
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`http://localhost:8080/api/v1/posts/${match.params.id}`);
      const json = await res.json();
      setPost(json);
    };

    fetchPost();
  }, []);

  const upvote = async (postId, doTwice) => {
    if (!doTwice) {
      const res = await fetch(
        `http://localhost:8080/api/v1/posts/${postId}/upvote`,
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
        `http://localhost:8080/api/v1/posts/${postId}/upvote`,
        {
          method: "PATCH"
        }
      );
      if (res.ok) {
        res = await fetch(
          `http://localhost:8080/api/v1/posts/${postId}/upvote`,
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

  const downvote = async (postId, doTwice) => {
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

  return (
    <main>
      <div className="single-post">
        <div className="single-post-header">
          <Votes postId={post.id} upvote={upvote} downvote={downvote} votes={post.votes} />
          <div className="single-post-info">
            <div className="single-post-sub-date">{`r/${post.subreadit}`}</div>
            <div className="single-post-title">
              {post.title}
            </div>
            <div className="single-post-link"></div>
            <div className="single-post-content">
              <p>
                {post.content}
              </p>
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
    </main>
  );
}
