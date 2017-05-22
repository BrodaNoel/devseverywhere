import { config } from 'config';
import { utils } from 'utils';
var num = require('big-integer');

export const backend = {
  getTweets(card, credentials, token) {
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
    let url = config.backend.endpoints.getTweets.url;
    url += `?q=${encodeURIComponent(q)}&max=${params.max}&count=${params.count}`;

    return fetch(url, {
      headers,
      method: config.backend.endpoints.getTweets.method,
      body: JSON.stringify(credentials)
    }).then(utils.fetchResponseHandler)
      .then(response => {
        tweets = response.tweets.statuses;
        card.nextMax = num(response.metadata.min).subtract(1);

        return {
          tweets,
          isDone: response.isDone
        };
      });
  }
};
