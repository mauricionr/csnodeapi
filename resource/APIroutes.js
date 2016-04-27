"use strict";

var express = require('express');
var jwt = require('jsonwebtoken');
var api = express.Router();
var config = require('./config');
var routes = require('./routes/index');

api.use(function (req, res, next) {
  var token = req.query.token || req.body.token || req.headers['x-access-token'] || req.headers.authentication;
  if (token) {
    var key = 'Bearer ';
    token = token.indexOf(key) > -1 ? token.substring(token.indexOf(' ') + 1) : token;
    req.token = token;
    jwt.verify(token, config.superSecrete, function (err, decoded) {
      if (err) {
        return res.staus(401).send(config.sessaoInvalida);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send(config.naoAutorizado);
  }
});

api.route('/users/:user_id').get(routes.getById);

module.exports = api;