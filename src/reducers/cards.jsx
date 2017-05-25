const cards = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CARDS':
      return [
        ...state,
        ...action.cards
      ];
    default:
      return state;
  }
};

export default cards;
