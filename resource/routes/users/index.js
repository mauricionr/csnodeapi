"use strict";

var User = require('../../models/user');

module.exports = {
    "signIn": require('./signIn'),
    "signUp": require('./signUp'),
    "getById": require('./getById'),
    "getAll": require('./get')
};