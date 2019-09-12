'use strict';

var clientConfigs = require('../configs/clientConfigs');
var serverConfigs = require('../configs/serverConfigs');
var resourcesList = require('../routes/routesList'); // server resources
var utils = require('../utils/utils');
var _ = require('lodash');

module.exports = {

    get : function(req,res) {
        var interfaceRequested = req.params.interface;
        var response = {};
        var globals = req || req.session.globals || {}
        var env = process.env.NODE_ENV;
        var templatePath,routesList,defaultStateForNonLoggedInUser,defaultStateForLoggedInUser;
        // important don't override req.session
        response.version  = serverConfigs.version;
        response.baseUrl = (env == 'production' ? 'http://acedintervention.com'  : 'http://' + req.headers.host);
        response.clientDebug = (env == 'dev' || env== 'test');
        response.env = env;

        if (typeof globals.loggedIn === 'undefined' || globals.loggedIn === false) {
            response.userLoggedIn = false;
            if (interfaceRequested == 'desktop') {
                defaultStateForNonLoggedInUser = clientConfigs.webAppConfigs.defaultStateForNonLoggedInUser;
            }
        } else {
            response.userLoggedIn = true;
            response.account = utils.formatAccountRow(globals.account,globals.profile);
            if (interfaceRequested == 'desktop') {
                defaultStateForLoggedInUser = clientConfigs.webAppConfigs.defaultStateForLoggedInUser;
            }
        }
        response.routesList = [];
        response.resourceList = resourcesList.getResources(interfaceRequested);
        if (!globals.loggedIn) {
            response.defaultState = defaultStateForNonLoggedInUser;
            if (interfaceRequested == 'desktop') {
                response.states = [];
                _.each(clientConfigs.webAppConfigs.states,function(state){
                    response.states.push(state)
                });
            }
        } else {
            response.defaultState = defaultStateForLoggedInUser;
            if (interfaceRequested == 'desktop') {
                response.states = [];
                _.each(clientConfigs.webAppConfigs.states,function(state){
                    if (state.secure === false) { // allow only secure===false states
                        response.states.push(state)
                    }
                });
                // configs for cloudinary image upload
                response.cloudinaryConfigs = {
                    cloudName : serverConfigs.runTimeConfig[env].cloudinaryConfigs.cloudName,
                    uploadPreset : serverConfigs.runTimeConfig[env].cloudinaryConfigs.uploadPreset
                }
            }
        }
        /*
         console.log('sending response------')
         console.dir(response)
         console.log('sending response------')
         */
        res.setHeader('Content-Type','text/javascript');
        res.send("var acedInterventionGlobals = " + JSON.stringify(response));
    }
}