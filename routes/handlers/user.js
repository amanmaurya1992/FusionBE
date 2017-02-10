/*jshint node: true */
'use strict';

var mysql = require('../../lib/mysql').executeQuery;
var common = require('../../lib/common');
var mail = require('../../lib/mailer');

module.exports = {
    UserInfo: function(req, res, next) {
        console.log(req.session.email, 'info');
        var query = "call shipping_panel.usp_shipping_getUsers_rs()";
        mysql(query, function(err, result) {
            if (err) {
                console.log(err);
            } else {

                req.userinfo = {
                    'usersList': result[0],
                    'usersLi': result[1],
                    'seed': result[2],
                    'name': req.session.emailid,
                    'errordata': ''
                };
                req.page = "user";
                next();
            }
        });
    }

};