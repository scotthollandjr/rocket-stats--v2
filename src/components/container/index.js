import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../../actions/gameActions';
import * as playerActions from '../../actions/playerActions';
import * as teamActions from '../../actions/teamActions';
import { addGame } from '../../actions/addGameActions';
import PropTypes from 'prop-types';
import React from 'react';
import { GameForm, GameList, PlayerList, TeamList } from '../index';
import { Link, NavLink, Route, Redirect, Switch } from 'react-router-dom';
import './styles.scss';

class ContainerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.gameActions.fetchGames();
    this.props.playerActions.fetchPlayers();
    this.props.teamActions.fetchTeams();
  }

  calculateStats() {}

  render() {
    if (!Object.keys(this.props.games).length || !Object.keys(this.props.players).length || !Object.keys(this.props.teams).length) {
      return (
        <div>
          <div>Loading...</div>
        </div>
      )
    } else {
      return (
        <div className="menu">
          <nav className="sub-menu">
            <div className="nav-link">
              <NavLink to="/stats/games" exact={true} activeClassName="active">
                <div className="outer-a">
                  <div className="inner-a">
                    Games
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="nav-link">
              <NavLink to="/stats/teams" exact={true} activeClassName="active">
                <div className="outer-a">
                  <div className="inner-a">
                    Teams
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="nav-link">
              <NavLink to="/stats/players" exact={true} activeClassName="active">
                <div className="outer-a">
                  <div className="inner-a">
                    Players
                  </div>
                </div>
              </NavLink>
            </div>
          </nav>
          <Switch>
            <Route path="/stats/games" render={()=><GameList
              teams={this.props.teams} players={this.props.players}
              games={this.props.games} />}/>
            <Route path="/stats/teams" render={()=><TeamList
              teams={this.props.teams} players={this.props.players} />}/>
            <Route path="/stats/players" render={()=><PlayerList players={this.props.players}
            games={this.props.games} />}/>
            <Redirect from="/stats" to="/stats/games" />
          </Switch>
        </div>
      )
    }
  }
}


ContainerComponent.propTypes = {
  gameActions: PropTypes.object,
  playerActions: PropTypes.object,
  teamActions: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    games: state.games,
    players: state.players,
    teams: state.teams,
  };
}

function mapDispactToProps(dispatch) {
  return {
    gameActions: bindActionCreators(gameActions, dispatch),
    playerActions: bindActionCreators(playerActions, dispatch),
    teamActions: bindActionCreators(teamActions, dispatch),
    onAddGame: (name) => dispatch(addGame(name)),
  };
}

const Container = connect(
  mapStateToProps,
  mapDispactToProps
)(ContainerComponent);

export { Container };
