var request = require('supertest');
var path = require('path');
var jwt = require('jsonwebtoken');
var User = require(path.resolve('./resource/models/user'));
var config = require(path.resolve('./resource/config'));
var server, _user, credentials;

describe('Sign in', function () {
    beforeEach(function (done) {
        server = request.agent(require(path.resolve('./server.js')));
        credentials = { email: 'testes12321@teste.com.br', senha: 'p@ssw0rd' };
        _user = new User();
        _user.nome = 'Full name';
        _user.email = credentials.email;
        _user.senha = config.getHash(credentials.senha, credentials.senha);
        _user.elefones = [{ ddd: 11, numero: 123123213 }, { ddd: 11, numero: 123132334 }];
        _user.token = jwt.sign(_user, config.superSecrete, config.expire);
        _user.save(function (err, user) {
            done();
        });
    });

    afterEach(function (done) {
        _user.remove();
        done()
    });

    it('should be able sign in a user', function (done) {
        _user.email = credentials.email;
        _user.senha = config.getHash(credentials.senha, credentials.senha);
        server.post('/auth/sign-in')
            .send(_user)
            .expect(200)
            .end(function (Err, response) {
                if (Err) {
                    return done(Err);
                }
                return done();
            });
    });

    it('should not be able sign in user with wrong password', function (done) {
        _user.email = credentials.email;
        var wrongPassword = 'passw0rd';
        _user.senha = config.getHash(wrongPassword, wrongPassword);
        server.post('/auth/sign-in')
            .send(_user)
            .expect(401, config.usuarioOuSenha)
            .end(function (Err, response) {
                if (Err) {
                    return done(Err);
                }
                return done();
            });
    });

    it('should not be able to sign in user with wrong email', function (done) {
        _user.email = "usuarioNaoExiste@teste.com.br";
        _user.senha = config.getHash(credentials.senha, credentials.senha);
        server.post('/auth/sign-in')
            .send(_user)
            .expect(401, config.usuarioOuSenha)
            .end(function (Err, response) {
                if (Err) {
                    return done(Err);
                }
                return done();
            });
    });

    it('should not be able to sign in user with wrong email and wrong password', function (done) {
        _user.email = "usuarioNaoExiste@teste.com.br";
        var wrongPassword = "sldjksijids";
        _user.senha = config.getHash(wrongPassword, wrongPassword);
        server.post('/auth/sign-in')
            .send(_user)
            .expect(401, config.usuarioOuSenha)
            .end(function (Err, response) {
                if (Err) {
                    return done(Err);
                }
                return done();
            });
    });
});