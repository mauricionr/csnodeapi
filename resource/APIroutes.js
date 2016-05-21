"use strict";

var express = require('express');
var api = express.Router();
var userRoutes = require('./routes/users/index');
var domainRoutes = require('./routes/domains/index');
var tokenMiddleware = require('./lib/tokenMiddleware');

//token middleware
api.use(tokenMiddleware);
//users
api.route('/users/:user_id').get(userRoutes.getById);
api.route('/users').get(userRoutes.getAll);

//domains
api.route('/domains').get(domainRoutes.get);
api.route('/domains').post(domainRoutes.create);
api.route('/domains').patch(domainRoutes.update);
api.route('/domains').delete(domainRoutes.delete);
api.route('/domains/:url').get(domainRoutes.getOne);


module.exports = api;