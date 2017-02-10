/*jshint node: true */
'use strict';

var auth = require('./handlers/authentication');
var render = require('./handlers/render');
var url = require('./handlers/url');
var users = require('./handlers/user');
var shiping = require('./handlers/shipping');
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

    //app.get('*', render.redirectMaintenance);
    app.post('/login', auth.login);
    app.get('/forgot_password', auth.forgotPass, render.redirect);
    app.get('/logout', auth.logout);
    app.all('*', auth.checkauterization, render.redirect);


    // *******************Admin Routes
    app.all('*', auth.checkAdmin, render.redirect);




    // app.post('/admin/getAllSeed',seed.getAllSeed, render.adminGetAllSeed);
};