
var prepareFbaController = function($scope) {
    $scope.tabs['activeTab'] = 'prepareFba';
    console.log('in preparefba scope....');
    console.log($scope.tabs);
}

angular.module('acedIntervention.controllers').controller('prepareFbaController',['$scope',prepareFbaController]);