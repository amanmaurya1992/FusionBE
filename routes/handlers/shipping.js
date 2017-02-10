/*jshint node: true */
'use strict';

var mysql = require('../../lib/mysql').executeQuery;
var common = require('../../lib/common');
var mail = require('../../lib/mailer');
var parse = require('csv-parse');
var fs = require('fs');
var math = require('mathjs');
var async = require("async");
var json2csv = require('json2csv');

//var xlsx_parser = require('excel-parser');



module.exports = {
    getReports: function(req, res, next) {

        var query = {
            sql: 'call usp_shipping_get_report(?)',
            values: []

        };
        //console.log(query);
        mysql(query, function(err, result) {
            if (err) {
                console.log(err);
                res.json({
                    'status': 'Error'
                });
            } else {
                res.json({
                    'status': 'Successful',
                    'result': result[0]
                });
            }
        });
    },
};