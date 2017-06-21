var mustache = require('mustache'),
    db = require('../fn/db');

exports.loadAllByCat = function(catId) {
    var obj = {
        CatID: catId
    };
    var sql = mustache.render(
        'select * from products where CatID = {{CatID}}',
        obj
    );
    return db.load(sql);
}