
var surveyController = function($scope,$rootScope) {
    $scope.viewMode = 'list';
    $scope.setViewMode = function(viewMode) {
        $scope.viewMode = viewMode;
    }

    $scope.cancelSurvey = function() {
        $rootScope.goTo('student.manage.dashboard');
    }
}


angular.module('acedIntervention.controllers').controller('surveyController',['$scope','$rootScope',surveyController]);