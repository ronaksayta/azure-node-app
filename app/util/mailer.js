var nodemailer = require('nodemailer');

var config = require('../config/config');

var transporter = nodemailer.createTransport({
  service: config.service,
  auth: {
    user: config.email,
    pass: config.pass
  }
});

module.exports = transporter;