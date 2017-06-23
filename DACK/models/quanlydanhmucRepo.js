/**
 * Created by MiM on 22/06/2017.
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
    var sql = 'select * from loaisanpham2';
    d.resolve(db.load(sql));
    return d.promise;
}
exports.loadbac3 = function() {
    var d = q.defer();
    var sql = 'select * from loaisanpham3 where LOAISANPHAM2_idLOAISANPHAM2=2';
    d.resolve(db.load(sql));
    return d.promise;
}
