"use strict";

var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var getHash = require('../../getHash');

module.exports = function (req, res) {
    var user = new User();
    user.nome = req.body.nome;
    user.email = req.body.email;
    user.senha = req.body.senha;
    user.telefones = req.body.telefones;
    User.findOne({
        email: req.body.email
    }, function (err, userExist) {
        if (err) {
            return res.send(config.mensagem);
        }
        if (!userExist) {
            var hashToken = getHash();
            user.senha = getHash(user.senha, user.senha);
            user.token = jwt.sign(user, hashToken, config.expire);
            user.save(function (err, userCreated) {
                if (err) {
                    return res.send(config.mensagem);
                }
                return res.json(userCreated);
            });
        } else {
            return res.send(config.emailExistente);
        }
    });
};