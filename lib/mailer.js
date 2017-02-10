/*jshint node: true */
'use strict';

var nodemailer = require('nodemailer');
var config = require('../config/config').mailconfig;
var fs = require('fs');

var transporter = nodemailer.createTransport("SMTP", {
    service: config.service,
    auth: {
        user: config.user,
        pass: config.password
    }
});

module.exports = {

    sendEmail: function(sender, receiver, mailsubject, mailmessage, callback) {
        if (!sender && !receiver) {
            var error = new Error('Sender and Receiver field can not left blank');
            return callback(error, null);
        }
        var mailOptions = {
            from: sender,
            to: receiver,
            subject: mailsubject,
            text: mailmessage,
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, 'success');
            }
        });
    },
    sendEmailAttachment: function(sender, receiver, cc, mailsubject, mailmessage, attachemnt, callback) {
        if (!sender && !receiver) {
            var error = new Error('Sender and Receiver field can not left blank');
            return callback(error, null);
        }
        var mailOptions = {
            from: sender,
            to: receiver,
            cc: cc,
            subject: mailsubject,
            html: mailmessage,
            attachments: attachemnt
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, 'success');
            }
        });
    }

};