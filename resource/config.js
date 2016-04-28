"use strict";

var superSecrete = "superSecrete";
var crypto = require('crypto');

module.exports = {
    dbURL: 'mongodb://localhost:27017/cs',
    superSecrete: superSecrete,
    mensagem: 'Algo deu errado!',
    emailExistente: 'E-mail já existente',
    usuarioOuSenha: 'Usuário e/ou senha inválidos',
    naoAutorizado: 'Não autorizado',
    sessaoInvalida: 'Sessão Invalida',
    getHash: function (key, key2) {
        var retorno = crypto
            .createHash('sha256', key || superSecrete)
            .update(key2 || superSecrete)
            .digest('base64');

        return retorno;
    },
    testsUsers: {
        user: {
            nome: "Full Name",
            email: "teste@teste.com.br",
            senha: "abc123",
            token: "",
            telefones: [
                { ddd: 11, numero: 31231231 },
                { ddd: 11, numero: 31231231 }
            ]
        },
        wrongEmail: "wrongEmail@wrongEmail.com.br",
        wrongPass: "wrongPassword@wrongPassword"
    }
};