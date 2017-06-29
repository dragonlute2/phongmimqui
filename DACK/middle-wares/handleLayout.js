var q = require('q'),
    index = require('../models/indexRepo');
var ac=require('../models/taikhoanRepo');

module.exports = function(req, res, next) {
    q.all([index.loadbac1(),index.loadbac2(),index.loadbac3()
    ]).spread(function(cRows1,cRows2,cRows3) {
        res.locals.layoutModels = {
            bac1: cRows1,
            bac2:cRows2,
            bac3:cRows3,
            isLogged: req.session.isLogged,
            curUser: req.session.user,
            isQL: req.session.isQL,
            isBan:req.session.isBan
}
next();
});
}
