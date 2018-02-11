import React from 'react';

class gameList extends React.Component {

  renderGames(game, i) {
    return (
      <div key={i + 1}>
        <p>Game #{i + 1}</p>
        <h4>Team 1: {this.props.teams[game.team_1.id].name}</h4>
        <p>Player 1: {this.props.players[game.team_1.player_1.id].name}</p>
        <p>(assists: {game.team_1.player_1.assists}, goals: {game.team_1.player_1.goals}, saves: {game.team_1.player_1.saves}, shots: {game.team_1.player_1.shots}, score: {game.team_1.player_1.score})</p>
        <p>Player 2: {this.props.players[game.team_1.player_2.id].name}</p>
        <p>(assists: {game.team_1.player_2.assists}, goals: {game.team_1.player_2.goals}, saves: {game.team_1.player_2.saves}, shots: {game.team_1.player_2.shots}, score: {game.team_1.player_2.score})</p>
        <h4>Team 2: {this.props.teams[game.team_2.id].name}</h4>
        <p>Player 1: {this.props.players[game.team_2.player_1.id].name}</p>
        <p>(assists: {game.team_2.player_1.assists}, goals: {game.team_2.player_1.goals}, saves: {game.team_2.player_1.saves}, shots: {game.team_2.player_1.shots}, score: {game.team_2.player_1.score})</p>
        <p>Player 2: {this.props.players[game.team_2.player_2.id].name}</p>
        <p>(assists: {game.team_2.player_2.assists}, goals: {game.team_2.player_2.goals}, saves: {game.team_2.player_2.saves}, shots: {game.team_2.player_2.shots}, score: {game.team_2.player_2.score})</p>
      </div>
    )
  }

  render() {
    if (!Object.keys(this.props.players).length || !Object.keys(this.props.teams).length || !Object.keys(this.props.games).length) {
      return (
        <div>
          <div>Loading...</div>
        </div>
      )
    } else {
      return (
        <div>
          <h3>Games</h3>
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

export default gameList
