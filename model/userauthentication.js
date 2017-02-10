/*jshint node: true */
'use strict';

var mysql = require('../lib/mysql').executeQuery;

module.exports = {
    login: function(userid, password, callback) {
        console.log(userid, password)
        var query = {
            sql: 'call usp_shipping_validateuser_rs(?,?)',
            values: [userid, password]
        };
        console.log(query);
        mysql(query, function(err, result) {
            console.log(result, err)
            callback(err, result[0]);
        });


    },
    isUserValidated: function(role) {
        return (role == 1 || role == 0 || role == 2) ? true : false;
    },

    checkRole: function(req) {
        return req.session.role;
    },
    isAdmin: function(req) {
        return this.isRole(req, 1);
        return false;
    },
    isQCUser: function(req) {
        return this.isRole(req, 2);
        return false;
    },
    isRole: function(req, role) {
        return req.session.role == role;
    },


};