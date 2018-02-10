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

  renderData(item) {
    return <div key={item.id}>{item.title}</div>;
  }

  render() {
    if (!this.props.games) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      return (
        <div>

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
