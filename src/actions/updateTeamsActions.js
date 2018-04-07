import * as actionTypes from './actionTypes';
import database from '../database';

export function updateTeams(team_1, team_2) {
  return dispatch => {
    dispatch(updateTeamsRequestedAction());
    const teams = [team_1, team_2]
    // LOOP THROUGH TEAMS
    for (let t in teams) {
      console.log(teams)
      const teamUpdate = teams[t];
      const teamRef = database.ref('/teams/' + teamUpdate.id);

      const players = [teamUpdate.player_1, teamUpdate.player_2]

// let wins = 0;
// wins = snapshot.child("wins").val();
// wins: wins + (playerUpdate.win ? 1 : 0)

      console.log("teamRef", t, teamRef)


      teamRef.once("value").then(function(snapshot) {
        // console.log("snapshot", snapshot.child("players").val())

        for (let p in players) {

          let playerUpdate = players[p];
          let dbPlayer = snapshot.child("players").child(playerUpdate.id).val();

          // SET BLANK STAT PLACEHOLDERS
          let assists = 0;
          let goals = 0;
          let mvps = 0;
          let saves = 0;
          let score = 0;
          let shots = 0;

          // GET CURRENT STATS FROM DB
          console.log("snapshot", p, snapshot)
          console.log("playerUpdate", p, playerUpdate)
          console.log("dbPlayer", p, dbPlayer)
          assists = dbPlayer.assists;
          goals = dbPlayer.goals;
          mvps = dbPlayer.mvps;
          saves = dbPlayer.saves;
          score = dbPlayer.score;
          shots = dbPlayer.shots;

          // ADD CURRENT STATS TO NEW STATS
          assists = assists + playerUpdate.assists;
          goals = goals + playerUpdate.goals;
          mvps = mvps + (playerUpdate.mvp ? 1 : 0);
          saves = saves + playerUpdate.saves;
          score = score + playerUpdate.score;
          shots = shots + playerUpdate.shots;
        }
      }).then(() => {
        teamRef.update({
          "players/0": teamUpdate.player_1,
          "players/1": teamUpdate.player_2
        })
      });
    }
    // .then(() => {
    //   dispatch(updateTeamsRequestedAction({players}));
    // }) 
    // .catch((error) => {
    //   dispatch(updateTeamsRequestedAction());
    // })
  }
}

function updateTeamsRequestedAction() {
  return {
    type: actionTypes.ADD_GAME_REQUESTED
  };
}

// function updateTeamsRejectedAction() {
//   return {
//     type: actionTypes.ADD_GAME_REJECTED
//   }
// }

// function updateTeamsFulfilledAction(game) {
//   return {
//     type: actionTypes.ADD_GAME_FULFILLED,
//     game
//   };
// }