"use strict";

var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var mensagem = config.usuarioOuSenha;

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
            if (user.senha !== req.body.senha) {
                res.status(401).send(mensagem);
            } else {
                user.token = jwt.sign(user, config.superSecrete, config.expire);
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