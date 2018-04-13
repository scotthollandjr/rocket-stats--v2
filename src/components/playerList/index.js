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
    this.setState({ players: this.props.players }, function() {
      this.playerSort("score");
    });
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

  calcOverall(player) {
    let overall = 0;
    overall = 
      (player.goals * 1) +
      (player.assists * .75) +
      (player.saves * .6) +
      (player.shots * .4) +
      ((player.goals/player.shots) * .5);
    overall = overall * (1/player.games)
    return Math.round(overall * 100) / 100
  }

  renderPlayers(item, i) {
    return (
      <div key={i} className="player-row">
        <div className="avatar-container">
          {/*<div>{item.name}</div>*/}
          <img src={item.avatar} className="avatar" />
        </div>
        <div className="stat-rows">
          <div className="stat-row">
            <div className="stat-cell">
              <span>{item.goals}</span>
            </div>
            <div className="stat-cell">
              <span>{item.shots}</span>
            </div>
            <div className="stat-cell">
              <span>{Math.round((item.goals / item.shots) * 100) / 100}</span>
            </div>
            <div className="stat-cell">
              <span>{item.saves}</span>
            </div>
            <div className="stat-cell">
              <span>{item.assists}</span>
            </div>
            <div className="stat-cell">
              <span>{item.wins}</span>
            </div>
            <div className="stat-cell">
              <span>{item.mvps}</span>
            </div>
            <div className="stat-cell">
              <span>{item.score}</span>
            </div>
            {/*<div>{item.games}</div>*/}
          </div>
          <div className="stat-row">
            <div className="stat-cell fade">
              <span>{this.perGame(item, 'goals')}</span>
            </div>
            <div className="stat-cell fade">
              <span>{this.perGame(item, 'shots')}</span>
            </div>
            <div className="stat-cell fade">
              <span>{Math.round((item.goals / item.shots) * 100) / 100}</span>
            </div>
            <div className="stat-cell fade">
              <span>{this.perGame(item, 'saves')}</span>
            </div>
            <div className="stat-cell fade">
              <span>{this.perGame(item, 'assists')}</span>
            </div>
            <div className="stat-cell fade">
              <span>{this.perGame(item, 'wins')}</span>
            </div>
            <div className="stat-cell fade">
              <span>{this.perGame(item, 'mvps')}</span>
            </div>
            <div className="stat-cell fade">
              <span>{this.perGame(item, 'score')}</span>
            </div>
            {/*<div>{item.games}</div>*/}
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
          <div className="sort-buttons">
            <a href="#" className="sort-button" onClick={() => this.playerSort("goals")}>goals</a>
            <a href="#" className="sort-button" onClick={() => this.playerSort("shots")}>shots</a>
            <a href="#" className="sort-button" onClick={() => this.playerSort("accuracy")}>accuracy</a>
            <a href="#" className="sort-button" onClick={() => this.playerSort("saves")}>saves</a>
            <a href="#" className="sort-button" onClick={() => this.playerSort("assists")}>assists</a>
            <a href="#" className="sort-button" onClick={() => this.playerSort("wins")}>wins</a>
            <a href="#" className="sort-button" onClick={() => this.playerSort("mvps")}>mvps</a>
            <a href="#" className="sort-button" onClick={() => this.playerSort("score")}>score</a>
          </div>
          <div className="card-container">
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
