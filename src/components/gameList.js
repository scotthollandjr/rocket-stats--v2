import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../actions/gameActions';
import * as playerActions from '../actions/playerActions';
import * as teamActions from '../actions/teamActions';
import { addGame } from '../actions/addGameActions';
import PropTypes from 'prop-types';
import React from 'react';

class gameList extends React.Component {
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

    // this.handleChange = this.handleChange.bind(this);
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
    console.log('handleSubimt game', this.state.game)
    this.props.onAddGame(this.state.game)
  }

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

  renderLater() {
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

  render() {
    return (
      <form onSubmit={this.buildGame}>
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
    onAddGame: (name) => dispatch(addGame(name)),
  };
}

export default connect(
  mapStateToProps,
  mapDispactToProps
)(gameList);
