var request = require('supertest');
var path = require('path');
var jwt = require('jsonwebtoken');
var User = require(path.resolve('./resource/models/user'));
var config = require(path.resolve('./resource/config'));
var server, _user;

describe('Sign in', function () {
    beforeEach(function (done) {
        server = request.agent(require(path.resolve('./server.js')));
        credentials = { email: 'testes@teste.com.br', senha: 'M3@n.jsI$Aw3$0m3' };
        _user = new User();
        _user.nome = 'Full name';
        _user.email = credentials.email;
        _user.senha = credentials.senha;
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
        _user.senha = credentials.senha;
        server.post('/sign-in')
            .send(_user)
            .expect(200)
            .end(function (signupErr, signupRes) {
                if (signupErr) {
                    return done(signupErr);
                }
                return done();
            });
    });

    it('should not be able sign in user with wrong password', function (done) {
        _user.email = credentials.email;
        _user.senha = 'passw0rd';
        server.post('/sign-in')
            .send(_user)
            .expect(401, config.usuarioOuSenha)
            .end(function (signupErr, signupRes) {
                if (signupErr) {
                    return done(signupErr);
                }
                return done();
            });
    });

    it('should not be able to sign in user with wrong email', function (done) {
        _user.email = "usuarioNaoExiste@teste.com.br";
        _user.senha = credentials.senha;
        server.post('/sign-in')
            .send(_user)
            .expect(401, config.usuarioOuSenha)
            .end(function (signupErr, signupRes) {
                if (signupErr) {
                    return done(signupErr);
                }
                return done();
            });
    });

    it('should not be able to sign in user with wrong email and wrong password', function (done) {
        _user.email = "usuarioNaoExiste@teste.com.br";
        _user.senha = "sldjksijids";
        server.post('/sign-in')
            .send(_user)
            .expect(401, config.usuarioOuSenha)
            .end(function (signupErr, signupRes) {
                if (signupErr) {
                    return done(signupErr);
                }
                return done();
            });
    });
});