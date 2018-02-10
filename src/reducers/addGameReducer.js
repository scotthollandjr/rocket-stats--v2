import initialState from './initialState';
import {
  ADD_GAME_FULFILLED,
  ADD_GAME_REJECTED,
  ADD_GAME_REQUESTED,
} from '../actions/actionTypes';

export default function games(state = initialState.games, action) {
  let newState;
  switch (action.type) {
    case ActionTypes.ADD_GAME_FULFILLED: {
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Added guest.'
      });
      newState.games = newState.games || [];
      newState.games = newState.games.slice();
      newState.games.push(action.game);
      return newState;
    }
  }
}
