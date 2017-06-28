
var express = require('express'),
    danhmuc = require('../models/quanlydanhmucRepo'),
    q = require('q');
var r = express.Router();
// r.get('/',function (req,res) {
//     var vm = {
//         layout: false,
//     };
//     res.render('index',vm);
// });

r.get('/', function(req, res) {
    if(req.session.isLogged===true)
    {
        if(req.session.isQL===true) {
            q.all([danhmuc.loadbac1(), danhmuc.loadbac2(), danhmuc.loadbac3()])
                .spread(function (pRow1, pRow2, pRow3) {
                    var vm = {
                        layoutdanhmuc: true,
                        bac1: pRow1,
                        bac2: pRow2,
                        bac3: pRow3,
                    }
                    res.render('Quản trị/quanlydanhsachdanhmuc', vm);
                    console.log(vm);
                })
        }
        else {
            res.redirect('/');
        }
    }
});

module.exports = r;
