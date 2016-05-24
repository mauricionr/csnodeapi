var request = require('supertest');
var path = require('path');
var jwt = require('jsonwebtoken');
var User = require(path.resolve('./resource/models/user'));
var Domain = require(path.resolve('./resource/models/domain'));
var config = require(path.resolve('./resource/config'));
var getHash = require(path.resolve('./resource/lib/getHash'));
var getAuthHeader = require(path.resolve('./resource/lib/getAuthHeader'));
var server, _user, credentials, _domain;

config.testsUsers = require('./data/user');
config.testsDomain = require('./data/domain');

describe('Domains', function () {
    beforeEach(function (done) {
        server = request.agent(require(path.resolve('./server.js')));
        credentials = { email: config.testsUsers.user.email, senha: config.testsUsers.user.senha };
        _user = new User();
        Domain.remove();
        _user.nome = config.testsUsers.user.nome;
        _user.email = credentials.email;
        _user.senha = getHash(credentials.senha, credentials.senha);
        _user.telefones = [{ ddd: 11, numero: 123123213 }, { ddd: 11, numero: 123132334 }];
        _user.token = jwt.sign(_user, getHash(), config.expire);
        _user.save(function (err, user) {
            done();
        });
    });

    afterEach(function (done) {
        _user.remove();
        _domain.remove();
        done()
    });

    it('Should be able to create a new domain', function (done) {
        _domain = new Domain()
        _domain.userId = _user._id;
        _domain.token = jwt.sign(_domain, getHash(_user._id), config.expire);
        _domain.url = config.testsDomain.url;
        server.post('/api/domains')
            .set(config.AuthHeader, getAuthHeader(_user.token))
            .send(_domain)
            .expect(200)
            .end(function (Err, response) {
                if (Err) {
                    return done(Err);
                }
                return done();
            });

    })
});