import React from "react";

export default function Post({ post }) {
  return (
    <div className="post">
      <div className="post-votes">
        <img className="arrow" src="arrow-up-solid.svg" alt="" />
        <div className="votes">{post.votes}</div>
        <img className="arrow" src="arrow-down-solid.svg" alt="" />
      </div>
      <div className="post-picture">
        <div className="picture-container"></div>
      </div>
      <div className="post-content">
        <div className="post-title">
          {post.content}
        </div>
        <div className="post-info">
          <div className="post-subreadit">r/technology</div>
          <div className="post-author">Pepino_gonzalez</div>
          <div className="post-date">5 Hours ago</div>
        </div>
      </div>
    </div>
  );
}
