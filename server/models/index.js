// index file for all db interactions and collections
var serverConfigs = require('../configs/serverConfigs');
var dslog = require('../utils/dslog');
var MongoClient = require('mongodb').MongoClient
var broadcaster = require('broadcaster');

var db;
// configure Mongo DB
//var db = mongo.db(serverConfigs.dbConfig[global.env].host,serverConfigs.dbConfig[global.env].dbOptions,serverConfigs.dbConfig[global.env].server_options);

function init() {
    var env = global.env || 'dev';
    MongoClient.connect(serverConfigs.dbConfig[env].host,{server:serverConfigs.dbConfig[env].serverOptions},function (err,dbConnection) {
        if (err) {
            dslog.error('error connecting to mongo db at '+serverConfigs.dbConfig[env].host);
            console.log('error connecting to DB at '+serverConfigs.dbConfig[env].host)
            console.log('aborting....')
            throw err;
        } else {
            dslog.info('connected to mongo db at '+serverConfigs.dbConfig[env].host);
            console.log('connected to mongo db at '+serverConfigs.dbConfig[env].host);
            db = dbConnection;
            console.log('emitting db connection')
            broadcaster.emit('db::connectedToDB')
        }
    });
}

module.exports = {

    collection : function(model) {
        return db.collection(model);
    },

    // @TODO execute this only if those indexes don't exist
    setUpIndexing : function(dbCollection) {
        switch (dbCollection) {
            case 'zipcode':
                console.log("Creating index on zipcode");
                module.exports.collection(dbCollection).createIndex({zipcode: 1});
                console.log("Creating 2dsphere geospatial index on loc");
                module.exports.collection(dbCollection).createIndex({loc:"2dsphere"});
                break;
            case 'profile':
                console.log("Creating index on profile");
                module.exports.collection(dbCollection).createIndex({userName: 1,markedForDeletion:1},{unique:true});
                module.exports.collection(dbCollection).createIndex({accountId: 1,markedForDeletion:1},{unique:true});
                module.exports.collection(dbCollection).createIndex({accountId: 1,profileActive:1,markedForDeletion:1},{unique:true});
                module.exports.collection(dbCollection).createIndex({location:"2dsphere",accountId:1,gender:1,age:1,profileActive:1,'generalInfo.orientation':1});
                module.exports.collection(dbCollection).createIndex({accountId: 1,profileActive:1,markedForDeletion:1,gender:1,age:1,'generalInfo.orientation':1},{unique:true});
                module.exports.collection(dbCollection).createIndex({accountId: 1,profileActive:1,markedForDeletion:1,gender:1,age:-1,'generalInfo.orientation':1},{unique:true});
                break;
            case 'account':
                console.log("Creating index on account");
                module.exports.collection(dbCollection).createIndex({'authResponse.userID': 1,markedForDeletion:1},{unique:false});
                module.exports.collection(dbCollection).createIndex({email: 1,markedForDeletion:1},{unique:true});
                module.exports.collection(dbCollection).createIndex({'_id': 1,markedForDeletion:1},{unique:true});
                module.exports.collection(dbCollection).createIndex({userName: 1,markedForDeletion:1},{unique:true});
                module.exports.collection(dbCollection).createIndex({email: 1,resetKey:1,markedForDeletion:1},{unique:true});
                module.exports.collection(dbCollection).createIndex({ _id: 1,markedForDeletion:1,resetKey:1},{unique:true});
                break;
            case 'invitation' :
                console.log("Creating index on invitation");
                module.exports.collection(dbCollection).createIndex({'invitedByAccountId': 1,'status':1,'addToInnerCircle':1});
                module.exports.collection(dbCollection).createIndex({'invitedByAccountId': 1,'status':1});
                break;
            case 'matchAction' :
                console.log("Creating index on match action");
                module.exports.collection(dbCollection).createIndex({byAccountId: 1, actionType: 1});
                module.exports.collection(dbCollection).createIndex({forAccountId: 1, actionType: 1});
                break;
            case 'message' :
                console.log("Creating index on message");
                module.exports.collection(dbCollection).createIndex({composedByAccountId: 1});
                module.exports.collection(dbCollection).createIndex({toAccountId: 1});
                break;
        }
    }
}

init();