import * as actionTypes from './actionTypes';
import database from '../database';

function fetchTeamsRequestedAction() {
  return {
    type: actionTypes.GET_TEAMS_REQUESTED
  };
}

function fetchTeamsRejectedAction() {
  return {
    type: actionTypes.GET_TEAMS_REJECTED
  }
}

function fetchTeamsFulfilledAction(teams) {
  return {
    type: actionTypes.GET_TEAMS_FULFILLED,
    teams
  };
}

export function fetchTeams() {
  return dispatch => {
    dispatch(fetchTeamsRequestedAction());
    return database.ref('/teams').once('value', snap => {
      const teams = snap.val();
      dispatch(fetchTeamsFulfilledAction(teams))
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchTeamsRejectedAction());
    })
  }
}
