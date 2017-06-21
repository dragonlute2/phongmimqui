var express = require('express'),
    categoryRepo = require('../models/categoryRepo');

var r = express.Router();

r.get('/', function(req, res) {
    categoryRepo.loadAll()
        .then(function(rows) {
            var vm = {
                layout: false,
                categories: rows
            };
            res.render('category/index', vm);
        }).fail(function(err) {
            console.log(err);
            res.end('fail');
        });
});

r.get('/add', function(req, res) {
    var vm = {
        layout: false,
    };
    res.render('category/add', vm);
});

r.post('/add', function(req, res) {

    categoryRepo.insert(req.body).then(function(data) {
        var vm = {
            layout: false,
        };
        res.render('category/add', vm);
    }).catch(function(err) {
        console.log(err);
        res.end('insert fail');
    });
});

r.get('/edit', function(req, res) {
    var id = req.query.id;
    categoryRepo.loadDetail(id).then(function(cat) {
        var vm = {
            layout: false,
            category: cat
        };
        res.render('category/edit', vm);
    });
});

r.post('/edit', function(req, res) {
    categoryRepo.update(req.body).then(function(changedRows) {
        res.redirect('/category');
    })
});

r.post('/delete', function(req, res) {
    categoryRepo.delete(req.body).then(function(affectedRows) {
        res.redirect('/category');
    })
});

module.exports = r;