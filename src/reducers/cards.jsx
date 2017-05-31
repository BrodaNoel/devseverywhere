import utils from 'utils';

const calculateNewMetrics = card => {
  // The state.card.metric object should be re-calculated from zero, again, each time
  // we receive new data, due to the Rates values
  let data = Object.assign({}, utils.defaultMetrics);

  card.tweets.forEach(tweet => {
    let hour = new Date(tweet.created_at).getUTCHours();
    data.hours[hour]++;

    if (+tweet.favorite_count < 10) {
      data.favorites[+tweet.favorite_count]++;
    }

    if (+tweet.retweet_count < 10) {
      data.retweets[+tweet.retweet_count]++;
    }

    if (tweet.user.verified) {
      data.users.verified++;
    }

    if (tweet.coordinates || tweet.place) {
      data.tweetsWithGeo.push(tweet);
      data.map.points.push(
        utils.getMapPoint(tweet.place.bounding_box.coordinates[0])
      );
    }
  });

  // Calculate rates
  data.users.verifiedRate = utils.truncate(data.users.verified / card.tweets.length * 100, 2);
  data.tweetsWithGeoRate = utils.truncate(data.tweetsWithGeo.length / card.tweets.length * 100, 2);

  data.tweetsCount = card.tweets.length;

  data.showMap = data.map.points.length > 0;
  return data;
};

const cards = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CARDS':
      return [
        ...state,
        ...action.cards
      ];

    case 'ADD_TWEETS_TO_CARD':
      return state.map(card => {
        if (card.data.name === action.card.data.name) {
          return {
            ...card,
            tweets: [...card.tweets, ...action.tweets]
          };
        }

        return card;
      });

    case 'SET_DONE_TO_CARD':
      return state.map(card => {
        if (card.data.name === action.card.data.name) {
          return {
            ...card,
            isDone: true
          };
        }

        return card;
      });

    case 'SET_NEXT_MAX_TO_CARD':
      return state.map(card => {
        if (card.data.name === action.card.data.name) {
          return {
            ...card,
            nextMax: action.nextMax
          };
        }

        return card;
      });

    case 'CHANGE_SELECTED_CARD':
      return state.map(card => {
        return {
          ...card,
          isSelected: card.data.name === action.card.data.name
        };
      });

    case 'GET_NEW_METRICS':
      return state.map(card => {
        if (card.data.name === action.card.data.name) {
          return {
            ...card,
            metrics: calculateNewMetrics(card)
          };
        }

        return card;
      });

    default:
      return state;
  }
};

export default cards;
