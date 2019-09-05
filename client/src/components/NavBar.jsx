import React from "react";
import { Link } from "react-router-dom";
import { AuthConsumer } from "./AuthContext";

export default function NavBar() {
  return (
    <nav>
      <AuthConsumer>
        {({ user, logout }) => (
          <div className="container">
            <div className="logo">
              <Link to="/">Readit</Link>
            </div>
            <div className="search">
              <input
                className="search-box"
                type="text"
                placeholder="Search through Readit here"
              />
            </div>
            <div className="create-post-link">
              <Link to="/createPost">+Post</Link>
            </div>
            <div className="links">
              <div className="link">
                <Link to="/">Home</Link>
              </div>
              {user.username ? <button className="link" onClick={logout}>{`${user.username}-Logout`}</button> : <div className="link"><Link to="/login">Login</Link></div>}
            </div>
          </div>
        )}
      </AuthConsumer>
    </nav>
  );
}
