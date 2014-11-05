var secrets = require('../config/secrets');
// var skrollr = require('skrollr-css');
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: secrets.sendgrid.user,
    pass: secrets.sendgrid.password
  }
});

var viewAPIKey = secrets.boxView.key;
var client = require('box-view').createClient(viewAPIKey);

function getSession(id) {
  client.sessions.create(id, function(err, data, res) {
    console.log('%j', data);
    if(res.statusCode == 200) {
      txtFileURL = data["urls"]["view"];
      console.log(txtFileURL);
      return txtFileURL;
    } else if(res.statusCode == 202) {
      return getSession(id);
    }
  });
}

/**
 * GET /about
 * About me page.
 */

exports.index = function(req, res) {
  var textURL = "https://wordpress.org/plugins/about/readme.txt";
  var codeURL = "http://pygtk.org/pygtk2tutorial/examples/helloworld.py";
  var opt = { params: { duration: 9999999 } };

  var txtFileURL, codeFileURL;

  // client.documents.uploadURL(textURL, opt, function(err, data, r) {
  //   console.log('%j', data);

  //   txtFileURL = getSession(data["id"]);
  //   console.log("TXT: " + txtFileURL);

  //   client.documents.uploadURL(codeURL, opt, function(err, data, r) {
  //     console.log('%j', data);

  //     codeFileURL = getSession(data["id"]);
  //     console.log("CODE: " + codeFileURL);

      res.render('about', {
        title: 'About',
        txtfile: txtFileURL,
        codefile: codeFileURL
      });
  //   });
  // });
};

/**
 * GET /contact
 * Contact form page.
 */

exports.getContact = function(req, res) {
  res.render('contact', {
    title: 'Contact'
  });
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 * @param email
 * @param name
 * @param message
 */

exports.postContact = function(req, res) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('message', 'Message cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/contact');
  }

  var from = req.body.email;
  var name = req.body.name;
  var body = req.body.message;
  var to = 'your@email.com';
  var subject = 'Contact Form | Hackathon Starter';

  var mailOptions = {
    to: to,
    from: from,
    subject: subject,
    text: body
  };

  transporter.sendMail(mailOptions, function(err) {
    if (err) {
      req.flash('errors', { msg: err.message });
      return res.redirect('/contact');
    }
    req.flash('success', { msg: 'Email has been sent successfully!' });
    res.redirect('/contact');
  });
};
