var express = require('express');
var router = express.Router();
var app = express();
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

app.get('/', function (req, res) {
  res.send('Got a POST request');
})


module.exports = app;
