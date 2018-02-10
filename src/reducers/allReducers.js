import {combineReducers} from 'redux';
import games from './gameReducer';
import players from './playerReducer';
import teams from './teamReducer';

const rootReducer = combineReducers({
  games,
  players,
  teams
});

export default rootReducer;
