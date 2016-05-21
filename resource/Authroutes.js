"use strict";

var express = require('express');
var auth = express.Router();
var routes = require('./routes/users/index');

auth.route('/sign-up').post(routes.signUp);

auth.route('/sign-in').post(routes.signIn);

module.exports = auth;