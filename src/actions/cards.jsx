import api from 'api';
import notification from 'antd/lib/notification';

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
    api.getTweets(
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
      const data = response.response.data;
      let error = 'WTF? Absolutely unknown error. But, in my computer is working 🤷';

      if (data && data.error) {
        if (data.error.code === 'auth/argument-error') {
          error = 'Sorry, you have to login again';
          history.push(`/request-access/${tech}`);

        } else if (typeof data.error.message !== 'undefined') {
          error = `Unexpected error: ${data.error.message}`;

        } else if (typeof data.error.body !== 'undefined') {
          error = `Backend error: ${data.error.body}`;
        }
      }

      notification.error({
        message: 'Error while looking for tweets',
        description: error
      });
    });
  }
};
