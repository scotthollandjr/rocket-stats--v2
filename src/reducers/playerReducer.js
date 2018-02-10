import initialState from './initialState';
import {
  GET_PLAYERS_FULFILLED,
  GET_PLAYERS_REJECTED,
  GET_PLAYERS_REQUESTED,
} from '../actions/actionTypes';

export default function players(state = initialState.players, action) {
  let newState;
  switch (action.type) {
    case GET_PLAYERS_REJECTED:
      return state;
    case GET_PLAYERS_REQUESTED:
      return state;
    case GET_PLAYERS_FULFILLED:
      newState = action.players;
      return newState;
    default:
      return state;
  }
}
