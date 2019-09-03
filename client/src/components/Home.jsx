import React, {useState, useEffect} from "react";
import Post from './Post'
import Subreadits from './Subreadits'

// find a way to implement a way to load the subreadits and aso have a selected subreadit category

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [subreadits, setSubreadits] = useState([]);
  const [selectedSubreadit, setSelectedSubreadit] = useState("everything");

  useEffect(() => {
    const fetchSubreadits = async () => {
      const res = fetch("http://localhost:8080/subreadits");
      const json = res.json();
      setSubreadits(json);
    };

    const fetchPosts = async () => {
      let res;
      let json;
      switch (selectedSubreadit) {
        case "everything":
          res = await fetch("http://localhost:8080/posts");
          json = await res.json();
          setPosts(json);
          break;
        default:
          const currentSubreaditId = subreadits.filter(
            subreadit => subreadit.name === selectedSubreadit
          ).id;
          res = await fetch(
            `http://localhost:8080/subreadits/${currentSubreaditId}/posts`
          );
          json = await res.json();
          setPosts(json);
      }
    };

    fetchSubreadits();
    fetchPosts();
  });

  const postsJsx = posts.map(post => <Post key={post.id} post={post} />)

  return (
    <main className="container main-home">
      <div className="posts"></div>
      <Subreadits selectedSubreadit={selectedSubreadit} subreadits={subreadits} />
    </main>
  );
}
