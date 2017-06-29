/**
 * Created by MiM on 23/06/2017.
 */
var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');
var moment = require('moment');
var crypto = require('crypto');


exports.dangky = function(entity) {
    var d = q.defer();
    var sql = mustache.render('INSERT INTO user (tendangnhap,matkhau,hoten,gioitinh,ngaysinh,sodienthoai,diachi,email,ngaybatdauban,chucvu,xacthuc) VALUES("{{username}}","{{pass}}","{{hoten}}","{{gioitinh}}","{{datepicker}}","{{sdt}}","{{diachi}}","{{email}}","{{ngay}}","{{chucvu}}","{{xacthuc}}")',entity);
    d.resolve(db.insert(sql));
    return d.promise;
}
exports.loadten=function (entity) {
    var d = q.defer();
    var sql=mustache.render('select *from user where tendangnhap = "{{username}}"', entity);
    d.resolve(db.load(sql));
    return d.promise;
}
exports.loadmail=function (entity) {
    var d = q.defer();
    var sql=mustache.render('select *from user where email = "{{email}}"', entity);
    d.resolve(db.load(sql));
    return d.promise;
}
exports.loadall=function () {
    var d = q.defer();
    var sql=mustache.render('select *from user ');
    d.resolve(db.load(sql));
    return d.promise;
}
exports.login = function(entity) {

    var deferred = q.defer();

    var sql =
        mustache.render(
            'select * from user where tendangnhap = "{{username}}" and matkhau = "{{pass}}"',
            entity
        );

    db.load(sql).then(function(rows) {
        if (rows.length > 0) {
            ngaysinh1=moment(rows[0].ngaysinh).format('DD/MM/YYYY');
            var user = {
                id: rows[0].idUSER,
                username: rows[0].tendangnhap,
                name: rows[0].hoten,
                email: rows[0].email,
                ngaysinh: ngaysinh1,
                diachi:rows[0].diachi,
                gioitinh:rows[0].gioitinh,
                sdt:rows[0].sodienthoai,
                chucvu: rows[0].chucvu,
                xacthuc:rows[0].xacthuc
            }
            deferred.resolve(user);
        } else {
            deferred.resolve(null);
        }
    });
    return deferred.promise;
}
exports.khoiphucmatkhau=function (entity) {
    var d = q.defer();
    var sql=mustache.render('update user set matkhau="{{pass}}" where idUSER="{{idUSER}}"', entity);
    d.resolve(db.update(sql));
    return d.promise;
}
exports.xoanguoidung=function (entity) {
    var d = q.defer();
    var sql=mustache.render('delete from user where idUSER="{{idUSER}}"', entity);
    d.resolve(db.delete(sql));
    return d.promise;
}
exports.doithongtin=function (entity) {
    var d = q.defer();
    var sql=mustache.render('update user set hoten="{{name}}",email="{{email}}",ngaysinh="{{ngaysinh}}",gioitinh="{{gioitinh}}",sodienthoai="{{sdt}}",diachi="{{diachi}}" where idUSER="{{id}}"', entity);
    d.resolve(db.update(sql));
    return d.promise;
}
exports.doimatkhau=function (entity) {
    var d = q.defer();
    var sql=mustache.render('update user set matkhau="{{pass}}" where idUSER="{{idUSER}}"', entity);
    d.resolve(db.update(sql));
    return d.promise;
}
exports.xacthuc=function (entity) {
    var d = q.defer();
    var sql=mustache.render('update user set xacthuc="{{xacthuc}}" where tendangnhap="{{tendangnhap}}"', entity);
    d.resolve(db.update(sql));
    return d.promise;
}
exports.kiemtramail=function (entity) {
    var deferred = q.defer();
    var sql=mustache.render('select *from user where email = "{{email}}"', entity);
    db.load(sql).then(function(rows) {
        if (rows.length > 0) {
            ngaysinh1=moment(rows[0].ngaysinh).format('DD/MM/YYYY');
            var user = {
                id: rows[0].idUSER,
                username: rows[0].tendangnhap,
                name: rows[0].hoten,
                email: rows[0].email,
                ngaysinh: ngaysinh1,
                diachi:rows[0].diachi,
                gioitinh:rows[0].gioitinh,
                sdt:rows[0].sodienthoai,
                chucvu: rows[0].chucvu,
                xacthuc:rows[0].xacthuc
            }
            deferred.resolve(user);
        } else {
            deferred.resolve(null);
        }
    });
    return deferred.promise;
}

exports.diemtot=function (entity) {
    var deferred = q.defer();
    var sql=mustache.render('SELECT COUNT(*) AS Count from comment where idnguoiduocomment="{{id}}" and diemdanhgia=1', entity);
    db.load(sql).then(function(rows) {
            deferred.resolve(rows[0]);
    });
    return deferred.promise;
}
exports.diemxau=function (entity) {
    var deferred = q.defer();
    var sql=mustache.render('SELECT COUNT(*) AS Count from comment where idnguoiduocomment="{{id}}" and diemdanhgia=0', entity);
    db.load(sql).then(function(rows) {
        deferred.resolve(rows[0]);
    });
    return deferred.promise;
}
exports.loadchitiet = function(entity) {
    var d = q.defer();
    var sql=mustache.render('select hoten,noidungcomment, sanpham.idSANPHAM,idUSER,`comment`.diemdanhgia from `user` ' +
        'INNER JOIN sanpham ON sanpham.idnguoithang=`user`.idUSER ' +
        'INNER JOIN `comment` ON sanpham.idnguoithang=`comment`.idnguoicomment ' +
        'where sanpham.idnguoiban="{{id}}" GROUP BY hoten',entity);
    d.resolve(db.load(sql));
    return d.promise;
}