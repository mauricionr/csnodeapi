var request = require('supertest');
var path = require('path');
var jwt = require('jsonwebtoken');
var User = require(path.resolve('./resource/models/user'));
var config = require(path.resolve('./resource/config'));
var server, _user;

describe('Sign up', function () {
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

    it('should be able to register a new user', function (done) {
        _user.nome = 'register_new_user';
        _user.email = 'register_new_user_@test.com';
        _user.token = jwt.sign(_user, config.superSecrete, config.expire);
        server.post('/sign-up')
            .send(_user)
            .expect(200)
            .end(function (Err, response) {
                if (Err) {
                    return done(Err);
                }
                return done();
            });
    });

    it('should not be able to register a new user', function (done) {
        _user.email = credentials.email;
        _user.token = jwt.sign(_user, config.superSecrete, config.expire);
        server.post('/sign-up')
            .send(_user)
            .expect(200, config.emailExistente)
            .end(function (Err, response) {
                if (Err) {
                    return done(Err);
                }
                return done();
            });
    });
});