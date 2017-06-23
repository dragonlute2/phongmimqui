/**
 * Created by MiM on 22/06/2017.
 */
var express = require('express'),
    yeucau = require('../models/yeucauRepo'),
    q = require('q');
var r = express.Router();
r.get('/', function(req, res) {
    yeucau.load()
        .then(function(rows) {
            var vm = {
                layoutVM: true,
                yeucau: rows
            };
            res.render('Quản trị/danhsachyeucau', vm);
        }).fail(function(err) {
        console.log(err);
        res.end('fail');
    });
});
module.exports = r;
