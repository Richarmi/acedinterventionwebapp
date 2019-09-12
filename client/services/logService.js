// service for logging
var logService = function(wovoResource,utilsService) {
    return {
        makeLog:function(params,cb) {
            var msg = utilsService.validateInput('makeLog',params);
            if (msg.length == 0) {
                var prm = wovoResource.makeLog(params);
                prm.$promise.then(utilsService.successCallBack(cb),utilsService.errorCallBack(cb));
            } else {
                cb(null,msg,null)
            }
        }
    }
}

angular.module('acedIntervention.services').factory('logService',['acedInterventionResource','utilsService',logService]);