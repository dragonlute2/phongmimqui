var express = require('express');

var r = express.Router();

r.get('/', function(req, res) {
    var vm = {
    	layoutVM: res.locals.layoutVM
    };
    res.render('home/index', vm);
});

r.get('/about', function(req, res) {
    var vm = {
    	layoutVM: res.locals.layoutVM
    };
    res.render('home/about', vm);
});

r.get('/category', function(req, res) {
    res.end('ooops');
});

module.exports = r;