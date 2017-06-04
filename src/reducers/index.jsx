import { combineReducers } from 'redux';
import cards from './cards';
import user from './user';

const reducers = combineReducers({
  cards,
  user
});

export default reducers;
