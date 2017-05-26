import { combineReducers } from 'redux';
import errors from './errors';
import cards from './cards';
import user from './user';
import selectedCard from './selectedCard';

const reducers = combineReducers({
  errors,
  cards,
  user,
  selectedCard
});

export default reducers;
