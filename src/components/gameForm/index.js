import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../../actions/gameActions';
import * as playerActions from '../../actions/playerActions';
import * as teamActions from '../../actions/teamActions';
import { addGame } from '../../actions/addGameActions';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

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
          win: true,
          blue: true
        },
        {
          assists: '',
          goals: '',
          id: undefined,
          mvp: false,
          saves: '',
          score: '',
          shots: '',
          win: true,
          blue: true
        },
        {
          assists: '',
          goals: '',
          id: undefined,
          mvp: false,
          saves: '',
          score: '',
          shots: '',
          win: false,
          blue: false
        },
        {
          assists: '',
          goals: '',
          id: undefined,
          mvp: false,
          saves: '',
          score: '',
          shots: '',
          win: false,
          blue: false
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
        <div className="form-container">
          <div className="player-rows">
            <div className="team-name blue">
              {this.props.teams[this.state.team_1.id] ? this.props.teams[this.state.team_1.id].name : 'Blue'}
            </div>
            {this.state.players.filter(player => {
              return this.state.players.indexOf(player) <= 1
            }).map((player, playerIndex) => (
              <div key={playerIndex} className="player-row blue">
                <div className="photo-square">
                </div>
                <div className="select-square">
                  <select value={player.id} onChange={this.handlePlayerChange(playerIndex, 'id')}>
                    <option>PLAYER</option>
                    {
                      Object.keys(this.props.players).map((i) => {
                        return (
                          <option key={i} value={this.props.players[i].id}>{this.props.players[i].name}</option>
                        )
                      }, this)
                    }
                  </select>
                </div>
                <div className="input-square">
                  <input
                  type="number"
                  value={player.score}
                  placeholder="0"
                  onChange={this.handlePlayerChange(playerIndex, 'score')}
                  />
                </div>
                <div className="input-square">
                  <input
                  type="number"
                  value={player.goals}
                  placeholder="0"
                  onChange={this.handlePlayerChange(playerIndex, 'goals')}
                  />
                </div>
                <div className="input-square">
                  <input
                  type="number"
                  value={player.assists}
                  placeholder="0"
                  onChange={this.handlePlayerChange(playerIndex, 'assists')}
                  />
                </div>
                <div className="input-square">
                  <input
                  type="number"
                  value={player.saves}
                  placeholder="0"
                  onChange={this.handlePlayerChange(playerIndex, 'saves')}
                  />
                </div>
                <div className="input-square">
                  <input
                  type="number"
                  value={player.shots}
                  placeholder="0"
                  onChange={this.handlePlayerChange(playerIndex, 'shots')}
                  />
                </div>
                <div className="empty-square">
                </div>
                <br />
                <br />
              </div>
            ))}
          </div>
          <div className="player-rows">
            <div className="team-name orange">
              {this.props.teams[this.state.team_1.id] ? this.props.teams[this.state.team_1.id].name : 'Orange'}
            </div>
            {this.state.players.filter(player => {
              return this.state.players.indexOf(player) >= 2
            }).map((player, playerIndex) => (
              <div key={playerIndex} className="player-row orange">
                <div className="photo-square">
                </div>
                <div className="select-square">
                  <select value={player.id} onChange={this.handlePlayerChange(playerIndex, 'id')}>
                    <option>PLAYER</option>
                    {
                      Object.keys(this.props.players).map((i) => {
                        return (
                          <option key={i + 1} value={this.props.players[i].id}>{this.props.players[i].name}</option>
                        )
                      }, this)
                    }
                  </select>
                </div>
                <div className="input-square">
                  <input
                  type="number"
                  value={player.score}
                  placeholder="0"
                  onChange={this.handlePlayerChange(playerIndex, 'score')}
                  />
                </div>
                <div className="input-square">
                  <input
                  type="number"
                  value={player.goals}
                  placeholder="0"
                  onChange={this.handlePlayerChange(playerIndex, 'goals')}
                  />
                </div>
                <div className="input-square">
                  <input
                  type="number"
                  value={player.assists}
                  placeholder="0"
                  onChange={this.handlePlayerChange(playerIndex, 'assists')}
                  />
                </div>
                <div className="input-square">
                  <input
                  type="number"
                  value={player.saves}
                  placeholder="0"
                  onChange={this.handlePlayerChange(playerIndex, 'saves')}
                  />
                </div>
                <div className="input-square">
                  <input
                  type="number"
                  value={player.shots}
                  placeholder="0"
                  onChange={this.handlePlayerChange(playerIndex, 'shots')}
                  />
                </div>
                <div className="empty-square">
                </div>
                <br />
                <br />
              </div>
            ))}
          </div>
        </div>
        <div className="button-container">
          <input className="submit-button" type="submit" value="submit" />
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
