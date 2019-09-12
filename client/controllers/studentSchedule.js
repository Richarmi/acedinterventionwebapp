
var studentScheduleController = function($scope) {
    $scope.tabs['activeTab'] = 'studentSchedule';
}

angular.module('acedIntervention.controllers').controller('studentScheduleController',['$scope',studentScheduleController]);