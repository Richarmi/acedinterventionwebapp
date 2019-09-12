
var dailyBehaviorSheetController = function($scope,$rootScope) {
    console.log('Daily Behavior Sheet Controller');
    $scope.sliderSet = function(sliderObj) {
        console.log(sliderObj)
    }

    $scope.cancelDailyBehaviorSheet = function() {
        $rootScope.goTo($rootScope.previousState.state.name,$rootScope.previousState.params)
    }
}

angular.module('acedIntervention.controllers').controller('dailyBehaviorSheetController',['$scope','$rootScope',dailyBehaviorSheetController]);