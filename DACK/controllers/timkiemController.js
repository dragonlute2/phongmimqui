/**
 * Created by Qui on 6/24/2017.
 */
var express = require('express'),
    danhsachtimkiem = require('../models/timkiemRepo'),
    q = require('q');
var r = express.Router();

r.get('/', function(req, res) {
    var catId = req.query.timKiem;
    console.log(catId);
    // res.render('Tìm kiếm/timkiemnew', vm);


    danhsachtimkiem.load2(catId)
        .then(function(rows) {
            var vm = {
                layoutNGuoidung: false,
                timkiem123: rows,
            };
            console.log(vm)
            res.render('Tìm kiếm/timkiemnew', vm);
        }).fail(function(err) {
        console.log(err);
        res.end('fail');
    });



});

r.post('/', function(req, res) {

    var entity = req.body;

    console.log(entity);

    danhsachtimkiem.load()
        .then(function(rows) {
            var vm = {
                layoutNGuoidung: false,
                timkiem123: rows,
            };
            res.render('Tìm kiếm/timkiemnew', vm);
        }).fail(function(err) {
        console.log(err);
        res.end('fail');
    });
});
module.exports = r;