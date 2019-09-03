import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <div className="container">
        <div className="logo"><Link to="/">Readit</Link></div>
        <div className="search">
          <input
            className="search-box"
            type="text"
            placeholder="Search through Readit here"
          />
        </div>
        <div className="links">
          <div className="link"><Link to="/">Home</Link></div>
          <div className="link"><Link to="/">Profile</Link></div>
        </div>
      </div>
    </nav>
  );
}
