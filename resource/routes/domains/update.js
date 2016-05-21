"use strict";

var mongoose = require('mongoose');
var Domain = mongoose.model('Domain');
var config = require('../../config');

module.exports = function (req, res) {
    Domain.update({ url: req.params.url }, req.body, function (err, domain) {
        if (err) {
            return res.send(config.mensagem);
        }
        return res.json(domain);
    });
};