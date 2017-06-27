/**
 * Created by MiM on 22/06/2017.
 */
var express = require('express'),
moment = require('moment'),
    yeucau = require('../models/yeucauRepo'),
    q = require('q');
var r = express.Router();
r.get('/', function(req, res) {
    q.all([yeucau.load()])
        .spread(function(rows)
        {
            var vm = {
                layoutModels: res.locals.layoutModels,
                yeucau:rows
            }
            res.render('Quản trị/danhsachyeucau', vm);
        })
});
r.get('/duyet', function(req, res) {
    var ngay=moment(new Date(Date.now())).format('YYYY-MM-DD HH:mm:s');
    var id=
        {
            id:req.query.idUSER,
            ngay:ngay
        }
    q.all([yeucau.delete(id),yeucau.update(id)])
        .spread(function(affectedRows)
        {
            res.redirect('/quanliyeucau');
        })
});
r.get('/tuchoi', function(req, res) {
    var id=
        {
            id:req.query.idUSER,
        }
    q.all([yeucau.delete(id)])
        .spread(function(affectedRows)
        {
            res.redirect('/quanliyeucau');
        })
});
module.exports = r;
