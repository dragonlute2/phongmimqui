var q = require('q'),
    index = require('../models/indexRepo');

module.exports = function(req, res, next) {
    q.all([
    	index.loadbac1()
	]).spread(function(cRows) {
		res.locals.layoutVM = {
			bac1: cRows,
			// suppliers: []
		};
    	next();
    });
}