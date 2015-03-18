var express = require('express');
var app = express();
var path = require('path');
var routes = require('index');
app.use('/', routes);

app.use(express.static(path.join(__dirname, 'public')));