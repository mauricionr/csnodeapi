"use strict";

var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var mensagem = config.usuarioOuSenha;
//var crypto = require('crypto');

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
            req.body.senha = config.getHash(req.body.senha, req.body.senha);
            if (user.senha !== req.body.senha) {
                res.status(401).send(mensagem);
            } else {
                var hashToken = config.getHash();
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