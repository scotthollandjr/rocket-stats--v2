import * as actionTypes from './actionTypes';
import database from '../database';

export function addGame(game) {
  return dispatch => {
    dispatch(addGameRequestedAction());
    const gamesRef = database.ref('/games');
    gamesRef.push({
      team_1: game.team_1,
      team_2: game.team_2,
    })
    .then(() => {
      dispatch(addGameRequestedAction({game}));
    })
    .catch((error) => {
      dispatch(addGameRequestedAction());
    })
  }
}

function addGameRequestedAction() {
  return {
    type: actionTypes.ADD_GAME_REQUESTED
  };
}

// function addGameRejectedAction() {
//   return {
//     type: actionTypes.ADD_GAME_REJECTED
//   }
// }

// function addGameFulfilledAction(game) {
//   return {
//     type: actionTypes.ADD_GAME_FULFILLED,
//     game
//   };
// }
