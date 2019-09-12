// load aws sdk
var AWS = require('aws-sdk');
var serverConfigs = require('../configs/serverConfigs')
var runTimeConfig = serverConfigs.runTimeConfig[env];
global.env = process.env.NODE_ENV || 'dev';

// load aws config
AWS.config.update({
    accessKeyId: runTimeConfig.SESConfigs.accessKeyId,
    secretAccessKey: runTimeConfig.SESConfigs.secretAccessKey,
    region : runTimeConfig.SESConfigs.region
});

// load AWS SES
var ses = new AWS.SES({apiVersion: '2010-12-01'});

// this must relate to a verified SES account
var from = runTimeConfig.SESConfigs.fromEmail;

module.exports = {

    sendEmail : function(emailInformation,cb) {
        var mailConfig = {
            Source: from,
            Destination: { ToAddresses: [emailInformation.to] },
            Message: {
                Subject:{
                    Data: emailInformation.subject
                },
                Body: {
                    Html: {
                        Data: emailInformation.body
                    }
                }
            }
        };
        if (global.env != 'dev') {
            ses.sendEmail(mailConfig, function(err, data) {
                if(err) {
                    cb(err,null)
                } else {
                    cb(null,'Email sent');
                }
            });
        } else {
            console.log('email not sent in dev');
        }
    }

};
