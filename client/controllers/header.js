
var headerController = function($scope,$state) {

    console.log('header controller');
    $scope.$state = $state;
    $scope.status = {
        isOpen: false
    };
}

angular.module('acedIntervention.controllers').controller('headerController',['$scope','$state',headerController]);