var request = require('supertest');
var path = require('path');
var jwt = require('jsonwebtoken');
var User = require(path.resolve('./resource/models/user'));
var config = require(path.resolve('./resource/config'));
var getHash = require(path.resolve('./resource/lib/getHash'));
var server, _user, credentials;

config.testsUsers = require('./data/user');

describe('Sign in', function () {
    beforeEach(function (done) {
        server = request.agent(require(path.resolve('./server.js')));
        credentials = {
            email: config.testsUsers.user.email,
            senha: config.testsUsers.user.senha
        };
        _user = new User();
        _user.nome = config.testsUsers.user.nome;
        _user.email = credentials.email;
        _user.senha = getHash(credentials.senha, credentials.senha);
        _user.telefones = [
            { ddd: 11, numero: 123123213 },
            { ddd: 11, numero: 123132334 }
        ];
        _user.token = jwt.sign(_user, getHash(), config.expire);
        _user.save(function (err, user) {
            done();
        });
    });

    afterEach(function (done) {
        _user.remove();
        done()
    });

    it('should be able sign in a user', function (done) {
        _user.senha = credentials.senha;
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
        _user.senha = config.testsUsers.user.wrongPassword;;
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
        _user.email = config.testsUsers.user.wrongEmail;
        _user.senha = credentials.senha;
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
        _user.email = config.testsUsers.user.wrongEmail;
        _user.senha = config.testsUsers.user.wrongPassword;
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