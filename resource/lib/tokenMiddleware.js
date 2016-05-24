"use strict";

var jwt = require('jsonwebtoken');
var getHash = require('./getHash');
var getToken = require('./getToken');
var config = require('../config');
var hashToken, token;

module.exports = function (req, res, next) {
    token = req.headers[config.AuthHeader];
    if (token) {
        token = getToken(token);
        jwt.verify(token, getHash(), function (err, decoded) {
            if (err) return res.status(401).send(config.sessaoInvalida);

            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(400).send(config.tokenMessage);
    }
};