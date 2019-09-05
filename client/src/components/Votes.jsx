import React, { useState } from "react";

import arrowDown from "../img/arrow-down-solid.svg";
import arrowUp from "../img/arrow-up-solid.svg";

export default function Votes({ postId, votes, upvote, downvote }) {
  const [voteStatus, setVoteStatus] = useState("none");

  const clickVote = (action, postId) => {
    if (action === "upvote") {
      if (voteStatus === "none") {
        upvote(postId);
        setVoteStatus("upvote");
      } else if (voteStatus === "downvote") {
        upvote(postId, true);
        setVoteStatus("upvote");
      } else if (voteStatus === 'upvote') {
        downvote(postId)
        setVoteStatus('none')
      }
    } else if (action === "downvote") {
      if (voteStatus === "none") {
        downvote(postId);
        setVoteStatus("downvote");
      } else if (voteStatus === "upvote") {
        downvote(postId, true);
        setVoteStatus("downvote");
      } else if (voteStatus === 'downvote') {
        upvote(postId)
        setVoteStatus('none')
      }
    }
  };

  return (
    <div className="post-votes">
      <img
        onClick={() => {
          clickVote("upvote", postId);
        }}
        className={
          voteStatus === "upvote"
            ? "arrow vote-selected pointer"
            : "arrow pointer"
        }
        src={arrowUp}
        alt=""
      />
      <div className="votes">{votes}</div>
      <img
        onClick={() => {
          clickVote("downvote", postId);
        }}
        className={
          voteStatus === "downvote"
            ? "arrow vote-selected pointer"
            : "arrow pointer"
        }
        src={arrowDown}
        alt=""
      />
    </div>
  );
}
