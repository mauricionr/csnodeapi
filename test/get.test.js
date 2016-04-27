var request = require('supertest');
var path = require('path');

describe('loading express', function () {
    var server;
    
    beforeEach(function () {
        server = require(path.resolve('./server.js'));
    });
    
    afterEach(function () {
        
    });
    
    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });
    
    it('404 everything else', function testPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
});