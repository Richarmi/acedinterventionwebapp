// sample routesList
/*
 routeName: 'home', name of the route
 routeUrl: '/', parameterized URL
 routeMethod: 'get', method
 routeController: 'index',  server side controller file for the route
 routeHandler: null, // handler function in the controller, if null , method is the function name
 accessTo: '*', // array of user types that have access to this route
 isSecured: false, // is it a public route or secured
 isArray: false, // is the returned data in an array , needed for angular resource
 cache : false, // should it be cached in the client, needed for angular resource
 data : null, // format of the data for POST and PUT (needed for angular resource. the key for the posted data should be the same as routeName
 param : {} // parameters in the URL e.g. {registrationKey: '@registrationKey'} refer to angular resource API for more about this
 constraints : {} //  data constraints for validation retrieved from the constraints configs for each route
 */
var _ = require('lodash');
var constraints = require('../configs/constraints');

module.exports = {
    routesList: [
        {
            routeName : 'getConfig',
            routeUrl : '/config/:versionNo/:interface',
            routeMethod : 'get',
            routeController : 'config',
            routeHandler : null,
            accessTo :'*' ,
            isSecured : false,
            isArray: false,
            cache : false,
            data : null,
            params : {versionNo:'1.0.0'},
            constraints : constraints['getConfig'],
            interface:['mobile','desktop']
        },
        {
            routeName : 'listSchedules',
            routeUrl : '/api/schedule/list/:versionNo/:personType/:personId?',
            routeMethod : 'get',
            routeController : 'schedule',
            routeHandler : 'list',
            accessTo :'*' ,
            isSecured : false,
            isArray: false,
            cache : false,
            data : null,
            params : {versionNo:'1.0.0'},
            constraints : constraints['listSchedules'],
            interface:['mobile','desktop']
        },
        {
            routeName : 'listLocations',
            routeUrl : '/api/location/list/:versionNo',
            routeMethod : 'get',
            routeController : 'location',
            routeHandler : 'list',
            accessTo :'*' ,
            isSecured : false,
            isArray: false,
            cache : false,
            data : null,
            params : {versionNo:'1.0.0'},
            constraints : constraints['listLocations'],
            interface:['mobile','desktop']
        },
        {
            routeName : 'listStudents',
            routeUrl : '/api/students/list/:versionNo/:accountId',
            routeMethod : 'get',
            routeController : 'student',
            routeHandler : 'list',
            accessTo :'*' ,
            isSecured : false,
            isArray: false,
            cache : false,
            data : null,
            params : {versionNo:'1.0.0'},
            constraints : constraints['listStudents'],
            interface:['mobile','desktop']
        },
        {
            routeName : 'listTeamMembers',
            routeUrl : '/api/account/list/:versionNo',
            routeMethod : 'get',
            routeController : 'account',
            routeHandler : 'list',
            accessTo :'*' ,
            isSecured : false,
            isArray: false,
            cache : false,
            data : null,
            params : {versionNo:'1.0.0'},
            constraints : constraints['listTeamMembers'],
            interface:['mobile','desktop']
        },
        {
            routeName : 'listTargetBehaviors',
            routeUrl : '/api/student/list/targetBehaviors/:versionNo/:studentId',
            routeMethod : 'get',
            routeController : 'student',
            routeHandler : 'listTargetBehaviors',
            accessTo :'*' ,
            isSecured : false,
            isArray: false,
            cache : false,
            data : null,
            params : {versionNo:'1.0.0'},
            constraints : constraints['listTargetBehaviors'],
            interface:['mobile','desktop']
        },
        {
            routeName : 'listAbcs',
            routeUrl : '/api/student/list/listAbcs/:versionNo/:studentId',
            routeMethod : 'get',
            routeController : 'student',
            routeHandler : 'listAbcs',
            accessTo :'*' ,
            isSecured : false,
            isArray: false,
            cache : false,
            data : null,
            params : {versionNo:'1.0.0'},
            constraints : constraints['listAbcs'],
            interface:['mobile','desktop']
        },
        {
            routeName : 'listMessages',
            routeUrl : '/api/message/list/listMessages/:versionNo/:accountId',
            routeMethod : 'get',
            routeController : 'message',
            routeHandler : 'listMessages',
            accessTo :'*' ,
            isSecured : false,
            isArray: false,
            cache : false,
            data : null,
            params : {versionNo:'1.0.0'},
            constraints : constraints['listMessages'],
            interface:['mobile','desktop']
        },
        {
            routeName : 'postFrequencyObservation',
            routeUrl : '/api/student/postFrequencyObservation/:versionNo',
            routeMethod : 'post',
            routeController : 'student',
            routeHandler : 'postFrequencyObservation',
            accessTo :'*' ,
            isSecured : false,
            isArray: false,
            cache : false,
            data : {postFrequencyObservation : '@postFrequencyObservation' },
            params : {versionNo:'1.0.0'},
            constraints : constraints['postFrequencyObservation'],
            interface:['mobile','desktop']
        },
        {
            routeName : 'postAbcObservation',
            routeUrl : '/api/student/postAbcObservation/:versionNo',
            routeMethod : 'post',
            routeController : 'student',
            routeHandler : 'postAbcObservation',
            accessTo :'*' ,
            isSecured : false,
            isArray: false,
            cache : false,
            data : {postAbcObservation : '@postAbcObservation' },
            params : {versionNo:'1.0.0'},
            constraints : constraints['postAbcObservation'],
            interface:['mobile','desktop']
        },
        {
            routeName : 'postTaskObservation',
            routeUrl : '/api/student/postTaskObservation/:versionNo',
            routeMethod : 'post',
            routeController : 'student',
            routeHandler : 'postTaskObservation',
            accessTo :'*' ,
            isSecured : false,
            isArray: false,
            cache : false,
            data : {postTaskObservation : '@postTaskObservation' },
            params : {versionNo:'1.0.0'},
            constraints : constraints['postTaskObservation'],
            interface:['mobile','desktop']
        },
        {
            routeName : 'postNewMessage',
            routeUrl : '/api/message/postMessage/:versionNo',
            routeMethod : 'post',
            routeController : 'message',
            routeHandler : 'postNewMessage',
            accessTo :'*' ,
            isSecured : false,
            isArray: false,
            cache : false,
            data : {postNewMessage : '@postNewMessage' },
            params : {versionNo:'1.0.0'},
            constraints : constraints['postNewMessage'],
            interface:['mobile','desktop']
        }
    ],

    getResources : function(interfaceRequested) {
        var resourceDict = {}
        _.each(module.exports.routesList, function(route){
            if (_.indexOf(route.interface,interfaceRequested) > -1) {
                var constraints = {}
                constraints[route.routeName] = route.constraints
                resourceDict[route.routeName] = {
                    url : route.routeUrl,
                    method : route.routeMethod.toUpperCase(),
                    isArray : route.isArray,
                    cache : route.cache,
                    data : route.data,
                    params: route.params,
                    constraints: constraints
                }
            }

        });
        return resourceDict
    }
}