/**
 * Created by MiM on 24/06/2017.
 */
var Q = require('q');
//var category = require('../models/category');
//var cart = require('../models/cart');
var ac=require('../models/taikhoanRepo');

module.exports = function(req, res, next) {

    if (req.session.isLogged === undefined) {
        req.session.isLogged = false;
    }
    if (req.session.isLogged === true) {
        next();
    } else {
        var url = '/taikhoan/dangnhap?retUrl=' + req.originalUrl;
        res.redirect(url);
    }
    Q.all([
        ac.loadall()
    ]).spread(function(catList) {
        res.locals.layoutModels = {
            categories: catList,
            isLogged: req.session.isLogged,
            curUser: req.session.user,
        };

        next();
    });
};