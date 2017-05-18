var num = require('big-integer');

// Private functions
const _ = {
  getTweets(card) {
    return new Promise((done, fail) => {
      let q = '#' + card.name;
      let tweets = [];
      let params = {
        q,
        max: card.nextMax,
        count: 100
      };

      _.getTweetsFromBackend(q, params).then(twitterResponse => {
        tweets = twitterResponse.tweets.statuses;
        card.nextMax = num(twitterResponse.metadata.min).subtract(1);

        done({
          tweets,
          isDone: twitterResponse.isDone
        });
      }).catch(fail);
    });
  },

  getTweetsFromBackend(q, params) {
    var url = 'https://us-central1-devseverywhere-1494347271845.cloudfunctions.net/getTweets';
    url += `?q=${encodeURIComponent(q)}&max=${params.max}&count=${params.count}`;

    return fetch(url, {
      method: 'GET'
    }).then(r => r.json())
  }
};

// Exposing
export const backend = {
  getTweets: _.getTweets
};
