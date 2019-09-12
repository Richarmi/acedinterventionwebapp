/*
 * This directive manages the interval for on / off task and manages the countdown
 */
angular.module('acedIntervention.directives').directive('intervalManager', function () {
    return {
        templateUrl: 'template/intervalManager.html',
        scope: {
            intervalManagerConfig: '='
        },
        restrict: 'EA',
        controller: function ($scope) {
            var timerActive = false;
            $scope.task = {
                interval: 30
            };
            $scope.setInterval = function () {
                $scope.intervalManagerConfig.intervalSet = true;
                console.log($scope.task.interval);
                $scope.$emit('taskObservation-intervalSet', $scope.task.interval);
            };

            // when user starts observations, start the timer
            $scope.$on('taskObservation-timer-started',function(event,data){
                $scope.$broadcast('timer-start');
                timerActive = true;
            });

            $scope.$on('taskObservation-timer-stopped',function(event,data){
                timerActive = false;
                $scope.$broadcast('timer-stop');
            });

            $scope.$on('timer-stopped', function (event, data) {
                if (timerActive === true) {
                    $scope.$broadcast('timer-add-cd-seconds', $scope.task.interval);
                    $scope.$emit('intervalManager-intervalComplete', data);
                }
            });

            $scope.$on('$destroy', $scope.destroy);
        },
        link: function (scope, element, attrs, ctrl) {
        }
    }
});
