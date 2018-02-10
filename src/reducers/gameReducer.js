import initialState from './initialState';
import {FETCH_GAMES, RECEIVE_GAMES} from '../actions/allActions';

export default function games(state = initialState.games, action) {
  let newState;
  switch (action.type) {
    case FETCH_GAMES:
      console.log('FETCH_GAMES Action')
      return action;
    case RECEIVE_GAMES:
      newState = action.games;
      console.log('RECEIVE_GAMES Action')
      return newState;
    default:
      return state;
  }
}
