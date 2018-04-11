import React from 'react';
import './styles.scss';

class PlayerList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      players: []
    }
    this.playerSort = this.playerSort.bind(this)
  }

  componentWillMount() {
    this.setState({ players: this.props.players });
  }

  playerSort(key) {
    let players = this.state.players;
    if (key === "games") {
      players.sort((a, b) => a[key] < b[key] ? 1 : -1);
    } else if (key === "accuracy") {
      players.sort((a, b) => (a.goals / a.shots) < (b.goals / b.shots) ? 1 : -1);
    } else {
      players.sort((a, b) => (a[key] / a.games) < (b[key] / b.games) ? 1 : -1);
    }
    this.setState({ players: players });
  }

  perGame(player, stat) {
    return Math.round((player[stat] / player.games) * 100) / 100;
  }

  renderPlayers(item, i) {
    return (
      <div key={i} className="player-card">
        <div className="inner-card">
          <div className="stat-row">
            <div className="stat-col">
              <div className="avatar-container">
                <img src={item.avatar} className="avatar" />
              </div>
              <div>{item.name}</div>
            </div>
            <div className="stat-col">
              <div>goals: {item.goals} ({this.perGame(item, 'goals')})</div>
              <div>shots: {item.shots} ({this.perGame(item, 'shots')})</div>
              <div>accuracy: {Math.round((item.goals / item.shots) * 100) / 100}</div>
            </div>
            <div className="stat-col">
              <div>saves: {item.saves} ({this.perGame(item, 'saves')})</div>
              <div>assists: {item.assists} ({this.perGame(item, 'assists')})</div>
            </div>
            <div className="stat-col">
              <div>wins: {item.wins} ({this.perGame(item, 'wins')})</div>
              <div>mvps: {item.mvps} ({this.perGame(item, 'mvps')})</div>
            </div>
            <div className="stat-col">
              <div>score: {item.score} ({this.perGame(item, 'score')})</div>
              <div>games: {item.games}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    if (!Object.keys(this.props.players).length) {
      return (
        <div>
          <div>Loading...</div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="card-container">
            <div>
              <button onClick={() => this.playerSort("games")}>games</button>
              <button onClick={() => this.playerSort("score")}>score</button>
              <button onClick={() => this.playerSort("assists")}>assists</button>
              <button onClick={() => this.playerSort("saves")}>saves</button>
              <button onClick={() => this.playerSort("shots")}>shots</button>
              <button onClick={() => this.playerSort("wins")}>wins</button>
              <button onClick={() => this.playerSort("mvps")}>mvps</button>
              <button onClick={() => this.playerSort("accuracy")}>accuracy</button>
            </div>
            {
              Object.keys(this.state.players).map((player, i) => {
                return (
                  this.renderPlayers(this.state.players[player], i)
                )
              }, this)
            }
          </div>
        </div>
      )
    }
  }
}

export { PlayerList };
