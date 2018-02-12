import React from 'react';

class PlayerList extends React.Component {

  renderPlayers(item, i) {
    return <div key={i}>
            <p>{item.name}</p>
           </div>;
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
          <div>
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
