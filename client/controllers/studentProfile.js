
var studentProfileController = function($scope,$rootScope) {

    console.log(' student profile controller');

    $scope.studentProfile = {
        step : 1,
        mode:'listBehavior'
    };

    $scope.changeStep = function(step) {
        $scope.studentProfile.step = step;
    };
    $scope.setMode = function(mode) {
        $scope.studentProfile.mode = mode
    };
    $scope.saveStudentProfile = function() {
        // close modal
        $rootScope.goTo('student.manage.dashboard');
    };
    $scope.cancelStudentProfile = function() {
        // close modal
        $rootScope.goTo('student.manage.dashboard');
    };

}

angular.module('acedIntervention.controllers').controller('studentProfileController',['$scope','$rootScope',studentProfileController]);