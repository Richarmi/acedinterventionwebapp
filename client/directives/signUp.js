// renders the signup template and calls the back end service for registering the user
// redirects the user to the path per con
angular.module('acedIntervention.directives').directive('signUp', function($window,$rootScope,$timeout,accountService,invitationService,utilsService) {
    return {
        restrict : 'EA',
        scope : {
            signUpConfig : '='
        },
        controller : function($scope) {
            // initialize the signUpModel
            $scope.signUpModel = {loginMethod : 'wovo'};

            var disabledField = {
                email : false
            }

            // used to disable fields so user does not edit it
            $scope.disableFields = function(field) {
                return disabledField[field]
            }

            // if the signupconfig has invitation id, get the email address and pre fill the form and disable it
            if ($scope.signUpConfig.invitationId) {
                getInvitation($scope.signUpConfig.invitationId)
            }

            function getInvitation(invitationId) {
                invitationService.getInvitationById({invitationId:invitationId},function(err,validationError,results){
                    if (err) {
                        utilsService.logger('error',err);
                    } else if (validationError) {
                        utilsService.logger('error',validationError);
                    } else {
                        if (results) {
                            $scope.signUpModel.email = results.invitationRow.email;
                            disabledField['email'] = true;
                        } else {
                            utilsService.logger('log','no results from getInvitationById');
                        }
                    }
                });
            }

            // called when user clicks on sign up
            $scope.signUpUser = function() {
                $scope.userMessage = null;
                // convert age to integer
                if ($scope.signUpModel.age) {
                    $scope.signUpModel.age = parseInt($scope.signUpModel.age);
                }
                $scope.signUpModel.invitationId = $scope.signUpConfig.invitationId;
                accountService.signUp($scope.signUpModel,function(err,validationError,results) {
                    if (err) {
                        utilsService.logger('error',err);
                        var headers = err.headers();
                        $scope.userMessage = headers['x-wovo-status'];
                    } else if (validationError) {
                        utilsService.logger('error',validationError);
                    } else {
                        if (results) {
                            $window.location = $scope.signUpConfig.redirectTo;
                            //$location.path($scope.signUpConfig.redirectTo).replace();
                        } else {
                            utilsService.logger('log','no results from signUpUser');
                        }
                    }
                });
            }

            $scope.$on('event::fbLoginComplete',function(evt,fbLoginInfo){
                if (fbLoginInfo) {
                    $scope.signUpModel.loginMethod = fbLoginInfo.loginMethod;
                    $scope.signUpModel.email = fbLoginInfo.me.email;
                    $scope.signUpModel.gender = fbLoginInfo.me.gender;
                    $scope.signUpModel.authResponse = fbLoginInfo.authResponse;
                    disabledField['email'] = true;
                    // derive age from year of birthday
                    $scope.signUpModel.age = Math.floor(moment().diff(moment(fbLoginInfo.me.birthday,"MM/DD/YYYY"),'years',true))
                    if ($scope.signUpModel.age == 0) {$scope.signUpModel.age = null}
                    $('#signUp_userName').focus();
                } else {
                    // raise error
                }
            });

            $scope.setFocusField = function(field) {
                $scope.signUpModel.currentFocus = field
            }

            $scope.$on('$destroy', $scope.destroy);
        },
        link: function(scope,element) {
            scope.userMessage = null
            utilsService.appendTemplate(scope,element,scope.signUpConfig.templateUrl);
        }
    }
});

/*

 */