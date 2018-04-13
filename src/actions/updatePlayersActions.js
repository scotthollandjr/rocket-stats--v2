import * as actionTypes from './actionTypes';
import database from '../database';

export function updatePlayers(players) {
  return dispatch => {
    dispatch(updatePlayersRequestedAction());

    // LOOP THROUGH PLAYERS
    for (let i in players) {
      const playerUpdate = players[i];
      const playerRef = database.ref('/players/' + playerUpdate.id);

      // SET BLANK STAT PLACEHOLDERS
      let assists = 0;
      let games = 0;
      let goals = 0;
      let mvps = 0;
      let saves = 0;
      let score = 0;
      let shots = 0;
      let wins = 0;

      // GET CURRENT STATS FROM DB
      playerRef.once("value").then(function(snapshot) {
        assists = parseInt(snapshot.child("assists").val());
        games = parseInt(snapshot.child("games").val());
        goals = parseInt(snapshot.child("goals").val());
        mvps = parseInt(snapshot.child("mvps").val());
        saves = parseInt(snapshot.child("saves").val());
        score = parseInt(snapshot.child("score").val());
        shots = parseInt(snapshot.child("shots").val());
        wins = parseInt(snapshot.child("wins").val());
      }).then(function() {
        // ADD CURRENT STATS TO NEW STATS
        playerRef.update({
          assists: assists + playerUpdate.assists,
          games: games + 1,
          goals: goals + playerUpdate.goals,
          mvps: mvps + (playerUpdate.mvp ? 1 : 0),
          saves: saves + playerUpdate.saves,
          score: score + playerUpdate.score,
          shots: shots + playerUpdate.shots,
          wins: wins + (playerUpdate.win ? 1 : 0)
        })
      })
    }
    // .then(() => {
    //   dispatch(updatePlayersRequestedAction({players}));
    // }) 
    // .catch((error) => {
    //   dispatch(updatePlayersRequestedAction());
    // })
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