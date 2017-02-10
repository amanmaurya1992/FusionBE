var nodemailer = require("nodemailer");
var CronJob = require('cron').CronJob;
var async = require("async");
var mail = require('../lib/mailer');
var merchantInventory = require('../routes/handlers/master');
var common = require('../lib/common');



module.exports = function() {

    new CronJob('00 33 18 * * 1-6', function() {
        console.log('report_1', new Date());
        var sender = 'Support Team Polestar';


        merchantInventory.getCourierLog(function(err, report) {
            if (err) {
                return;
            }
            var report1 = report[0];
            var report2 = report[1];
            //************************ CSV MAKER FOR JSON DATA ******************************
            var html = '<html><head></head><body><p>Hi,\nPlease find the attached Log. auto mailer</p>';
            if (report2.length > 0) {
                html += '<p style="color:red">\n  Unmapped status log</p>';
                html += '<table class="tftable" border="1"><thead>';
                html += '<tr><th>Current Status</th><th>Shipper</th><th>Rows</th><th>Spoc</th></tr></thead><tbody>';
            }
            for (var i = 0; i < report2.length; i++) {
                html += '<tr><td>' + report2[i].courier_status + '</td>';
                html += '<td>' + report2[i].shipper + '</td>';
                html += '<td>' + report2[i].rcount + '</td>';
                html += '<td>' + report2[i].email_id + '</td></tr>';
            }
            if (report2.length > 0) {
                html += '</tbody></table>';
            }



            html += '</body></html>';

            //var cc = 'rajesh4.kumar@paytm.com,amandeep3.singh@paytm.com';
            var to = 'anjali.jain@paytm.com';
            var cc = 'vijender.singh@paytm.com,abhishek.parihar@paytm.com,mayank2.gupta@paytm.com';
            var mailsubject = "Shipping Panel Work Log.";
            var mailmessage = 'Hi,\nPlease find the attached Log. auto mailer';
            var attachemnt = common.createCsv(report1, 'Log', to, mailsubject);
            mail.sendEmailAttachment(sender, to, cc, mailsubject, html, attachemnt, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('sent');

                }
            });

        });


    }, null, true, 'Asia/Kolkata');


};


{}