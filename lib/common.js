/*jshint node: true */
'use strict';
var fs = require('fs');
var mysql = require('./mysql').executeQuery;
var math = require('mathjs');
module.exports = {
    generateRandomString: function(Length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < Length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
};