/**
 * Created by MiM on 22/06/2017.
 */
var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');
exports.load = function() {
    var sql = 'select hoten,`comment`,tendangnhap,thoigian from chitietxinban,user WHERE chitietxinban.idUser=user.idUSER ORDER BY thoigian';
    return db.load(sql);
}