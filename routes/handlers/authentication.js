/*jshint node: true */
'use strict';

var userauth = require('../../model/userauthentication');
var common = require('../../lib/common');
var mysql = require('../../lib/mysql').executeQuery;

var mail = require('../../lib/mailer');


module.exports = {
    checkauterization: function(req, res, next) {
        //console.log('session',req.session)
        //console.log('body',req.body)
        if (req.session.userid) {
            next();
        } else {
            console.log('checkauterization', req.url);
            req.page = 'login';
            req.session.url = req.url;
            next();
        }
    },
    login: function(req, res, next) {
        //	console.log(req.body)
        userauth.login(req.body.email, req.body.password, function(err, result) {
            if (err) {
                console.log(err);
                next(err);
            } else {
                console.log(result)
                if (result.length > 0) {
                    console.log('sadfs', result)
                    req.session.userid = result[0].id;
                    req.session.emailid = req.body.email;
                    req.session.role = result[0].role;


                    if (req.session.role == 1) {
                        console.log('/admin/User')
                        res.redirect('/admin/User');
                    } else {
                        console.log('/userr')
                        res.page = 'success'
                        res.redirect('/');
                    }
                } else {
                    req.session.error = true;
                    res.render('index', {
                            'error': 1
                        })
                        //res.json({'status':'Email or Password is Wrong'});
                }

            }

        });
    },
    checkAdmin: function(req, res, next) {
        if (req.session.role == 1) {
            next();
        } else {
            console.log('checkAdmin', req.url)
            req.page = 'user/report';
            req.session.url = req.url;
            res.redirect('/users/upload_template')
                //next();
        }
    },
    logout: function(req, res, next) {
        //console.log(req.session)
        req.session.destroy();
        console.log('logout', req.url)
        req.page = 'login';
        res.redirect('/');

    },
    forgotPass: function(req, res, next) {

        //console.log(query)
        var query = require('url').parse(req.url, true).query;
        var emailid = query.email;
        //	console.log(emailid)
        if (common.isMailAddressValid(emailid)) {
            var pass = common.generateRandomString(8)
            var query = {
                    sql: 'call usp_shipping_forgot_pass_nr(?,?)',
                    values: [emailid, pass]
                }
                //  console.log(query)
            mysql(query, function(e, r) {
                if (e) {
                    console.log(e);
                    // res.json({'status':'Error'})
                } else {

                    var msg = 'Use this password to log into app: ' + pass + '   \nURL :https://52.74.209.125:8082/';
                    console.log('save')
                    mail.sendEmail('Support Team Polestar', emailid, 'Password for Shipping Panel ', msg, function(err, result) {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(result)
                            }


                        })
                        //res.json({'status':r[0]})
                }
            });
        }

        req.page = 'login';
        console.log(req.url)
        req.session.url = req.url;
        next();
        // console.log(req.body)
    },


}