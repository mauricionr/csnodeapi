'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();
var port = process.env.PORT || 3000;
var config = require('./resource/config');
var api = require('./resource/apiRoutes');
var auth = require('./resource/authRoutes')

mongoose.connect(config.dbURL);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/api', api);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.use('/auth', auth)

app.listen(port, function () {
  console.log('Running on port ' + port);
});

module.exports = app;
