/**
 * Created by MiM on 21/06/2017.
 */
var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');

exports.loadbac1 = function() {
    var d = q.defer();
    var sql = 'select * from loaisanpham1';
    d.resolve(db.load(sql));
    return d.promise;
}
exports.loadbac2 = function() {
    var d = q.defer();

    var sql ='select * from loaisanpham2';
    d.resolve(db.load(sql));
    return d.promise;
}
exports.loadbac3 = function() {
    var d = q.defer();
    var sql = 'select * from loaisanpham3';
    d.resolve(db.load(sql));
    return d.promise;
}
exports.loadTop5SanPhamDauGia = function () {
    var d = q.defer();
    var sql = 'select idsanphamdaugia, sotien, sanpham.*, count(*) from chitietdaugia, sanpham WHERE idsanphamdaugia = sanpham.idSANPHAM AND sanpham.conhan = 1 GROUP BY idsanphamdaugia ORDER BY COUNT(*) DESC LIMIT 5';
    d.resolve(db.load(sql));
    return d.promise;
}
exports.loadTop5GiaCaoNhat = function () {
    var d = q.defer();
    var sql = 'select sanpham.* from sanpham where sanpham.conhan = 1 ORDER BY sanpham.gia DESC LIMIT 5';
    d.resolve(db.load(sql));
    return d.promise;
}
