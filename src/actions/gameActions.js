import * as actionTypes from './actionTypes';
import database from '../database';

function fetchGamesRequestedAction() {
  return {
    type: actionTypes.GET_GAMES_REQUESTED
  };
}

function fetchGamesRejectedAction() {
  return {
    type: actionTypes.GET_GAMES_REJECTED
  }
}

function fetchGamesFulfilledAction(games) {
  return {
    type: actionTypes.GET_GAMES_FULFILLED,
    games
  };
}

export function fetchGames() {
  return dispatch => {
    dispatch(fetchGamesRequestedAction());
    return database.ref('/games').once('value', snap => {
      const games = snap.val();
      dispatch(fetchGamesFulfilledAction(games))
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchGamesRejectedAction());
    })
  }
}
