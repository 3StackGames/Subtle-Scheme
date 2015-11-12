var express = require('express');
var app = express();
var mongoose = require('mongoose');
var dbConfig = require('./db.js');
mongoose.connect(dbConfig.url);
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
  // mongoose.connect('mongodb://rushpoll.com/test');
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
