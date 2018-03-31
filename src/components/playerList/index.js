import React from 'react';
import './styles.scss';

class PlayerList extends React.Component {

  renderPlayers(item, i) {
    return (
      <div key={i} className="player-card">
        <div className="inner-card">
          <div className="stat-row">
            <div>
              <div>{item.name}</div>
              <div>assists: {item.assists}</div>
              <div>goals: {item.goals}</div>
              <div>mvps: {item.mvps}</div>
            </div>
            <div>
              <div>saves: {item.saves}</div>
              <div>score: {item.score}</div>
              <div>shots: {item.shots}</div>
              <div>wins: {item.wins}</div>
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
