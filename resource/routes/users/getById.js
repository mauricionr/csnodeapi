"use strict";

var mongoose = require('mongoose');
var User = mongoose.model('User');
var config = require('../../config');

module.exports = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) {
      return res.send(config.mensagem);
    }
    return res.json(user);
  });
};