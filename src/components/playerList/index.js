import React from 'react';
import './styles.scss';

class PlayerList extends React.Component {

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
            {
              Object.keys(this.props.players).map((player, i) => {
                return (
                  this.renderPlayers(this.props.players[player], i)
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
