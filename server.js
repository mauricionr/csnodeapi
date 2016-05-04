'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');

var app = express();
var config = require('./resource/config');
var api = require('./resource/APIroutes');
var auth = require('./resource/Authroutes')
var isDevelopment = (process.env.NODE_ENV !== 'production');
var static_path = path.join(__dirname, !isDevelopment ? 'dist' : 'src');


mongoose.connect(config.dbURL);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static(static_path))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(morgan('dev'));

app.use('/api', api);

app.use('/auth', auth)

app.get('/', function (req, res) {
  res.sendFile('/index.html')
})

var port = process.env.PORT || 8080

app.listen(port, function () {
  console.log('Running on port ' + port);
});

if (isDevelopment) {
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var WebpackDevServer = require('webpack-dev-server');
  var DevServer = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true
  })
  DevServer.listen(3000, 'localhost', function (err, result) {
    if (err) { console.log(err) }
    console.log('Listening at localhost:3000');
  });
}

module.exports = app;
