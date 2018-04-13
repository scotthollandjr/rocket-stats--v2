import React from 'react';
import './styles.scss';

class TeamList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      teams: []
    }
    this.teamSort = this.teamSort.bind(this)
  }

  componentWillMount() {
    this.setState({ teams: this.props.teams }, function() {
      this.teamSort("wins");
    });
  }

  teamSort(key) {
    let teams = this.state.teams;
    teams.sort((a, b) => (a[key] / a.games) < (b[key] / b.games) ? 1 : -1);
    this.setState({ teams: teams });
  }

  renderTeams(item, i) {
    return (
      item.games ? 
      <div key={i} className="team-card" >
        <div className="inner-card">
          <div>{item.name} ({this.props.players[item.players[0].id].name}, {this.props.players[item.players[1].id].name})</div>
          <div>wins: {item.wins | 0} ({Math.round((item.wins / item.games) * 100)}%)</div>
          <div>{this.props.players[item.players[0].id].name}: {item.players[0].score | 0}</div>
          <div>{this.props.players[item.players[1].id].name}: {item.players[1].score | 0}</div>
        </div>
      </div>
      : null
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
            Object.keys(this.state.teams).map((team, i) => {
              return (
                this.renderTeams(this.state.teams[team], i)
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
