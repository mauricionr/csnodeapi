"use strict";

var superSecrete = "superSecrete";

module.exports = {
    dbURL: 'mongodb://localhost:27017/cs',
    superSecrete: superSecrete,
    tokenMessage:'Token não encontrado na requisição',
    mensagem: 'Algo deu errado!',
    emailExistente: 'E-mail já existente',
    usuarioOuSenha: 'Usuário e/ou senha inválidos',
    naoAutorizado: 'Não autorizado',
    sessaoInvalida: 'Sessão Invalida',
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