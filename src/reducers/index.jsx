import { combineReducers } from 'redux';
import errors from './errors';
import cards from './cards';
import user from './user';

const reducers = combineReducers({
  errors,
  cards,
  user
});

export default reducers;
