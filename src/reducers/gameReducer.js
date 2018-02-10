import initialState from './initialState';
import {
  GET_GAMES_FULFILLED,
  GET_GAMES_REJECTED,
  GET_GAMES_REQUESTED,
} from '../actions/actionTypes';

export default function games(state = initialState.games, action) {
  let newState;
  switch (action.type) {
    case GET_GAMES_REJECTED:
      return state;
    case GET_GAMES_REQUESTED:
      return state;
    case GET_GAMES_FULFILLED:
      newState = action.games;
      return newState;
    default:
      return state;
  }
}
