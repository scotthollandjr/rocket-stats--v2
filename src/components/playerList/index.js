import React from 'react';
import './styles.scss';

class PlayerList extends React.Component {

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
              <div>goals: {item.goals}</div>
              <div>shots: {item.shots}</div>
            </div>
            <div className="stat-col">
              <div>saves: {item.saves}</div>
              <div>assists: {item.assists}</div>
            </div>
            <div className="stat-col">
              <div>wins: {item.wins}</div>
              <div>mvps: {item.mvps}</div>
            </div>
            <div className="stat-col">
              <div>score: {item.score}</div>
              <div>overall: 100</div>
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
