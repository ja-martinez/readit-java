import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import NavBar from './components/NavBar'
import Home from './components/Home'
import SinglePost from './components/SinglePost'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Route path="/" exact component={Home} />
        <Route path="/posts/:id" component={SinglePost} />
      </Router>
    </div>
  );
}

export default App;
