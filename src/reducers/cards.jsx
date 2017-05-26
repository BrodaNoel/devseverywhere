const cards = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CARDS':
      return [
        ...state,
        ...action.cards
      ];

    case 'ADD_TWEETS_TO_CARD':
      return state.map((card) => {
        if (card.name === action.card.name) {
          return Object.assign(
            {},
            card,
            { tweets: [...card.tweets, ...action.tweets] }
          );
        }

        return card;
      });

    case 'SET_DONE_TO_CARD':
      return state.map((card) => {
        if (card.name === action.card.name) {
          return Object.assign(
            {},
            card,
            { isDone: action.isDone }
          );
        }

        return card;
      });
    default:
      return state;
  }
};

export default cards;
