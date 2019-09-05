import React, { useState } from "react";

import arrowDown from "../img/arrow-down-solid.svg";
import arrowUp from "../img/arrow-up-solid.svg";

export default function Votes({ id, votes, upvote, downvote }) {
  const [voteStatus, setVoteStatus] = useState("none");

  const clickVote = (action, id) => {
    if (action === "upvote") {
      if (voteStatus === "none") {
        upvote(id);
        setVoteStatus("upvote");
      } else if (voteStatus === "downvote") {
        upvote(id, true);
        setVoteStatus("upvote");
      } else if (voteStatus === 'upvote') {
        downvote(id)
        setVoteStatus('none')
      }
    } else if (action === "downvote") {
      if (voteStatus === "none") {
        downvote(id);
        setVoteStatus("downvote");
      } else if (voteStatus === "upvote") {
        downvote(id, true);
        setVoteStatus("downvote");
      } else if (voteStatus === 'downvote') {
        upvote(id)
        setVoteStatus('none')
      }
    }
  };

  return (
    <div className="post-votes">
      <img
        onClick={() => {
          clickVote("upvote", id);
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
          clickVote("downvote", id);
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
