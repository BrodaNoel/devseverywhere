const addError = (error) => ({
  type: 'ADD_ERRORS',
  errors: [error]
});

export { addError };
