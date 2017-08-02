# DevsEverywhere

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f32cb1327d9449e9bdf0e91d67c7823c)](https://www.codacy.com/app/brodanoel/devseverywhere?utm_source=github.com&utm_medium=referral&utm_content=BrodaNoel/devseverywhere&utm_campaign=badger)
[![Travis-CI Badge](https://travis-ci.org/BrodaNoel/devseverywhere.svg?branch=master)](https://travis-ci.org/BrodaNoel/devseverywhere)

This is just... something for fun. You can test it in [devseverywhere.com](https://devseverywhere.com).

This project was created to understand better:
* ES6
* ReactJS
  * Routing _(more info [here](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom))_
  * Jest
* Redux
  * Reselect (including custom Memoize functions) _(more info [here](http://redux.js.org/docs/recipes/ComputingDerivedData.html) and [here](https://github.com/reactjs/reselect))_
  * Thunk _(more info [here](https://github.com/gaearon/redux-thunk))_
* Flow
  * Flow-Typed
* Axios
* Webpack
* Travis-CI
* GoogleMapsAPI
* TwitterAPI
* Firebase Functions
* Firebase Hosting
* Firebase Auth
* Victory Graphs
* and more.

If you need something, you know what you have to do.

# Collaborating
* Fork
* Clone
* Add `dev.devseverywhere.com` in your `host` file (pointing to 127.0.0.1)
* `nvm use` (or install the proper Node version shown in .nvmrc file)
* `npm run start`
* Happy coding!

> Note: You'll find more information in `EnvironmentDocumentation.md` file.

# Implementing

## The frontend
If you want to implement this site with your own configurations, cards, ApiKeys, etc, just edit the `src/config/index.jsx` file.
There you have most of the implementation configs.

## The backend
For each `getTweets` call, your backend should return this object.
Check the Express implementation to understand better how it works.
```js
{
  tweets, // Array of tweets
  isDone: <Boolean>, // if isDone is true, it's because there are no more tweets
  metadata: {
    min: <String>, // String, because this is a int64, and JavaScript doesn't support it
  },
  q, // Optional. This is the query you received has a parameter. Useful to debugging
  params // Optional. These are the parameters you received. Useful to debugging
}
```

This is an example of how it should be implemented using Express:
```js
const Twitter = require('twitter');

var config = {
    connector: {
        consumer_key: 'your-tweeter-key',
        consumer_secret: 'your-tweeter-secret',
        access_token_key: null,
        access_token_secret: null
    },
    postsPerCall: 100
};

app.post('/getTweets', (req, res) => {
  try {
    config.connector.access_token_key = req.body.key;
    config.connector.access_token_secret = req.body.secret;
    twitterCollector = new Twitter(config.connector);

    utils.searchTweets(
      req.query.q,
      {
        max: req.query.max,
        count: req.query.count || config.tweetsPerCall
      }
    )
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(503).send({
        error,
        req: {
          query: req.query,
          body: req.body
        }
      });
    });

  } catch (e) {
    res.status(503).send({
      error: e.name + ': ' + e.message,
      req: {
        query: req.query,
        body: req.body
      }
    });
  }
});

const utils = {
  searchTweets: function searchTweets(q, params) {
    return new Promise(function(done, fail) {
      twitterCollector.get(
        'search/tweets',
        {
          q: q,
          count: params.count,
          max_id: params.max === null ? null : num(params.max).toString()
        },
        function(error, tweets, response) {
          if (error) {
            fail({
              error
            });
            return;
          }

          var responseMin = null;

          if (tweets.statuses.length > 0) {
            responseMin = tweets.statuses[0].id_str;

            tweets.statuses.forEach(t => {
              // t.id_str < responseMin
              if (num(t.id_str).cmp(num(responseMin)) === -1) {
                responseMin = t.id_str;
              }
            });
          }

          // This is just to avoid returning the WHOLE Tweet object, and return only
          // what we need in the frontend.
          tweets.statuses = tweets.statuses.map(function(x) {
            return {
              coordinates: x.coordinates,
              created_at: x.created_at,
              place: x.place,
              favorite_count: x.favorite_count,
              retweet_count: x.retweet_count,
              user: {
                verified: x.user.verified,
                followers_count: x.user.followers_count,
                friends_count: x.user.friends_count
              }
            };
          });

          done({
            tweets,
            isDone: (params.count - tweets.statuses.length) > 0,
            metadata: {
              min: responseMin,
            },
            q,
            params
          });
        }
      );
    });
  }
};
```

# Pending things
Check the [issues tab](https://github.com/BrodaNoel/devseverywhere/issues) to see what's coming.
