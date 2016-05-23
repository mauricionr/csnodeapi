"use strict";

var jwt = require('jsonwebtoken');
var getHash = require('./getHash');
var config = require('../config');

module.exports = function (req, res, next) {
    var token = req.headers[config.AuthHeader];
    console.log(token);
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
};