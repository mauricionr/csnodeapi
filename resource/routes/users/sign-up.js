var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');

module.exports = function (req, res) {
    var user = new User();
    user.nome = req.body.nome;
    user.email = req.body.email;
    user.senha = req.body.senha;
    user.telefones = req.body.telefones;
    User.findOne({
        email: req.body.email
    }, function (err, UsuarioJaExiste) {
        if (err) {
            res.json(err)
        }
        if (!UsuarioJaExiste) {
            user.token = jwt.sign(user, config.superSecret, config.expire);
            user.save(function (err, userCreated) {
                if (err) {
                    res.send(config.mensagem);
                }
                res.json(userCreated);
            });
        } else {
            res.json({ "menssagem": "E-mail já existente" })
        }
    });
}