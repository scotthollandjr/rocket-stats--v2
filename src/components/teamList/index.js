import React from 'react';

class TeamList extends React.Component {

  renderTeams(item, i) {
    return <div key={i}>
            <p>{item.name} ({this.props.players[item.players[0]].name}, {this.props.players[item.players[1]].name})</p>
           </div>;
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
          <div>
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
