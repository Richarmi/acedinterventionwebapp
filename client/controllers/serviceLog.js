
var serviceLogController = function($scope,$rootScope) {

    $scope.inlineOptions = {
        minDate: new Date(),
        showWeeks: false
    };


    $scope.cancelService = function() {
        // close modal
        $rootScope.goTo('student.manage.dashboard');
    }
}

angular.module('acedIntervention.controllers').controller('serviceLogController',['$scope','$rootScope',serviceLogController]);