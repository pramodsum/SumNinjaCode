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
