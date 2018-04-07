import React from 'react';
import './styles.scss';

class TeamList extends React.Component {

  renderTeams(item, i) {
    return (
      <div key={i} className="team-card">
        <div className="inner-card">
          <div>{item.name} ({this.props.players[item.players[0].id].name}, {this.props.players[item.players[1].id].name})</div>
          <div>wins: {item.wins | 0}</div>
          <div>{item.players[0].name}: {item.players[0].score | 0}</div>
          <div>{item.players[1].name}: {item.players[1].score | 0}</div>
        </div>
      </div>
    )
  }

  render() {
    if (!Object.keys(this.props.players).length || !Object.keys(this.props.teams).length) {
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
            Object.keys(this.props.teams).map((team, i) => {
              return (
                this.renderTeams(this.props.teams[team], i)
              )
            }, this)
          }
          </div>
        </div>
      )
    }
  }
}

export { TeamList };
