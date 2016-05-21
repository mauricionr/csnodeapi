"use strict";

var mongoose = require('mongoose');
var Domain = mongoose.model('Domain');
var config = require('../../config');

module.exports = function (req, res) {
    Domain.findOne({
        url: req.params.url
    }, function (err, domain) {
        if (err) {
            return res.send(config.mensagem);
        }
        return res.json(domain);
    });
};