"use strict";

var mongoose = require('mongoose');
var Domain = mongoose.model('Domain');
var config = require('../../config');

module.exports = function (req, res) {
    Domain.remove({
        url: req.params.url
    }, function (err) {
        if (err) {
            return res.send(config.mensagem);
        }
        Domain.find({}, function (err, domains) {
            if (err) {
                return res.send(config.mensagem);
            }
            return res.json(domains);
        });
    });
};