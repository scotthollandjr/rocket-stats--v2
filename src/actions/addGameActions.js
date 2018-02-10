import * as actionTypes from './actionTypes';
import database from '../database';

export function addGame(game) {
  return dispatch => {
    dispatch(addGameRequestedAction());
    const gamesRef = database.ref('/games');
    console.log("game", game)
    gamesRef.push({
      game
    })
    .then(() => {
      dispatch(addGameRequestedAction({ game }));
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

function addGameRejectedAction() {
  return {
    type: actionTypes.ADD_GAME_REJECTED
  }
}

function addGameFulfilledAction(game) {
  return {
    type: actionTypes.ADD_GAME_FULFILLED,
    game
  };
}
