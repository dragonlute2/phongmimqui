/**
 * Created by MiM on 21/06/2017.
 */
var express = require('express'),
    index = require('../models/indexRepo'),
    q = require('q');
var r = express.Router();


r.get('/', function(req, res) {
    q.all([index.loadbac1(), index.loadbac2(), index.loadbac3(), index.loadTop5SanPhamDauGia(), index.loadTop5GiaCaoNhat()])
        .spread(function(pRow1, pRow2, pRow3, pRow4, pRow5)
    {
        var vm = {
            layout:false,
            bac1: pRow1,
            bac2:pRow2,
            bac3:pRow3,
            top5sanphamdaugia: pRow4,
            top5sanphamgiacao: pRow5
        }
        res.render('index', vm);
    })
});

module.exports = r;
