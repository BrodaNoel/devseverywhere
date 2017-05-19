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

      _.getTweetsFromBackend(q, params, credentials, headers).then(twitterResponse => {
        tweets = twitterResponse.tweets.statuses;
        card.nextMax = num(twitterResponse.metadata.min).subtract(1);

        done({
          tweets,
          isDone: twitterResponse.isDone
        });
      }).catch(fail);
    });
  },

  getTweetsFromBackend(q, params, post, headers) {
    let url = 'https://us-central1-devseverywhere-1494347271845.cloudfunctions.net/api/getTweets';
    url += `?q=${encodeURIComponent(q)}&max=${params.max}&count=${params.count}`;

    return fetch(url, {
      headers,
      method: 'POST',
      body: JSON.stringify(post)
    }).then(r => r.json())
  }
};

// Exposing
export const backend = {
  getTweets: _.getTweets
};
