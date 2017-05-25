const defaultUser = { isLogged: false };

const user = (state = defaultUser, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return Object.assign({}, state, { isLogged: true });
    default:
      return state;
  }
};

export default user;
