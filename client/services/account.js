// all account related services

var accountService = function(acedInterventionResource,utilsService) {

    return {
        signIn : function(params,cb) {
            // run the data through the validator
            var msg = utilsService.validateInput('signIn',params)
            if (msg.length == 0) {
                var prm = acedInterventionResource.signIn({signIn:params})
                prm.$promise.then(utilsService.successCallBack(cb),utilsService.errorCallBack(cb));
            } else {
                cb(msg,null)
            }
        },

        signUp : function(params,cb) {
            // run the data through the validator
            var msg = utilsService.validateInput('signUp',params);
            if (msg.length == 0) {
                var prm = acedInterventionResource.signUp({signUp:params})
                prm.$promise.then(utilsService.successCallBack(cb),utilsService.errorCallBack(cb));
            } else {
                cb(null,msg,null)
            }
        },

        getMyAccount : function(params,cb) {
            var msg = utilsService.validateInput('getMyAccount',params)
            if (msg.length == 0) {
                var prm = acedInterventionResource.getMyAccount(params);
                prm.$promise.then(utilsService.successCallBack(cb),utilsService.errorCallBack(cb));
            } else {
                cb(msg,null)
            }
        },

        verifyEmail : function(params,cb) {
            // run the data through the validator
            var msg = utilsService.validateInput('verifyEmail',params);
            if (msg.length == 0) {
                var prm = acedInterventionResource.verifyEmail({email:params.email})
                prm.$promise.then(utilsService.successCallBack(cb),utilsService.errorCallBack(cb));
            } else {
                cb(msg,null)
            }
        },

        verifyResetKey : function(params,cb) {
            // run the data through the validator
            var msg = utilsService.validateInput('verifyResetKey',params);
            if (msg.length == 0) {
                var prm = acedInterventionResource.verifyResetKey({email:params.email,resetKey:params.resetKey})
                prm.$promise.then(utilsService.successCallBack(cb),utilsService.errorCallBack(cb));
            } else {
                cb(msg,null)
            }
        },

        updatePassword : function(params,cb) {
            // run the data through the validator
            var msg = utilsService.validateInput('updatePassword',params);
            if (msg.length == 0) {
                var prm = acedInterventionResource.updatePassword({updatePassword:params});
                prm.$promise.then(utilsService.successCallBack(cb),utilsService.errorCallBack(cb));
            } else {
                cb(null,msg,null)
            }
        },
        // return a promise so the directive can reject if the username is not available
        validateUserName : function(userName) {
            var params = {userName:userName}
            return acedInterventionResource.validateUserName(params);
        },
        // return a promise so the directive can reject if the email is not available
        validateEmail : function(email) {
            var params = {email:email}
            return acedInterventionResource.validateEmail(params);
        },

        updateEmailValidated : function(params,cb) {
            var msg = utilsService.validateInput('updateEmailValidated',params);
            if (msg.length == 0) {
                var prm = acedInterventionResource.updateEmailValidated({updateEmailValidated:params});
                prm.$promise.then(utilsService.successCallBack(cb),utilsService.errorCallBack(cb));
            } else {
                cb(msg,null)
            }
        },

        updateTooltipsDisplayed : function(params,cb) {
            var msg = utilsService.validateInput('updateTooltipsDisplayed',params);
            if (msg.length == 0) {
                var prm = acedInterventionResource.updateTooltipsDisplayed({updateTooltipsDisplayed:params});
                prm.$promise.then(utilsService.successCallBack(cb),utilsService.errorCallBack(cb));
            } else {
                cb(msg,null)
            }
        },

        updateMatchMakeOnly : function(params,cb) {
            var msg = utilsService.validateInput('updateMatchMakeOnly',params);
            if (msg.length == 0) {
                var prm = acedInterventionResource.updateMatchMakeOnly({updateMatchMakeOnly:params});
                prm.$promise.then(utilsService.successCallBack(cb),utilsService.errorCallBack(cb));
            } else {
                cb(msg,null)
            }
        },

        removeFromMyInnerCircle : function(params,cb) {
            var msg = utilsService.validateInput('removeFromMyInnerCircle',params);
            if (msg.length == 0) {
                var prm = acedInterventionResource.removeFromMyInnerCircle(params)
                prm.$promise.then(utilsService.successCallBack(cb),utilsService.errorCallBack(cb));
            } else {
                cb(msg,null)
            }
        },

        postSupportTicket : function(params,cb) {
            var msg = utilsService.validateInput('postSupportTicket',params);
            if (msg.length == 0) {
                var prm = acedInterventionResource.postSupportTicket({postSupportTicket:params});
                prm.$promise.then(utilsService.successCallBack(cb),utilsService.errorCallBack(cb));
            } else {
                cb(msg,null)
            }
        },
        deleteAccount : function(params,cb) {
            var msg = utilsService.validateInput('deleteAccount',params);
            if (msg.length == 0) {
                var prm = acedInterventionResource.deleteAccount(params);
                prm.$promise.then(utilsService.successCallBack(cb),utilsService.errorCallBack(cb));
            } else {
                cb(msg,null);
            }
        }
    }
}

angular.module('acedIntervention.services').factory('accountService',['acedInterventionResource','utilsService',accountService]);

