import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../actions/gameActions';
import * as playerActions from '../actions/playerActions';
import * as teamActions from '../actions/teamActions';
import PropTypes from 'prop-types';
import React from 'react';

class gameList extends React.Component {
  componentWillMount() {
    this.props.gameActions.fetchGames();
    this.props.playerActions.fetchPlayers();
    this.props.teamActions.fetchTeams();
  }

  renderTeams(item, i) {
    return <div key={i}>
            <p>{item.name} ({this.props.players[item.players[0]].name}, {this.props.players[item.players[1]].name})</p>
           </div>;
  }

  renderPlayers(item, i) {
    return <div key={i}>
            <p>{item.name}</p>
           </div>;
  }

  renderGames(item, i) {
    return <div key={i + 1}>
            <p>Game #{i + 1}</p>
            <p>Team 1: {this.props.teams[item.team_1.id].name}</p>
            <p>Player 1: {this.props.players[item.team_1.player_1.id].name}</p>
            <p>(assists: {item.team_1.player_1.assists}, goals: {item.team_1.player_1.goals}, saves: {item.team_1.player_1.saves}, shots: {item.team_1.player_1.shots}, score: {item.team_1.player_1.score})</p>
            <p>Player 2: {this.props.players[item.team_1.player_2.id].name}</p>
            <p>(assists: {item.team_1.player_2.assists}, goals: {item.team_1.player_2.goals}, saves: {item.team_1.player_2.saves}, shots: {item.team_1.player_2.shots}, score: {item.team_1.player_2.score})</p>
            <p>Team 2: {this.props.teams[item.team_2.id].name}</p>
            <p>Player 1: {this.props.players[item.team_2.player_1.id].name}</p>
            <p>(assists: {item.team_2.player_1.assists}, goals: {item.team_2.player_1.goals}, saves: {item.team_2.player_1.saves}, shots: {item.team_2.player_1.shots}, score: {item.team_2.player_1.score})</p>
            <p>Player 2: {this.props.players[item.team_2.player_2.id].name}</p>
            <p>(assists: {item.team_2.player_2.assists}, goals: {item.team_2.player_2.goals}, saves: {item.team_2.player_2.saves}, shots: {item.team_2.player_2.shots}, score: {item.team_2.player_2.score})</p>
           </div>;
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
        <div>
        {
          Object.keys(this.props.teams).map((team, i) => {
            return (
              this.renderTeams(this.props.teams[team], i)
            )
          }, this)
        }
        </div>
        <div>
        {
          Object.keys(this.props.players).map((player, i) => {
            return (
              this.renderPlayers(this.props.players[player], i)
            )
          }, this)
        }
        </div>
        <div>
        {
          Object.keys(this.props.games).map((game, i) => {
            return (
              this.renderGames(this.props.games[game], i)
            )
          }, this)
        }
        </div>
        </div>
      )
    }
  }
}

gameList.propTypes = {
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
  };
}

export default connect(
  mapStateToProps,
  mapDispactToProps
)(gameList);
