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

        var obj = {
            "configcode": "BugStatus",
            "configvalue1": "Verify12199",
            "createdby": 1
        }
        var a = JSON.stringify(obj);
        var query = {
            sql: 'call new_procedure_test(?)',
            values: [a]

        };
        console.log('@', JSON.stringify(obj));
        console.log(query);
        mysql(query, function(err, result) {
            if (err) {
                console.log(err);
                res.json({
                    'status': 'Error'
                });
            } else {
                console.log(result)
                res.json({
                    'status': 'Successful',
                    'result': result[0]
                });
            }
        });
    },
};