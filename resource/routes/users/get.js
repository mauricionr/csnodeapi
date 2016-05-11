"use strict";

var User = require('../../models/user');
var config = require('../../config');

module.exports = function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      return res.send(config.mensagem);
    }
    return res.json(users);
  });
};