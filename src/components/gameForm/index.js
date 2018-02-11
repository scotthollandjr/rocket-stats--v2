import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../../actions/gameActions';
import * as playerActions from '../../actions/playerActions';
import * as teamActions from '../../actions/teamActions';
import { addGame } from '../../actions/addGameActions';
import PropTypes from 'prop-types';
import React from 'react';

class GameFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        team_1: {
          player_1: {},
          player_2: {}
        },
        team_2: {
          player_1: {},
          player_2: {}
        }
      },
      team_1: {
        id: undefined,
        win: true,
        player_1: {},
        player_2: {}
      },
      team_2: {
        id: undefined,
        win: false,
        player_1: {},
        player_2: {}
      },
      players: [
        {
          assists: '',
          goals: '',
          id: undefined,
          mvp: true,
          saves: '',
          score: '',
          shots: '',
          win: true
        },
        {
          assists: '',
          goals: '',
          id: undefined,
          mvp: false,
          saves: '',
          score: '',
          shots: '',
          win: true
        },
        {
          assists: '',
          goals: '',
          id: undefined,
          mvp: false,
          saves: '',
          score: '',
          shots: '',
          win: false
        },
        {
          assists: '',
          goals: '',
          id: undefined,
          mvp: false,
          saves: '',
          score: '',
          shots: '',
          win: false
        }
      ]
    };

    this.buildGame = this.buildGame.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePlayerChange = (i, key) => (event) => {
    let value = event.target.value ? parseInt(event.target.value) : '';
    const newPlayers = this.state.players.map((player, si) => {
      if (i !== si) return player;
      return {...player, [key]: value};
    });

    this.setState({ players: newPlayers });
    this.checkTeams();
  }

  checkTeams() {
    if ((this.state.players[0].id >= 0) && (this.state.players[1].id >= 0)) {
      let id1 = this.state.players[0].id;
      let id2 = this.state.players[1].id;
      let teamId = '';
      for (let team of this.props.teams) {
        if ((team.players.indexOf(id1) >= 0) && (team.players.indexOf(id2) >= 0)) {
          const newTeam1 = Object.assign({}, this.state.team_1, {
            id: team.id
          });
          this.setState({ team_1: newTeam1 });
        }
      }
    }
    if ((this.state.players[2].id >= 0) && (this.state.players[3].id >= 0)) {
      let id1 = this.state.players[2].id;
      let id2 = this.state.players[3].id;
      let teamId = '';
      for (let team of this.props.teams) {
        if ((team.players.indexOf(id1) >= 0) && (team.players.indexOf(id2) >= 0)) {
          const newTeam2 = Object.assign({}, this.state.team_2, {
            id: team.id
          });
          this.setState({ team_2: newTeam2 });
        }
      }
    }
  }

  buildGame(e) {
    e.preventDefault();
    const newGame = JSON.parse(JSON.stringify(this.state.game));

    newGame.team_1 = this.state.team_1;
    newGame.team_2 = this.state.team_2;
    newGame.team_1.player_1 = this.state.players[0];
    newGame.team_1.player_2 = this.state.players[1];
    newGame.team_2.player_1 = this.state.players[2];
    newGame.team_2.player_2 = this.state.players[3];

    this.setState({ game: newGame }, this.handleSubmit);
  }

  handleSubmit() {
    this.props.onAddGame(this.state.game)
  }

  componentWillMount() {
    this.props.gameActions.fetchGames();
    this.props.playerActions.fetchPlayers();
    this.props.teamActions.fetchTeams();
  }

  render() {
    return (
      <form onSubmit={this.buildGame}>
        <h3>New Game</h3>
        <div>
          <p>TEAM 1: {this.props.teams[this.state.team_1.id] ? this.props.teams[this.state.team_1.id].name : 'team 1'}</p>
          <p>TEAM 2: {this.props.teams[this.state.team_2.id] ? this.props.teams[this.state.team_2.id].name : 'team 2'}</p>
          <div>
            {this.state.players.map((player, playerIndex) => (
              <div key={playerIndex}>
                <div>
                  <b>PLAYER:</b>
                  <select value={player.id} onChange={this.handlePlayerChange(playerIndex, 'id')}>
                    <option></option>
                    {
                      Object.keys(this.props.players).map((i) => {
                        return (
                          <option key={i} value={this.props.players[i].id}>{this.props.players[i].name}</option>
                        )
                      }, this)
                    }
                  </select>
                </div>
                <div>
                  <b>SCORE:</b>
                  <input
                  type="number"
                  value={player.score}
                  onChange={this.handlePlayerChange(playerIndex, 'score')}
                  />
                </div>
                <div>
                  <b>GOALS:</b>
                  <input
                  type="number"
                  value={player.goals}
                  onChange={this.handlePlayerChange(playerIndex, 'goals')}
                  />
                </div>
                <div>
                  <b>ASSISTS:</b>
                  <input
                  type="number"
                  value={player.assists}
                  onChange={this.handlePlayerChange(playerIndex, 'assists')}
                  />
                </div>
                <div>
                  <b>SAVES:</b>
                  <input
                  type="number"
                  value={player.saves}
                  onChange={this.handlePlayerChange(playerIndex, 'saves')}
                  />
                </div>
                <div>
                  <b>SHOTS:</b>
                  <input
                  type="number"
                  value={player.shots}
                  onChange={this.handlePlayerChange(playerIndex, 'shots')}
                  />
                </div>
                <br />
                <br />
              </div>
            ))}
          </div>
          <div>
            <input type="submit" value="Add Game!" />
          </div>
        </div>
      </form>
    )
  }
}

GameFormComponent.propTypes = {
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
    onAddGame: (game) => dispatch(addGame(game)),
  };
}

const GameForm = connect(
  mapStateToProps,
  mapDispactToProps
)(GameFormComponent)

export { GameForm };
