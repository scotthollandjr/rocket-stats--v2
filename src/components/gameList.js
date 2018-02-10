import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../actions/gameActions';
import PropTypes from 'prop-types';
import React from 'react';

class gameList extends React.Component {
  componentWillMount() {
    this.props.gameActions.fetchGames();
  }

  renderData(item) {
    return <div key={item.id}>{item.title}</div>;
  }

  render() {
    if (!this.props.games) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      return (
        <div>
          {
            this.props.games.map((item, index) => {
              return (
                this.renderData(item)
              );
            })
          }
        </div>
      )
    }
  }
}

gameList.propTypes = {
  gameActions: PropTypes.object,
  games: PropTypes.array
};

function mapStateToProps(state) {
  return {
    games: state.games
  };
}

function mapDispactToProps(dispatch) {
  return {
    gameActions: bindActionCreators(gameActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispactToProps
)(gameList);
