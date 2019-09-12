/*
 * This directive manages the start and stop of observation
 */
angular.module('acedIntervention.directives').directive('observationManager',function ($rootScope) {
    return {
        templateUrl: 'template/observationManager.html',
        scope:{

        },
        restrict: 'EA',
        controller: function ($scope) {
            $scope.observationStarted = false;

            $scope.startObservation = function() {
                $scope.$broadcast('timer-start');
                $scope.observationStarted = true;
                $scope.$emit('observationManager-timerStarted');
            };

            $scope.endObservation = function() {
                $scope.$broadcast('timer-stop');
                $scope.observationStarted = false;
            };

            $scope.$on('timer-stopped', function (event, data){
                $scope.$emit('observationManager-timerStopped',data);
            });

            $scope.cancelObservation = function() {
                console.log($rootScope.previousState);
                $rootScope.goTo($rootScope.previousState.state.name,$rootScope.previousState.params)
            }
            $scope.$on('$destroy', $scope.destroy);
        },
        link: function (scope, element, attrs, ctrl) {
        }
    }
});
