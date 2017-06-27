/**
 * Created by Qui on 6/24/2017.
 */
var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');
exports.load = function() {
    var sql = 'select * from sanpham where tensanpham like "%HTC%"';
    return db.load(sql);
}



exports.load2 = function(catId) {
    var d = q.defer();
    var sql = 'select  nguoiban.hoten, nguoiban.hoten from user as nguoiban, sanpham, chitietdaugia, user as nguoimua where sanpham.idnguoiban = nguoiban.idUSER and sanpham.tensanpham like "%iphone%" and chitietdaugia.sotien = sanpham.gia and chitietdaugia.idnguoidaugia = nguoimua.idUSER';
    d.resolve(db.load(sql));
    return d.promise;
}


