
var manageStudentController = function($scope,$state,$rootScope) {

    // set by the respective tabs
    $scope.tabs = {
        activeTab:''
    };

    // set it to dashboard if the state is student.manage as this is the default state for this page
    if ($state.is('student.manage')) {
        console.log('setting state to dashboard');
        $state.go('student.manage.dashboard');
        $scope.tabs = {
            activeTab : 'dashboard'
        };
    }

};

angular.module('acedIntervention.controllers').controller('manageStudentController',['$scope','$state','$rootScope',manageStudentController]);