import React, { useState, useEffect } from "react";
import { AuthConsumer } from "./AuthContext";
import { Redirect } from "react-router-dom"

export default function CreatePost({ history }) {
  const [subreadits, setSubreadits] = useState([]);
  const [postForm, setPostForm] = useState({
    subreadit: "",
    title: "",
    content: "",
    linkUrl: ""
  });

  useEffect(() => {
    const fetchSubreadits = async () => {
      const res = await fetch("http://localhost:8080/api/v1/subreadits");
      const json = await res.json();
      setSubreadits(json);
    };

    fetchSubreadits();
  }, []);

  const createPost = async (userId, subreaditId, title, content, linkUrl) => {
    const res = await fetch("http://localhost:8080/api/v1/posts", {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        subreadit_id: subreaditId,
        title,
        content,
        link_url: linkUrl
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.ok) {
      const json = await res.json();
      history.push(`/posts/${json.id}`);
    }
  };

  const handleFormChange = e => {
    setPostForm({
      ...postForm,
      [e.target.name]: e.target.value
    });
  };

  const subreaditOptionsJsx = subreadits.map(subreadit => (
    <option key={subreadit.id} value={subreadit.id}>
      {subreadit.name}
    </option>
  ));

  return (
    <div className="create-post">
      <AuthConsumer>
        {({ user }) => {
          if (!user.username) {
            return <Redirect to="/login" />;
          } else {
            return (
              <div className="card">
                <h1 className="card-header">Create a Post</h1>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    createPost(
                      user.id,
                      postForm.subreadit,
                      postForm.title,
                      postForm.content,
                      postForm.linkUrl
                    );
                  }}
                >
                  <label htmlFor="subreadit">Subreadit</label>
                  <select
                    value={postForm.subreadit}
                    name="subreadit"
                    id="subreadit"
                    onChange={handleFormChange}
                    required
                  >
                    <option value="" disabled></option>
                    {subreaditOptionsJsx}
                  </select>
                  <label htmlFor="title">Title</label>
                  <input
                    value={postForm.title}
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={handleFormChange}
                  />
                  <label htmlFor="img-url">Image Url</label>
                  <input
                    value={postForm.linkUrl}
                    type="text"
                    id="linkUrl"
                    name="linkUrl"
                    onChange={handleFormChange}
                  />
                  <label htmlFor="content">Content</label>
                  <textarea
                    value={postForm.content}
                    name="content"
                    id="content"
                    rows="5"
                    onChange={handleFormChange}
                  ></textarea>
                  <input type="submit" value="Submit" />
                </form>
              </div>
            );
          }
        }}
      </AuthConsumer>
    </div>
  );
}
