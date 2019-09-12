// register all controllers to angular.module('acedIntervention.controllers')

// landing page controller
var landingController = function($scope,$rootScope,$stateParams,$window,utilsService) {

    // check if user is signed in, if so redirect them to their profile page
    if ($rootScope.userLoggedIn === true) {
        $window.location = '/'
    }

    var landingPageView = utilsService.getCookie('pathHistory.landingPageView');

    if (landingPageView) {
        utilsService.removeCookie('pathHistory.landingPageView')
    }

    // if not cookie take from route params
    if (!landingPageView) {
        landingPageView = $stateParams.landingPageView;
        if (!landingPageView) {
            landingPageView = 'signup' // default
        }
    }

    (landingPageView == 'signup' ? $scope.landingPageView = 'signUp' : $scope.landingPageView = 'signIn')


    var invitationId = $stateParams.invitationId || null;

    $scope.signUpConfig = {
        redirectTo : $rootScope.baseUrl+'/#/vrfm/thanks',
        templateUrl : $rootScope.templatePath+'signUp.html',
        invitationId :invitationId
    };

    $scope.signInConfig = {
        templateUrl : $rootScope.templatePath+'signIn.html',
        redirectTo : '/'
    };

    $scope.isMobile = function() {
        return utilsService.isMobile();
    }


};
angular.module('acedIntervention.controllers').controller('landingController',['$scope','$rootScope','$stateParams','$window','utilsService',landingController]);