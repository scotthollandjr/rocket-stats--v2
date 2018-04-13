import * as actionTypes from './actionTypes';
import database from '../database';

export function updateTeams(team_1, team_2) {
  return dispatch => {
    dispatch(updateTeamsRequestedAction());
    const teams = [team_1, team_2]
    // LOOP THROUGH TEAMS
    for (let t in teams) {
      const teamUpdate = teams[t];
      const teamRef = database.ref('/teams/' + teamUpdate.id);
      const playersRef = database.ref('/teams/' + teamUpdate.id + '/players/');

      const players = [teamUpdate.player_1, teamUpdate.player_2];

      playersRef.once("value", function(snapshot) {
        snapshot.forEach(function(playerSnapshot) {
          let dbPlayer = playerSnapshot.val();

          let playerUpdate = players.find(p => p.id === dbPlayer.id);

          // SET BLANK STAT PLACEHOLDERS
          let assists = 0;
          let goals = 0;
          let mvps = 0;
          let saves = 0;
          let score = 0;
          let shots = 0;

          // GET CURRENT STATS FROM DB
          assists = parseInt(dbPlayer.assists);
          goals = parseInt(dbPlayer.goals);
          mvps = parseInt(dbPlayer.mvps);
          saves = parseInt(dbPlayer.saves);
          score = parseInt(dbPlayer.score);
          shots = parseInt(dbPlayer.shots);

          // ADD CURRENT STATS TO NEW STATS
          assists = assists + playerUpdate.assists;
          goals = goals + playerUpdate.goals;
          mvps = mvps + (playerUpdate.mvp ? 1 : 0);
          saves = saves + playerUpdate.saves;
          score = score + playerUpdate.score;
          shots = shots + playerUpdate.shots;

          let updatedPlayerData = {};

          updatedPlayerData = {
            assists: assists,
            goals: goals,
            mvps: mvps,
            saves: saves,
            score: score,
            shots: shots,
          }

          playerSnapshot.ref.update(updatedPlayerData, function(error) {
            if (error) {
              console.log("Player update error", error);
            }
          });
        })
      });

      let wins = 0;
      let games = 0;

      // GET CURRENT TEAM STATS FROM DB
      teamRef.once("value").then(function(snapshot) {
        wins = snapshot.child("wins").val();
        games = snapshot.child("games").val();
      }).then(function() {
        // ADD TEAM STATS TO NEW STATS
        teamRef.update({
          wins: teamUpdate.win ? (wins + 1) : wins,
          games: games + 1
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