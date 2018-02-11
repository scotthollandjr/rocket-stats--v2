import React, { Component } from 'react';
import Container from './components/container';
import GameForm from './components/gameForm';
import { Link, Route, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/stats">Stats</Link>
          <Link to="/form">Form</Link>
        </nav>
        <div>
          <Route path="/stats" component={Container} />
          <Route exact path="/form" component={GameForm} />
          <Redirect from="/" to="/stats" />
        </div>
      </div>
    );
  }
}

export default App;
