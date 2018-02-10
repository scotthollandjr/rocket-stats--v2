import * as actionTypes from './actionTypes';
import database from '../database';

function fetchPlayersRequestedAction() {
  return {
    type: actionTypes.GET_PLAYERS_REQUESTED
  };
}

function fetchPlayersRejectedAction() {
  return {
    type: actionTypes.GET_PLAYERS_REJECTED
  }
}

function fetchPlayersFulfilledAction(players) {
  return {
    type: actionTypes.GET_PLAYERS_FULFILLED,
    players
  };
}

export function fetchPlayers() {
  return dispatch => {
    dispatch(fetchPlayersRequestedAction());
    return database.ref('/players').once('value', snap => {
      const players = snap.val();
      dispatch(fetchPlayersFulfilledAction(players))
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchPlayersRejectedAction());
    })
  }
}
