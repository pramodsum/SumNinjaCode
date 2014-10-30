var Twit = require('twit')

var T = new Twit({
    consumer_key:         '...'
  , consumer_secret:      '...'
  , access_token:         '...'
  , access_token_secret:  '...'
})

function getOEmbed (tweet) {

  // oEmbed request params
  var params = {
    "id": tweet.id_str,
    "maxwidth": MAX_WIDTH,
    "hide_thread": true,
    "omit_script": true
  };

  // request data
  twitter.get(OEMBED_URL, params, function (err, data, resp) {

    tweet.oEmbed = data;
    oEmbedTweets.push(tweet);

    // do we have oEmbed HTML for all Tweets?
    if (oEmbedTweets.length == tweets.length) {
      res.setHeader('Content-Type', 'application/json');
      res.send(oEmbedTweets);
    }
  });
}

function getTweets (paging) {

  var params = {
    action: 'user_timeline',
    user: $scope.username
  };

  // create Tweet data resource
  $scope.tweets = $resource('/tweets/:action/:user', params);

  // GET request using the resource
  $scope.tweets.query( { }, function (res) {

    $scope.tweetsResult = $scope.tweetsResult.concat(res);

    // render tweets with widgets.js
    $timeout(function () {
      twttr.widgets.load();
    }, 30);
  });
}

/**
 * GET /
 * Tweets page.
 */

exports.index = function(req, res) {
  res.render('tweets', {
    title: 'Tweets'
  });
};
