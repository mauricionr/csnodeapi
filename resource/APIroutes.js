'use strict';
var express = require('express');
var jwt = require('jsonwebtoken');
var app = express();
var api = express.Router();
var config = require('./config');
var User = require('./models/user');
var routes = require('./routes/index');

api.use(function (req, res, next) {
  var token = req.query.token || req.body.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.superSecret, function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

api.route('/users/:user_id').get(routes.getById)

module.exports = api;