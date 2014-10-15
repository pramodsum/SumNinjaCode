/**
 * GET /
 * Quotes page.
 */

exports.index = function (req, res) {
  res.render('projects', {
    title: 'Projects'
  });
};

/**
 * GET /
 * Mission Demolition page.
 */

exports.getMD = function (req, res) {
  res.render('projects/games/mission-demolition', {
    title: 'Mission Demolition'
  });
};


/**
 * GET /
 * Legend of Zelda page.
 */

exports.getZelda = function (req, res) {
  res.render('projects/games/zelda', {
    title: 'Legend of Zelda'
  });
};


/**
 * GET /
 * Legend of Zelda page.
 */

exports.getDino = function (req, res) {
  res.render('projects/games/dino-proto', {
    title: 'Save the Dino'
  });
};

/**
 * GET /
 * Travels
 */

exports.getTravels = function (req, res) {
  res.render('travels', {
    title: 'Travels'
  });
};