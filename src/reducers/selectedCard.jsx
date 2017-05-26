// { name, isDone }
const selectedCard = (state = null, action) => {
  switch (action.type) {
    case 'CHANGE_SELECTED_CARD':
      return Object.assign({}, action.card);
    default:
      return state;
  }
};

export default selectedCard;
