import { config } from 'config';
var num = require('big-integer');

// Private functions
const _ = {
  getTweets(card, credentials, token) {
    return new Promise((done, fail) => {
      let q = card.hashtags.join(' OR ');
      let tweets = [];
      let params = {
        q,
        max: card.nextMax,
        count: 100
      };
      let headers = {
        Authorization: 'Bearer ' + token
      };

      _.getTweetsFromBackend(q, params, credentials, headers).then(response => {
        tweets = response.tweets.statuses;
        card.nextMax = num(response.metadata.min).subtract(1);

        done({
          tweets,
          isDone: response.isDone
        });
      }).catch(fail);
    });
  },

  getTweetsFromBackend(q, params, post, headers) {
    let url = config.backend.endpoints.getTweets.url;
    url += `?q=${encodeURIComponent(q)}&max=${params.max}&count=${params.count}`;

    return fetch(url, {
      headers,
      method: config.backend.endpoints.getTweets.method,
      body: JSON.stringify(post)
    }).then(r => r.json())
  }
};

// Exposing
export const backend = {
  getTweets: _.getTweets
};
