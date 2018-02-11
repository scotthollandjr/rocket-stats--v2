import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../../actions/gameActions';
import * as playerActions from '../../actions/playerActions';
import * as teamActions from '../../actions/teamActions';
import { addGame } from '../../actions/addGameActions';
import PropTypes from 'prop-types';
import React from 'react';
import { GameForm, GameList, PlayerList, TeamList } from '../index';
import { Link, Route, Redirect, Switch } from 'react-router-dom';

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
        <div>
          <nav>
            <Link to="/stats/games">Games</Link>
            <Link to="/stats/teams">Teams</Link>
            <Link to="/stats/players">Players</Link>
          </nav>
          <Switch>
            <Route path="/stats/games" render={()=><GameList
              teams={this.props.teams} players={this.props.players}
              games={this.props.games}/>}/>
            <Route path="/stats/teams" render={()=><TeamList
              teams={this.props.teams} players={this.props.players}/>}/>
            <Route path="/stats/players" render={()=><PlayerList players={this.props.players}/>}/>
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
