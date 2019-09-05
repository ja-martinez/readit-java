import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import SinglePost from "./components/SinglePost";
import Login from "./components/Login";
import CreatePost from "./components/CreatePost";
import { AuthProvider, AuthConsumer } from "./components/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <NavBar />

          <Route path="/" exact component={Home} />
          <Route path="/posts/:id" component={SinglePost} />
          <Route path="/login" component={Login} />
          <Route path="/createPost" component={CreatePost} />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
