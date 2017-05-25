import { combineReducers } from 'redux';
import errors from './errors';
import cards from './cards';

const reducers = combineReducers({
  errors,
  cards
});

export default reducers;
