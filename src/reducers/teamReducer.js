import initialState from './initialState';
import {
  GET_TEAMS_FULFILLED,
  GET_TEAMS_REJECTED,
  GET_TEAMS_REQUESTED,
} from '../actions/actionTypes';

export default function teams(state = initialState.teams, action) {
  let newState;
  switch (action.type) {
    case GET_TEAMS_REJECTED:
      return state;
    case GET_TEAMS_REQUESTED:
      return state;
    case GET_TEAMS_FULFILLED:
      newState = action.teams;
      return newState;
    default:
      return state;
  }
}
