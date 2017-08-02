// @flow

export const logInUser = (user: User): Action => ({
  type: 'LOGIN_USER',
  user
});
