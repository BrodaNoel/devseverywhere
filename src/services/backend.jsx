var num = require('big-integer');

const config = {
  twitter: {
    count: 100
  }
};

let isDone = false;
let nextMax = null;

// Private functions
const _ = {
  searchTweets(q) {
    return new Promise((done, fail) => {
      let tweets = [];
      let params = {
        q,
        max: nextMax,
        count: config.twitter.count
      };

      if (isDone) {
        done({
          tweets,
          isDone
        });
        return;
      }

      _.getTweetsFromBackend(q, params).then(twitterResponse => {
        tweets = twitterResponse.tweets.statuses;

        isDone = twitterResponse.isDone;
        nextMax = num(twitterResponse.metadata.min).subtract(1);

        done({
          tweets,
          isDone
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
  getTweets: _.searchTweets
};
