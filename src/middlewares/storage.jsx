import * as utils from 'utils';

const saveWhenActionIs = [
  'LOGIN_USER'
];

// When the action is one of x (check saveWhenActionIs array), save the state in loca storage
export const storage = store => next => action => {
  let result;

  try {
    result = next(action);

    if (saveWhenActionIs.indexOf(action.type) !== -1) {
      utils.storage.local.save('state', store.getState());
    }
  } catch (e) {
    // :shrug

  } finally {
    return result;
  }
}
