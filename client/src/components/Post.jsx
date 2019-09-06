import React from "react";
import { Link } from 'react-router-dom'
import Votes from './Votes'



export default function Post({ post, upvote, downvote }) {

  const imageStyle = {
    backgroundImage: `url('${post.link_url}')`
  };

  return (
    <div className="post">
      <Votes id={post.id} votes={post.votes} upvote={upvote} downvote={downvote} />
      <div className="post-picture">
        <div className="picture-container" style={imageStyle}></div>
      </div>
      <div className="post-content">
        <div className="post-title">
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </div>
        <div className="post-info">
          <div className="post-subreadit">{`r/${post.subreadit}`}</div>
          <div className="post-author">{`u/${post.username}`}</div>
          {/* <div className="post-date">5 Hours ago</div> */}
        </div>
      </div>
    </div>
  );
}
