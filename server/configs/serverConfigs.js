'use strict';

var path = require('path');

module.exports = {
    version : '0.0.0',
    sessionSecret: 'acedIntervention',
    logAppenders : {
        appenders: [
            {
                'category': 'server',
                'type': 'file',
                'filename': 'ds-server.log',
                'maxLogSize': 102400,
                'backups': 30,
                'pollInterval': 15
            },
            {
                'category': 'client',
                'type': 'file',
                'filename': 'ds-client.log',
                'maxLogSize': 102400,
                'backups': 30,
                'pollInterval': 15
            }
        ],
        'levels': {
            '[all]':  'TRACE'
        }
    },
    baseDir : '/',
    runTimeConfig :{
        'production':  {
            uri : 'http://acedintervention.com',
            port : 3000,
            destUrl : 'http://acedintervention.com',
            baseDir : '',
            logFilePath : '/var/app/current/logs/',
            cloudinaryConfigs : {
                apiKey : '783158168346492',
                apiSecret : 'vseWukyoV5_PEE_Z9JZ8Ru_iN1w',
                cloudName : 'wovo',
                uploadPreset : 'zjmlxskjProd',
                envVariable : 'CLOUDINARY_URL=cloudinary://783158168346492:vseWukyoV5_PEE_Z9JZ8Ru_iN1w@acedintervention',
                baseDeliveryUrl : 'http://res.cloudinary.com/acedintervention',
                secureDeliveryUrl : 'https://res.cloudinary.com/acedintervention',
                apiBaseUrl : 'https://api.cloudinary.com/v1_1/acedintervention'
            },
            SESConfigs : {
                accessKeyId : 'AKIAJZJKEFWFE34EAZ7A',
                secretAccessKey : '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',
                region : 'us-west-2',
                fromEmail : 'no-reply@acedintervention.com'
            }
        } ,
        'prototype':  {
            uri:'http://app.acedintervention.com',
            port : 80,
            destUrl : 'http://app.acedintervention.com',
            baseDir : '/home/ec2-user/prototype',
            logFilePath : '/home/ec2-user/prototype/logs/',
            cloudinaryConfigs : {
                apiKey : '783158168346492',
                apiSecret : 'vseWukyoV5_PEE_Z9JZ8Ru_iN1w',
                cloudName : 'wovo',
                uploadPreset : 'f1zaaisxTest',
                envVariable : 'CLOUDINARY_URL=cloudinary://783158168346492:vseWukyoV5_PEE_Z9JZ8Ru_iN1w@wovo',
                baseDeliveryUrl : 'http://res.cloudinary.com/acedintervention',
                secureDeliveryUrl : 'https://res.cloudinary.com/acedintervention',
                apiBaseUrl : 'https://api.cloudinary.com/v1_1/acedintervention'
            },
            SESConfigs : {
                accessKeyId : 'AKIAJZJKEFWFE34EAZ7A',
                secretAccessKey : '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',
                region : 'us-west-2',
                fromEmail : 'no-reply@acedintervention.com'
            }
        },
        'dev':  {
            uri: 'http://localhost',
            port : 3000,
            destUrl : 'http://acedintervention.abhradev.com:3000',
            baseDir : path.join(__dirname, '../../'),
            logFilePath : './logs/',
            cloudinaryConfigs : {
                apiKey : '783158168346492',
                apiSecret : 'vseWukyoV5_PEE_Z9JZ8Ru_iN1w',
                cloudName : 'wovo',
                uploadPreset : 'dejp5iv3Dev',
                envVariable : 'CLOUDINARY_URL=cloudinary://783158168346492:vseWukyoV5_PEE_Z9JZ8Ru_iN1w@acedintervention',
                baseDeliveryUrl : 'http://res.cloudinary.com/acedintervention',
                secureDeliveryUrl : 'https://res.cloudinary.com/acedintervention',
                apiBaseUrl : 'https://api.cloudinary.com/v1_1/acedintervention'
            },
            SESConfigs : {
                accessKeyId : 'AKIAJZJKEFWFE34EAZ7A',
                secretAccessKey : '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',
                region : 'us-west-2',
                fromEmail : 'no-reply@acedintervention.com'
            },
            fbConfigs :  {
                clientId : '1603695679913500',
                clientSecret : '65eacfd0afd38c20fbcf27803928980e'
            }
        }
    },
    sessionConfig : {
        production : {
            ttl: 14 * 24 * 60 * 60, // = 14 days. Default
            touchAfter: 24 * 3600 // time period in seconds
        },
        test : {
            ttl: 14 * 24 * 60 * 60, // = 14 days. Default
            touchAfter: 24 * 3600 // time period in seconds
        },
        dev : {
            ttl: 14 * 24 * 60 * 60, // = 14 days. Default
            touchAfter: 24 * 3600 // time period in seconds
        }
    },
    dbConfig : {
        production :{
            host:"mongodb://wovoUser:w0v0r0cks@ds035874-a0.mongolab.com:35874,ds035874-a1.mongolab.com:35874/wovo?replicaSet=rs-ds035874",
            dbOptions : {
                native_parser:true
            },
            serverOptions : {
                'auto_reconnect': true,
                'poolSize': 5
            }
        },
        test:{
            host:"mongodb://localhost:27017/wovo",
            dbOptions : {
                native_parser:true
            },
            serverOptions : {
                'auto_reconnect': true,
                'poolSize': 5
            }
        },
        dev:{
            host: "mongodb://localhost:27017/wovo",
            dbOptions : {
                native_parser:true
            },
            serverOptions : {
                'poolSize': 5,
                'socketOptions' : {
                    'autoReconnect' : true,
                    'keepAlive' : 10,
                    'connectTimeoutMS' : 300
                }
            }
        }
    }
}
