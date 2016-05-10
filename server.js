'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');

var app = express();
var isDevelopment = (process.env.NODE_ENV !== 'production');
var static_path = path.join(__dirname, !isDevelopment ? 'dist' : 'src');
var port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(static_path))
app.use(morgan('dev'));

app.get('/', function (req, res) {
  res.sendFile('/index.html')
})
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
