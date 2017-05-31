import { backend } from 'services';
import * as errorActions from './errors';

export const addCards = cards => ({
  type: 'ADD_CARDS',
  cards
});

export const addTweetsToCard = (card, tweets) => dispatch => {
  dispatch({
    type: 'ADD_TWEETS_TO_CARD',
    card,
    tweets
  });

  dispatch({
    type: 'GET_NEW_METRICS',
    card
  });
};

export const setDoneToCard = card => ({
  type: 'SET_DONE_TO_CARD',
  card
});

export const setNextMaxToCard = (card, nextMax) => ({
  type: 'SET_NEXT_MAX_TO_CARD',
  card,
  nextMax
});

export const changeSelectedCard = cardName => (dispatch, getState) => {
  const card = getState().cards.find(card => card.data.name === cardName);

  dispatch({
    type: 'CHANGE_SELECTED_CARD',
    card
  });
};

export const getMoreTweets = (cardName, user, history, tech) => (dispatch, getState) => {
  const card = getState().cards.find(card => card.data.name === cardName);

  if (!card.isDone) {
    backend.getTweets(
      card,
      {
        key: user.credentials.accessToken,
        secret: user.credentials.secret
      },
      user.firebaseToken
    ).then(data => {
      // TODO: This `dispatch` could be improved.
      dispatch(
        addTweetsToCard(card, data.tweets)
      );

      dispatch(
        setNextMaxToCard(card, data.nextMax)
      );

      if (data.isDone) {
        dispatch(
          setDoneToCard(card)
        );
      }

    }).catch(response => {
      let error;

      if (response.error.code === 'auth/argument-error') {
        error = 'Sorry, you have to login again';
        history.push(`/request-access/${tech}`);

      } else if (typeof response.error.message !== 'undefined') {
        error = `Unexpected error: ${response.error.message}`;

      } else if (typeof response.error.body !== 'undefined') {
        error = `Backend error: ${response.error.body}`;

      } else {
        error = 'WTF? Absolutely unknown error. But, in my computer is working 🤷';
      }

      dispatch(
        errorActions.addError(error)
      );
    });
  }
};
