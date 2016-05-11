"use strict";

var express = require('express');
var jwt = require('jsonwebtoken');
var api = express.Router();
var config = require('./config');
var routes = require('./routes/index');
var getHash = require('./getHash');
api.use(function (req, res, next) {
  var token = req.headers.authentication;
  if (token) {
    var key = 'Bearer ';
    token = token.indexOf(key) > -1 ? token.substring(token.indexOf(' ') + 1) : token;
    req.token = token;
    var hashToken = getHash();
    jwt.verify(token, hashToken, function (err, decoded) {
      if (err) {
        return res.status(401).send(config.sessaoInvalida);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(400).send(config.tokenMessage);
  }
});

api.route('/users/:user_id').get(routes.getById);

api.route('/users').get(routes.getAll);

module.exports = api;