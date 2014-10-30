var secrets = require('../config/secrets');

/**
 * GET /
 * Photos index page.
 */
exports.index = function(req, res) {
    var photoArr;

    var Flickr = require("flickrapi"),
                flickrOptions = secrets.flickr;

    Flickr.authenticate(flickrOptions, function(error, flickr) {
            flickr.photos.search({
              text: "red+panda"
            }, function(err, result) {
              if(err) { throw new Error(err); }
              // do something with result
              console.log(result);
            });
    });


  res.render('photos', {
    title: 'Photos',
    // photos: photoArr
  });
};
