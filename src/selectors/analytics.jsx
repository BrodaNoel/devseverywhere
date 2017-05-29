// All this file is deprecated, but not removed just to leave here kind of documentation
// in case of need to implement selectors

import { utils } from 'utils';
import { createSelector } from 'reselect'

const defaultAnalytics = {
  hours: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  favorites: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  retweets: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  users: {
    verified: 0,
    verifiedRate: 0
  },
  tweetsWithGeoRate: 0,
  tweetsWithGeo: [],
  tweetsCount: 0,
  map: {
    points: []
  },
  showMap: false
};

const getCards = (state) => state.cards;
const getSelectedCard = (state) => state.selectedCard;

const analyticsProcessor = (cards, selectedCard) => {
  // The state.analytics object should be re-calculated from zero, again, each time
  // we receive new data, due to the Rates values
  let data = Object.assign({}, defaultAnalytics);
  const card = cards.find(card => card.name === selectedCard.name);

  card.tweets.forEach((tweet) => {
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

export const analytics = createSelector(
  [ getCards, getSelectedCard ],
  analyticsProcessor
);

export default analytics;
