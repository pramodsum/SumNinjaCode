/**
 * GET /
 * Quotes page.
 */

exports.index = function(req, res) {
  res.render('quotes', {
    title: 'Quotes'
  });
};
