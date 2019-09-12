// all student related services
var studentService = function(acedInterventionResource,utilsService) {
    return {
        listStudents : function(params,cb) {
            var msg = utilsService.validateInput('listStudents',params);
            if (msg.length == 0) {
                var prm = acedInterventionResource.listStudents(params);
                prm.$promise.then(utilsService.successCallBack(cb),utilsService.errorCallBack(cb));
            } else {
                cb(msg,null)
            }
        },
        listTargetBehaviors : function(params,cb) {
            var msg = utilsService.validateInput('listTargetBehaviors',params);
            if (msg.length == 0) {
                var prm = acedInterventionResource.listTargetBehaviors(params);
                prm.$promise.then(utilsService.successCallBack(cb),utilsService.errorCallBack(cb));
            } else {
                cb(msg,null)
            }
        },
        listAbcs : function(params,cb) {
            var msg = utilsService.validateInput('listAbcs',params);
            if (msg.length == 0) {
                var prm = acedInterventionResource.listAbcs(params);
                prm.$promise.then(utilsService.successCallBack(cb),utilsService.errorCallBack(cb));
            } else {
                cb(msg,null)
            }
        },
        postFrequencyObservation : function(params,cb) {
            var msg = utilsService.validateInput('postFrequencyObservation',params);
            if (msg.length == 0) {
                var prm = acedInterventionResource.postFrequencyObservation({postFrequencyObservation:params});
                prm.$promise.then(utilsService.successCallBack(cb),utilsService.errorCallBack(cb));
            } else {
                cb(msg,null)
            }
        },
        postAbcObservation : function(params,cb) {
            var msg = utilsService.validateInput('postAbcObservation',params);
            if (msg.length == 0) {
                var prm = acedInterventionResource.postAbcObservation({postAbcObservation:params});
                prm.$promise.then(utilsService.successCallBack(cb),utilsService.errorCallBack(cb));
            } else {
                cb(msg,null)
            }
        },
        postTaskObservation : function(params,cb) {
            var msg = utilsService.validateInput('postTaskObservation',params);
            if (msg.length == 0) {
                var prm = acedInterventionResource.postTaskObservation({postTaskObservation:params});
                prm.$promise.then(utilsService.successCallBack(cb),utilsService.errorCallBack(cb));
            } else {
                cb(msg,null)
            }
        }

    }
}

angular.module('acedIntervention.services').factory('studentService',['acedInterventionResource','utilsService',studentService]);
