import * as actionTypes from './actionTypes';
import database from '../database';

export function updatePlayers(players) {
  return dispatch => {
    dispatch(updatePlayersRequestedAction());
    console.log("players", players)
    const savesRef = database.ref('/players/2/saves');
    savesRef.transaction(function(currentSaves) {
      return currentSaves + 1;
    })
    .then(() => {
      dispatch(updatePlayersRequestedAction({players}));
    })
    .catch((error) => {
      dispatch(updatePlayersRequestedAction());
    })
  }
}

function updatePlayersRequestedAction() {
  return {
    type: actionTypes.ADD_GAME_REQUESTED
  };
}

// function updatePlayersRejectedAction() {
//   return {
//     type: actionTypes.ADD_GAME_REJECTED
//   }
// }

// function updatePlayersFulfilledAction(game) {
//   return {
//     type: actionTypes.ADD_GAME_FULFILLED,
//     game
//   };
// }