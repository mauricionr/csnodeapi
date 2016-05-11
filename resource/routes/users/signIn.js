"use strict";

var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var mensagem = config.usuarioOuSenha;
var getHash = require('../../getHash');

module.exports = function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            return res.send(config.mensagem);
        } else if (!user) {
            return res.status(401).send(mensagem);
        } else {
            req.body.senha = getHash(req.body.senha, req.body.senha);
                   if (user.senha !== req.body.senha) {
                return res.status(401).send(mensagem);
            } else {
                user.token = jwt.sign(user, getHash(), config.expire);
                user.ultimo_login = new Date();
                user.save(function (err, userCreated) {
                    if (err) {
                        return res.send(config.mensagem);
                    }
                    return res.json(userCreated);
                });
            }
        }
    });
};