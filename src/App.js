import React, { Component } from 'react';
import { Container, GameForm } from './components';
import { Link, Route, Redirect, Switch } from 'react-router-dom';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/stats">Stats</Link>
          <Link to="/form">Form</Link>
        </nav>
        <div>
          <Switch>
            <Route path="/stats" component={Container} />
            <Route exact path="/form" component={GameForm} />
            <Redirect from="/" to="/stats" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
