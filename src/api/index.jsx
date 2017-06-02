import axios from 'axios';
import config from 'config';
var num = require('big-integer');

const api = {
  getTweets(card, credentials, token) {
    const axiosConfig = {
      url: config.backend.endpoints.getTweets.url,
      params: {
        q: card.data.hashtags.join(' OR '),
        max: String(card.nextMax),
        count: 100
      },
      method: config.backend.endpoints.getTweets.method,
      headers: {
        Authorization: 'Bearer ' + token
      },
      data: credentials
    };

    return axios(axiosConfig)
      .then(response => {
        return {
          tweets: response.data.tweets.statuses,
          isDone: response.data.isDone,
          nextMax: num(response.data.metadata.min).subtract(1).toString()
        };
      });
  }
};

export default api;
