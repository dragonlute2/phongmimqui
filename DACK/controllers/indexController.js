/**
 * Created by MiM on 21/06/2017.
 */
var express = require('express'),
    index = require('../models/indexRepo'),
    q = require('q');
var r = express.Router();
// r.get('/',function (req,res) {
//     var vm = {
//         layout: false,
//     };
//     res.render('index',vm);
// });

r.get('/', function(req, res) {
    q.all([index.loadbac1(), index.loadbac2(), index.loadbac3()])
        .spread(function(pRow1, pRow2, pRow3)
    {
        var vm = {
            layout:false,
            bac1: pRow1,
            bac2:pRow2,
            bac3:pRow3



        }
        res.render('index', vm);
        console.log(vm);
    })
});

// r.get('/', function(req, res) {
//     index.loadbac1()
//         .then(function(rows) {
//             var vm = {
//                 layout: false,
//                 bac1: rows
//             };
//             res.render('index', vm);
//         }).fail(function(err) {
//         console.log(err);
//         res.end('fail');
//     });
// });

module.exports = r;
