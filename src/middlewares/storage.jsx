import utils from 'utils';

const saveWhenActionIs = [
  'LOGIN_USER',
  'CHANGE_SELECTED_CARD',
  'ADD_TWEETS_TO_CARD',
  'SET_DONE_TO_CARD'
];

// When the action is one of x (check saveWhenActionIs array), save the state in loca storage
const storage = store => next => action => {
  let result;

  try {
    result = next(action);

    if (saveWhenActionIs.indexOf(action.type) !== -1) {
      utils.storage.local.save('state', store.getState());

      const storeGeneratedAt = utils.storage.local.get('storeGeneratedAt');
      if (storeGeneratedAt === null) {
        const now = new Date();
        utils.storage.local.save('storeGeneratedAt', now.getTime());
      }
    }
  } catch (e) {
    // :shrug

  } finally {
    return result;
  }
}

export default storage;
