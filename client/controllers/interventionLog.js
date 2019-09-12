
var interventionLogController = function($scope,$rootScope) {

    $scope.inlineOptions = {
        minDate: new Date(),
        showWeeks: false
    };

    $scope.cancelIntervention = function() {
        // close modal
        $rootScope.goTo('student.manage.dashboard');
    }
}

angular.module('acedIntervention.controllers').controller('interventionLogController',['$scope','$rootScope',interventionLogController]);