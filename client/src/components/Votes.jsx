import React, { useState } from "react";
import { AuthConsumer } from "./AuthContext";

import arrowDown from "../img/arrow-down-solid.svg";
import arrowUp from "../img/arrow-up-solid.svg";

export default function Votes({ id, votes, upvote, downvote, history }) {
  const [voteStatus, setVoteStatus] = useState("none");

  const clickVote = (action, id) => {
    if (action === "upvote") {
      if (voteStatus === "none") {
        upvote(id);
        setVoteStatus("upvote");
      } else if (voteStatus === "downvote") {
        upvote(id, true);
        setVoteStatus("upvote");
      } else if (voteStatus === "upvote") {
        downvote(id);
        setVoteStatus("none");
      }
    } else if (action === "downvote") {
      if (voteStatus === "none") {
        downvote(id);
        setVoteStatus("downvote");
      } else if (voteStatus === "upvote") {
        downvote(id, true);
        setVoteStatus("downvote");
      } else if (voteStatus === "downvote") {
        upvote(id);
        setVoteStatus("none");
      }
    }
  };

  return (
    <div className="post-votes">
      <AuthConsumer>
        {user => (
          <>
            <img
              onClick={() => {
                if (user.username) {
                clickVote("upvote", id);
                } else {
                  history.push('/login')
                }
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
                if (user.username) {
                clickVote("downvote", id);
                } else {
                  history.push('login')
                }
              }}
              className={
                voteStatus === "downvote"
                  ? "arrow vote-selected pointer"
                  : "arrow pointer"
              }
              src={arrowDown}
              alt=""
            />
          </>
        )}
      </AuthConsumer>
    </div>
  );
}
