/**
 * Created by USER on 6/27/2017.
 */
var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');

exports.loadTrangBac1 = function(id, limit, offset) {

    var deferred = q.defer();

    var promises = [];

    var view = {
        idBac1: id,
        limit: limit,
        offset: offset
    };

    var sqlCount = mustache.render('select count(*) as total ' +
        'from sanpham, loaisanpham1, loaisanpham2, loaisanpham3  ' +
        'where sanpham.LOAISANPHAM3_idLOAISP3 = loaisanpham3.idLOAISP3 AND loaisanpham3.LOAISANPHAM2_idLOAISANPHAM2 = loaisanpham2.idLOAISANPHAM2 AND loaisanpham2.LOAISANPHAM1_idLOAISANPHAM1 = loaisanpham1.idLOAISANPHAM1 AND loaisanpham1.idLOAISANPHAM1 = {{idBac1}}', view);
    promises.push(db.load(sqlCount));

    var sql = mustache.render('select *, sanpham.tensanpham as tensanpham4 ' +
        'from sanpham ' +
        'left outer join chitietdaugia on sanpham.idSANPHAM = chitietdaugia.idsanphamdaugia ' +
        'INNER JOIN loaisanpham3 on loaisanpham3.idLOAISP3 = sanpham.LOAISANPHAM3_idLOAISP3 ' +
        'INNER JOIN loaisanpham2 on loaisanpham3.LOAISANPHAM2_idLOAISANPHAM2 = loaisanpham2.idLOAISANPHAM2 ' +
        'INNER JOIN loaisanpham1 on loaisanpham2.LOAISANPHAM1_idLOAISANPHAM1 = loaisanpham1.idLOAISANPHAM1 ' +
        'INNER JOIN user on sanpham.idnguoiban = user.idUSER ' +
        'WHERE loaisanpham1.idLOAISANPHAM1  = {{idBac1}} limit {{limit}} offset {{offset}}', view);
    promises.push(db.load(sql));

    var sqlName = mustache.render('select tensanpham from loaisanpham1 where loaisanpham1.idLOAISANPHAM1 = {{idBac1}}', view);
    promises.push(db.load(sqlName));

    var sqlNameBac2 = mustache.render('select loaisanpham2.*, count(sanpham.idSANPHAM) as soLuongSanPham ' +
        'from loaisanpham2 ' +
        'LEFT OUTer JOIN loaisanpham3 on  loaisanpham2.idLOAISANPHAM2 = loaisanpham3.LOAISANPHAM2_idLOAISANPHAM2 ' +
        'LEFT OUTer JOIN sanpham on loaisanpham3.idLOAISP3 = sanpham.LOAISANPHAM3_idLOAISP3 ' +
        'INNER JOIN loaisanpham1 on loaisanpham2.LOAISANPHAM1_idLOAISANPHAM1 = loaisanpham1.idLOAISANPHAM1 ' +
        'WHERE loaisanpham1.idLOAISANPHAM1 = {{idBac1}} ' +
        'GROUP BY loaisanpham2.tensanpham', view);
    promises.push(db.load(sqlNameBac2));

    q.all(promises).spread(function(totalRow, rows, rows1, rows2) {
        for(var i = 0; i < rows.length; i++)
        {
            if(rows[i].sotien == null)
            {
                rows[i].sotien = rows[i].gia;
            }

            if(rows[i].conhan[0] == 0)
            {
                rows[i].thoigiankethuc = "null";
            }
        }
        var data = {
            total: totalRow[0].total,
            list: rows,
            name: rows1,
            nameBac2:rows2
        }
        deferred.resolve(data);
    });

    return deferred.promise;
}
exports.loadTrangBac2 = function(id, limit, offset) {

    var deferred = q.defer();

    var promises = [];

    var view = {
        idBac2: id,
        limit: limit,
        offset: offset
    };

    var sqlCount = mustache.render('select count(*) as total ' +
        'from sanpham, loaisanpham2, loaisanpham3  ' +
        'where sanpham.LOAISANPHAM3_idLOAISP3 = loaisanpham3.idLOAISP3 AND loaisanpham3.LOAISANPHAM2_idLOAISANPHAM2 = loaisanpham2.idLOAISANPHAM2 AND loaisanpham2.idLOAISANPHAM2 = {{idBac2}}', view);
    promises.push(db.load(sqlCount));

    var sql = mustache.render('select *, sanpham.tensanpham as tensanpham4 ' +
        'from sanpham ' +
        'left outer join chitietdaugia on sanpham.idSANPHAM = chitietdaugia.idsanphamdaugia ' +
        'INNER JOIN loaisanpham3 on loaisanpham3.idLOAISP3 = sanpham.LOAISANPHAM3_idLOAISP3 ' +
        'INNER JOIN loaisanpham2 on loaisanpham3.LOAISANPHAM2_idLOAISANPHAM2 = loaisanpham2.idLOAISANPHAM2 ' +
        'INNER JOIN user on sanpham.idnguoiban = user.idUSER ' +
        'WHERE loaisanpham2.idLOAISANPHAM2  = {{idBac2}} limit {{limit}} offset {{offset}}', view);
    promises.push(db.load(sql));
    var sqlNameBac1 = mustache.render('select loaisanpham1.*  ' +
        'from loaisanpham2, loaisanpham1 ' +
        'where loaisanpham2.LOAISANPHAM1_idLOAISANPHAM1 = loaisanpham1.idLOAISANPHAM1 AND loaisanpham2.idLOAISANPHAM2 = {{idBac2}}', view);
    promises.push(db.load(sqlNameBac1));

    var sqlNameBac2 = mustache.render('select tensanpham from loaisanpham2 where loaisanpham2.idLOAISANPHAM2 = {{idBac2}}', view);
    promises.push(db.load(sqlNameBac2));

    var sqlNameBac3 = mustache.render('select loaisanpham3.*, count(sanpham.idSANPHAM) as soLuongSanPham ' +
        'from loaisanpham3 ' +
        'LEFT OUTer JOIN sanpham on loaisanpham3.idLOAISP3 = sanpham.LOAISANPHAM3_idLOAISP3 ' +
        'INNER JOIN loaisanpham2 on loaisanpham3.LOAISANPHAM2_idLOAISANPHAM2 = loaisanpham2.idLOAISANPHAM2 ' +
        'WHERE loaisanpham2.idLOAISANPHAM2 = {{idBac2}} ' +
        'GROUP BY loaisanpham3.tensanpham', view);
    promises.push(db.load(sqlNameBac3));

    q.all(promises).spread(function(totalRow, rows, pRow1, pRow2, pRow3) {
        for(var i = 0; i < rows.length; i++)
        {
            if(rows[i].sotien == null)
            {
                rows[i].sotien = rows[i].gia;
            }
            if(rows[i].conhan[0] == 0)
            {
                rows[i].thoigiankethuc = "null";
            }
        }
        var data = {
            total: totalRow[0].total,
            list: rows,
            nameBac1: pRow1,
            nameBac2:pRow2,
            nameBac3:pRow3
        }
        deferred.resolve(data);
    });

    return deferred.promise;
}
exports.loadTrangBac3 = function(id, limit, offset) {

    var deferred = q.defer();

    var promises = [];

    var view = {
        idBac3: id,
        limit: limit,
        offset: offset
    };

    var sqlCount = mustache.render('select count(*) as total ' +
        'from sanpham,  loaisanpham3  ' +
        'where sanpham.LOAISANPHAM3_idLOAISP3 = loaisanpham3.idLOAISP3 AND loaisanpham3.idLOAISP3 = {{idBac3}}', view);
    promises.push(db.load(sqlCount));

    var sql = mustache.render('select *, sanpham.tensanpham as tensanpham4 ' +
        'from sanpham ' +
        'left outer join chitietdaugia on sanpham.idSANPHAM = chitietdaugia.idsanphamdaugia ' +
        'INNER JOIN loaisanpham3 on loaisanpham3.idLOAISP3 = sanpham.LOAISANPHAM3_idLOAISP3 ' +
        'INNER JOIN user on sanpham.idnguoiban = user.idUSER ' +
        'WHERE loaisanpham3.idLOAISP3  = {{idBac3}} limit {{limit}} offset {{offset}}', view);
    promises.push(db.load(sql));
    var sqlNameBac1 = mustache.render('select loaisanpham1.*  ' +
        'from loaisanpham2, loaisanpham1, loaisanpham3 ' +
        'where loaisanpham2.LOAISANPHAM1_idLOAISANPHAM1 = loaisanpham1.idLOAISANPHAM1 AND loaisanpham2.idLOAISANPHAM2 = loaisanpham3.LOAISANPHAM2_idLOAISANPHAM2 AND loaisanpham3.idLOAISP3 = {{idBac3}}', view);
    promises.push(db.load(sqlNameBac1));

    var sqlNameBac2 = mustache.render('select loaisanpham2.*  from loaisanpham2,  loaisanpham3 where  loaisanpham2.idLOAISANPHAM2 = loaisanpham3.LOAISANPHAM2_idLOAISANPHAM2 AND loaisanpham3.idLOAISP3 =  {{idBac3}}', view);
    promises.push(db.load(sqlNameBac2));

    var sqlNameBac3 = mustache.render('select loaisanpham3.* ' +
        'from loaisanpham3 ' +
        'WHERE loaisanpham3.idLOAISP3 = {{idBac3}} ', view);
    promises.push(db.load(sqlNameBac3));

    q.all(promises).spread(function(totalRow, rows, pRow1, pRow2, pRow3) {
        for(var i = 0; i < rows.length; i++)
        {
            if(rows[i].sotien == null)
            {
                rows[i].sotien = rows[i].gia;
            }
            if(rows[i].conhan[0] == 0)
            {
                rows[i].thoigiankethuc = "null";
            }
        }
        var data = {
            total: totalRow[0].total,
            list: rows,
            nameBac1: pRow1,
            nameBac2:pRow2,
            nameBac3:pRow3
        }
        console.log(data);
        deferred.resolve(data);
    });

    return deferred.promise;
}