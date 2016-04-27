var request = require('supertest');
var path = require('path');
var jwt = require('jsonwebtoken');
var User = require(path.resolve('./resource/models/user'));
var config = require(path.resolve('./resource/config'));
var server, _user;

describe('Users', function () {
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

    it('should be able to get same user as login', function (done) {
        _user.email = credentials.email;
        _user.senha = credentials.senha;
        server.post('/auth/sign-in')
            .send(_user)
            .expect(200)
            .end(function (Err, response) {
                if (Err) {
                    return done(Err);
                }
                server.get('/api/users/' + response.body._id)
                    .set('authentication', 'Bearer ' + response.body.token)
                    .expect(200, response.body)
                    .end(function (Err, Res) {
                        if (Err) {
                            return done(Err)
                        }
                        return done()
                    })
            });
    });
    
    it('should be able to get all users', function (done) {
        _user.email = credentials.email;
        _user.senha = credentials.senha;
        server.post('/auth/sign-in')
            .send(_user)
            .expect(200)
            .end(function (Err, response) {
                if (Err) {
                    return done(Err);
                }
                server.get('/api/users')
                    .set('authentication', 'Bearer ' + response.body.token)
                    .expect(200)
                    .end(function (Err, Res) {
                        if (Err) {
                            return done(Err)
                        }
                        return done()
                    })
            });
    });

});