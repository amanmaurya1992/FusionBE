/*jshint node: true */
'use strict';

module.exports = {
	setpage: function(req, res, next) {
		req.page = 'user/report';
		next();
	},
	
};