const errors = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ERRORS':
      return [
        ...state,
        ...action.errors
      ];
    default:
      return state;
  }
};

export default errors;
