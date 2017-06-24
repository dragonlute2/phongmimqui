/**
 * Created by MiM on 23/06/2017.
 */
var express = require('express'),
    dangkycontroll = require('../models/dangkyRepo'),
    q = require('q');
var crypto = require('crypto');
var moment = require('moment');
var dangky = express.Router()
dangky.get('/', function(req, res) {
    res.render('Đăng ký/dangky', {
        layoutdangky: true,
        showError: false,
        errorMsg: ''
    });
});
dangky.post('/',function(req, res){
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
    q.all([dangkycontroll.loadten(entity), dangkycontroll.loadmail(entity)])
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
                        layoutdangky: true,
                        showError: true,
                        errorMsg: 'Email đã tồn tại'
                    }
                    res.render('Đăng ký/dangky',a);
                }
            }
            if(vm.khongten===false)
            {
                a={
                    layoutdangky: true,
                    showError: true,
                    errorMsg: 'Tên đăng nhập đã tồn tại'
                }
                res.render('Đăng ký/dangky',a);
            }
            if(vm.khongten===true && vm.khongmail===true) {
                dangkycontroll.dangky(entity).then(function (insertId) {
                    var b= {
                        layoutdangky: true,
                        showError: true,
                        errorMsg: 'Đăng ký thành công.'
                    }
                    res.render('Đăng nhập/dangnhap',b);
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
module.exports = dangky;
