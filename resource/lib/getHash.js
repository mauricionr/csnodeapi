'use strict';

var crypto = require('crypto');
var superSecrete = "superSecrete";

module.exports = function (key, key2) {
    return crypto.createHash('sha256', key || superSecrete)
        .update(key2 || superSecrete)
        .digest('base64');
};