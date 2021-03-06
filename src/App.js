import React, { Component } from 'react';
import { Container, GameForm } from './components';
import { NavLink, Route, Redirect, Switch } from 'react-router-dom';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="title">
          <span>ROCKET-</span><span> STATS</span>
        </div>
        <div className="main">
          <nav>
            <div className="nav-link">
              <NavLink to="/stats" activeClassName="active">
                <div className="outer-a left">
                  <div className="inner-a">
                    Stats
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="nav-link">
              <NavLink to="/form" exact={true} activeClassName="active">
                <div className="outer-a right">
                  <div className="inner-a">
                    New Game
                  </div>
                </div>
              </NavLink>
            </div>
          </nav>
        </div>
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
