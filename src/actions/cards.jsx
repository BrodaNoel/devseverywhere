export const addCards = (cards) => ({
  type: 'ADD_CARDS',
  cards
});

export const addTweetsToCard = (card, tweets) => ({
  type: 'ADD_TWEETS_TO_CARD',
  card,
  tweets
});

export const setDoneToCard = (card, isDone) => ({
  type: 'SET_DONE_TO_CARD',
  card,
  isDone
});
