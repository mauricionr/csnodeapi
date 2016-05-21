"use strict";

var mongoose = require('mongoose');
var Domain = mongoose.model('Domain');
var config = require('../../config');

module.exports = function (req, res) {
    Domain.findOne({
        email: req.body.url
    }, function (err, domainExist) {
        if (err) {
            return res.send(config.mensagem);
        }
        if (!domainExist) {
            var domain = new Domain({ url: req.body.url });
            domain.save(function (err, domainCreated) {
                if (err) {
                    return res.send(config.mensagem);
                }
                return res.json(domainCreated);
            });
        } else {
            return res.send(config.emailExistente);
        }
    });
};