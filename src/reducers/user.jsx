const defaultUser = { isLogged: false };

const user = (state = defaultUser, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      // If we don't want to lose the previous store.user data, we should
      // add `store` after `{}`, meaning: Object.assign({}, store, action.user, ...
      return Object.assign({}, action.user, { isLogged: true });
    default:
      return state;
  }
};

export default user;
