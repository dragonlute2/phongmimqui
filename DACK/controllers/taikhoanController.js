/**
 * Created by MiM on 24/06/2017.
 */
/**
 * Created by MiM on 23/06/2017.
 */
var express = require('express'),
    taikhoan = require('../models/taikhoanRepo'),
    q = require('q');
var crypto = require('crypto');
var moment = require('moment');
var taikhoanr = express.Router()
taikhoanr.get('/dangky', function(req, res) {
    res.render('Đăng ký/dangky', {
        layoutModels: res.locals.layoutModels,
        showError: false,
        errorMsg: ''
    });
});
taikhoanr.get('/dangnhap', function(req, res) {
    res.render('Đăng nhập/dangnhap');
});
taikhoanr.post('/dangky',function(req, res){
    var ePWD = crypto.createHash('md5').update(req.body.rawPWD).digest('hex');
    var nDOB = moment(req.body.datepicker, 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm');

    var entity = {
        username: req.body.tendangnhap,
        pass: ePWD,
        hoten: req.body.hoten,
        email: req.body.email,
        datepicker: nDOB,
        gioitinh: req.body.gioitinh,
        sdt: req.body.sdt,
        diachi: req.body.dc,
        ngay: 0
    };
    q.all([taikhoan.loadten(entity), taikhoan.loadmail(entity)])
        .spread(function(pRow1, pRow2)
        {
            var vm = {
                khongten:pRow1.length===0,
                khongmail: pRow2.length===0
            }
            if(vm.khongten===true)
            {
                if(vm.khongmail===false)
                {
                    var a={
                        layoutModels: res.locals.layoutModels,
                        showError: true,
                        errorMsg: 'Email đã tồn tại'
                    }
                    res.render('Đăng ký/dangky',a);
                }
            }
            if(vm.khongten===false)
            {
                a={
                    layoutModels: res.locals.layoutModels,
                    showError: true,
                    errorMsg: 'Tên đăng nhập đã tồn tại'
                }
                res.render('Đăng ký/dangky',a);
            }
            if(vm.khongten===true && vm.khongmail===true) {
                taikhoan.dangky(entity).then(function (insertId) {
                    var b= {
                        layoutModels: res.locals.layoutModels,
                        showError: true,
                        errorMsg: 'Đăng ký thành công.'
                    }
                    res.render('Đăng ký/dangky',b);
                });

            }
        })

    // dangkycontroll.dangky(entity).then(function(insertId) {
    //     res.render('Đăng ký/dangky', {
    //         layoutdangky: true,
    //         showError: true,
    //         errorMsg: 'Đăng ký thành công.'
    //     });
    // });
});
taikhoanr.post('/dangnhap', function(req, res) {

    var ePWD = crypto.createHash('md5').update(req.body.rawPWD).digest('hex');
    var entity = {
        username: req.body.username,
        pass: ePWD
    };
console.log(entity);
    taikhoan.login(entity)
        .then(function(user) {
            if (user === null) {
                res.render('Đăng nhập/dangnhap', {
                    layoutModels: res.locals.layoutModels,
                    showError: true,
                    errorMsg: 'Thông tin đăng nhập không đúng.'
                });
            } else {
                req.session.isLogged = true;
                req.session.user = user;

                var url = '/';
                if (req.query.retUrl) {
                    url = req.query.retUrl;
                }
                res.redirect(url);
            }
        });
});
module.exports = taikhoanr;

