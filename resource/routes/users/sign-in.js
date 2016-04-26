var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var mensagem = { "mensagem": "Usuário e/ou senha inválidos" };
module.exports = function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            throw err;
        }
        if (!user) {
            res.json(mensagem);
        } else if (user) {
            if (user.senha != req.body.senha) {
                res.status(401).json(mensagem);
            } else {
                user.token = jwt.sign(user, config.superSecret, config.expire);
                user.save(function (err, userCreated) {
                    if (err) {
                        res.send(config.mensagem);
                    }
                    res.json(userCreated);
                })

            }
        }
    });
}