"use strict";

var Domain = require('../../models/domain');
 
module.exports = {
    "get": require('./get'),
    "getOne": require('./getOne'),
    "update": require('./update'),
    "delete": require('./delete'),
    "create": require('./create')
};