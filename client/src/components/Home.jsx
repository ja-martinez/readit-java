import React, { useState, useEffect } from "react";
import Post from "./Post";
import Subreadits from "./Subreadits";

// find a way to implement a way to load the subreadits and aso have a selected subreadit category

export default function Home({ history }) {
  const [posts, setPosts] = useState([]);
  const [subreadits, setSubreadits] = useState([]);
  const [selectedSubreadit, setSelectedSubreadit] = useState("everything");

  useEffect(() => {
    const fetchSubreadits = async () => {
      const res = await fetch("http://localhost:8080/api/v1/subreadits");
      const json = await res.json();
      setSubreadits(json);
    };

    const fetchPosts = async () => {
      let res;
      let json;
      res = await fetch("http://localhost:8080/api/v1/posts");
      json = await res.json();
      setPosts(json);
      // switch (selectedSubreadit) {
      //   case "everything":
      //     res = await fetch("http://localhost:8080/api/v1/posts");
      //     json = await res.json();
      //     setPosts(json);
      //     break;
      //   default:
      //     const currentSubreaditId = subreadits.filter(
      //       subreadit => subreadit.name === selectedSubreadit
      //     ).id;
      //     res = await fetch(
      //       `http://localhost:8080/api/v1/subreadits/${currentSubreaditId}/posts`
      //     );
      //     json = await res.json();
      //     setPosts([{id: 0, name: 'everything'}, ...json]);
      // }
    };

    fetchSubreadits();
    fetchPosts();
  }, []);

  const changeSubreadit = e => {
    setSelectedSubreadit(e.target.value);
  };

  const upvote = async (postId, doTwice) => {
    if (!doTwice) {
      const res = await fetch(
        `http://localhost:8080/api/v1/posts/${postId}/upvote`,
        {
          method: "PATCH"
        }
      );
      if (res.ok) {
        setPosts(
          posts.map(post => {
            if (post.id === postId) {
              return {
                ...post,
                votes: post.votes + 1
              };
            } else {
              return post;
            }
          })
        );
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
          setPosts(
            posts.map(post => {
              if (post.id === postId) {
                return {
                  ...post,
                  votes: post.votes + 2
                };
              } else {
                return post;
              }
            })
          );
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
        setPosts(
          posts.map(post => {
            if (post.id === postId) {
              return {
                ...post,
                votes: post.votes - 1
              };
            } else {
              return post;
            }
          })
        );
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
          setPosts(
            posts.map(post => {
              if (post.id === postId) {
                return {
                  ...post,
                  votes: post.votes - 2
                };
              } else {
                return post;
              }
            })
          );
        }
      }
    }
  };

  let postsJsx;

  posts.sort((post1, post2) => post2.votes - post1.votes);

  if (selectedSubreadit === "everything") {
    postsJsx = posts.map(post => (
      <Post key={post.id} post={post} upvote={upvote} downvote={downvote} history={history} />
    ));
  } else {
    postsJsx = posts.filter(post => post.subreadit === selectedSubreadit).map(post => (
      <Post key={post.id} post={post} upvote={upvote} downvote={downvote} history={history} />
    ));
  }


  return (
    <main className="container main-home">
      <div className="posts">{postsJsx}</div>
      <Subreadits
        selectedSubreadit={selectedSubreadit}
        subreadits={subreadits}
        changeSubreadit={changeSubreadit}
      />
    </main>
  );
}
