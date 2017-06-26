/**
 * Created by MiM on 23/06/2017.
 */
var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');

exports.dangky = function(entity) {
    var d = q.defer();
    var sql = mustache.render('INSERT INTO user (tendangnhap,matkhau,hoten,gioitinh,ngaysinh,sodienthoai,diachi,email,ngaybatdauban,chucvu) VALUES("{{username}}","{{pass}}","{{hoten}}","{{gioitinh}}","{{datepicker}}","{{sdt}}","{{diachi}}","{{email}}","{{ngay}}","{{chucvu}}")',entity);
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
            var user = {
                id: rows[0].idUSER,
                username: rows[0].tendangnhap,
                name: rows[0].hoten,
                email: rows[0].email,
                ngaysinh: rows[0].ngaysinh,
                chucvu: rows[0].chucvu
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