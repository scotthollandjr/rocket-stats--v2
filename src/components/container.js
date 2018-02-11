import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../actions/gameActions';
import * as playerActions from '../actions/playerActions';
import * as teamActions from '../actions/teamActions';
import { addGame } from '../actions/addGameActions';
import PropTypes from 'prop-types';
import React from 'react';
import GameForm from './gameForm';
import TeamList from './teamList';
import PlayerList from './playerList';
import GameList from './gameList';

class container extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.gameActions.fetchGames();
    this.props.playerActions.fetchPlayers();
    this.props.teamActions.fetchTeams();
  }

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
          <GameForm />
          <GameList
          teams={this.props.teams} players={this.props.players}
          games={this.props.games} />
          <PlayerList
          players={this.props.players} />
          <TeamList
          teams={this.props.teams} players={this.props.players}/>
        </div>
      )
    }
  }
}


container.propTypes = {
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

export default connect(
  mapStateToProps,
  mapDispactToProps
)(container);
