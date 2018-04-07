import React from 'react';
import '../gameForm/styles.scss';

class GameList extends React.Component {

  renderGames(game, i) {
    return (
      <div key={i} className="game-container">
        <div className="player-rows">
          <div className="team-name blue">
            {this.props.teams[game.team_1.id].name}
          </div>
          <div className="player-row blue">
            <div className="photo-square"></div>
            <div className="select-square">
              {this.props.players[game.team_1.player_1.id].name}
            </div>
            <div className="mvp-square">
              <div className="mvp-icon"></div>
            </div>
            <div className="input-square">
              <div className="label">score</div>
              {game.team_1.player_1.score | 0}
            </div>
            <div className="input-square">
              <div className="label">goals</div>
              {game.team_1.player_1.goals | 0}
            </div>
            <div className="input-square">
              <div className="label">assists</div>
              {game.team_1.player_1.assists | 0}
            </div>
            <div className="input-square">
              <div className="label">saves</div>
              {game.team_1.player_1.saves | 0}
            </div>
            <div className="input-square">
              <div className="label">shots</div>
              {game.team_1.player_1.shots | 0}
            </div>
            <div className="empty-square"></div>
          </div>
          <div className="player-row blue">
            <div className="photo-square"></div>
            <div className="select-square">
              {this.props.players[game.team_1.player_2.id].name}
            </div>
            <div className="mvp-square"></div>
            <div className="input-square">
              {game.team_1.player_2.score | 0}
            </div>
            <div className="input-square">
              {game.team_1.player_2.goals | 0}
            </div>
            <div className="input-square">
              {game.team_1.player_2.assists | 0}
            </div>
            <div className="input-square">
              {game.team_1.player_2.saves | 0}
            </div>
            <div className="input-square">
              {game.team_1.player_2.shots | 0}
            </div>
            <div className="empty-square"></div>
          </div>
        </div>
        <div className="player-rows">
          <div className="team-name orange">
            {this.props.teams[game.team_2.id].name}
          </div>
          <div className="player-row orange">
            <div className="photo-square"></div>
            <div className="select-square">
              {this.props.players[game.team_2.player_1.id].name}
            </div>
            <div className="mvp-square"></div>
            <div className="input-square">
              <div className="label">score</div>
              {game.team_2.player_1.score | 0}
            </div>
            <div className="input-square">
              <div className="label">goals</div>
              {game.team_2.player_1.goals | 0}
            </div>
            <div className="input-square">
              <div className="label">assists</div>
              {game.team_2.player_1.assists | 0}
            </div>
            <div className="input-square">
              <div className="label">saves</div>
              {game.team_2.player_1.saves | 0}
            </div>
            <div className="input-square">
              <div className="label">shots</div>
              {game.team_2.player_1.shots | 0}
            </div>
            <div className="empty-square"></div>
          </div>
          <div className="player-row orange">
            <div className="photo-square"></div>
            <div className="select-square">
              {this.props.players[game.team_2.player_2.id].name}
            </div>
            <div className="mvp-square"></div>
            <div className="input-square">
              {game.team_2.player_2.score | 0}
            </div>
            <div className="input-square">
              {game.team_2.player_2.goals | 0}
            </div>
            <div className="input-square">
              {game.team_2.player_2.assists | 0}
            </div>
            <div className="input-square">
              {game.team_2.player_2.saves | 0}
            </div>
            <div className="input-square">
              {game.team_2.player_2.shots | 0}
            </div>
            <div className="empty-square"></div>
          </div>
        </div>
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
          <div>
          {
            Object.keys(this.props.games).reverse().map((game, i) => {
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

export { GameList };
