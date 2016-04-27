"use strict";

var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var mensagem = config.usuarioOuSenha;
var crypto = require('crypto');

module.exports = function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            res.send(config.mensagem);
        }
        if (!user) {
            res.status(401).send(mensagem);
        } else if (user) {
            req.body.senha =
                crypto
                    .createHash('sha256', req.body.senha)
                    .update(req.body.senha)
                    .digest('base64');

            if (user.senha !== req.body.senha) {
                res.status(401).send(mensagem);
            } else {
                var hashToken =
                    crypto
                        .createHash('sha256', user.senha)
                        .update(config.superSecrete)
                        .digest('base64');

                user.token = jwt.sign(user, hashToken, config.expire);
                user.ultimo_login = new Date();
                user.save(function (err, userCreated) {
                    if (err) {
                        res.send(config.mensagem);
                    }
                    res.json(userCreated);
                });
            }
        }
    });
};