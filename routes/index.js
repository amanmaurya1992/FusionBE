/*jshint node: true */
'use strict';

var auth = require('./handlers/authentication');
var render = require('./handlers/render');
var url = require('./handlers/url');
var users = require('./handlers/user');
var master = require('./handlers/master');
var mkdirp = require("mkdirp");
var busboy = require('connect-busboy');
var parse = require('csv-parse');
var fs = require('fs');
var form = require('reformed');
var admin = require('./handlers/admin');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var multer = require('multer');

var storage = multer.diskStorage({});

var upload = multer({
    storage: storage
});



module.exports = function(app) {

    app.get('/check', master.getReports);

    // app.all('*', auth.checkauterization);


    // *******************Admin Routes
    // app.all('*', auth.checkAdmin, render.redirect);




    // app.post('/admin/getAllSeed',seed.getAllSeed, render.adminGetAllSeed);
};