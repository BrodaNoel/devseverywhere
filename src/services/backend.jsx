var num = require('big-integer');

const config = {
  twitter: {
    count: 100,
    maxRequests: 30
  }
};

var requestsDone = 1;

// Private functions
const _ = {
  getTweets(q) {
    return new Promise(function(done, fail) {
      _.searchTweets(q, null, null, 0, [], done, fail);
    });
  },

  searchTweets(q, firstMax, max, min, posts, globalDone, globalFail) {
    var params = {
      max: max === null ? null : num(max).subtract(1),
      min: min,
      count: config.twitter.count
    };

    _.getTweetsFromBackend(q, params).then(function(twitterResponse) {
      var tweets = twitterResponse.tweets.statuses;

      if (tweets) {
        tweets.forEach(function(tweet) {
          posts.push({
            id_source: 1, // Twitter
            user: {
              id: tweet.user.id_str,
              location: tweet.user.location
            },
            place: tweet.place,
            source_id: tweet.id_str,
            text: tweet.text,
            coordinates: tweet.coordinates
          });
        });

        if (firstMax === null) {
          firstMax = twitterResponse.metadata.max;
        }

        if (twitterResponse.isDone || requestsDone === config.twitter.maxRequests) {
          globalDone({
            tweets: posts,
            newMin: firstMax
          });
        } else {
          requestsDone++;
          _.searchTweets(
            q,
            firstMax,
            twitterResponse.metadata.min, // max
            min,
            posts,
            globalDone,
            globalFail
          );
        }

      } else {
        globalDone({
          tweets: posts,
          newMin: firstMax
        });
      }

    }).catch(function(error) {
      globalFail(error);
    });
  },

  getTweetsFromBackend(q, params) {
    var url = 'https://us-central1-devseverywhere-1494347271845.cloudfunctions.net/getTweets';
    url += `?q=${encodeURIComponent(q)}&min=${params.min}&max=${params.max}&count=${params.count}`;

    return fetch(url, {
      method: 'GET'
    }).then(r => r.json())
  }
};

// Exposing
export const backend = {
  getTweets: _.getTweets
};
