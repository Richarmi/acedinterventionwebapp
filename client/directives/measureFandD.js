/*
 * This directive measure and emits the frequency and duration of a behavior
 */
angular.module('acedIntervention.directives').directive('measureFAndD',['utilsService',function (utilsService) {
    return {
        templateUrl: 'template/measureFAndD.html',
        scope : {
            enableObservation : '=',
            behavior : '=',
            realTime : '='
        },
        restrict: 'EA',
        controller: function ($scope) {
            $scope.durationStarted = false;
            $scope.durationCounter = 0;
            $scope.frequencyCounter = 0;

            $scope.startDuration = function() {
                $scope.$broadcast('timer-start');
                $scope.durationStarted = true;
            };

            $scope.endDuration = function() {
                $scope.$broadcast('timer-stop');
                $scope.durationCounter++;
                $scope.durationStarted = false;
            };

            // emit that the counter changed each time the user hits + or -
            $scope.changeFrequencyCounter = function(operator) {
                if (operator=='add') $scope.frequencyCounter++;
                if (operator=='subtract') $scope.frequencyCounter--;
                var frequencyData = {
                    targetBehavior:$scope.behavior.title,
                    frequency:$scope.frequencyCounter
                };
                $scope.$emit('frequency-counterChanged',frequencyData);
            };

            // listen to event from controller to stop the timer
            $scope.$on('durationTimer-stopTimer',function(event,data){
                console.log('durationTimer-stopTimer event listener');
                // stop the timer when it has started.
                if ($scope.durationStarted === true) {
                    $scope.$broadcast('timer-stop');
                }
            });

            // listener for timer stopped event , triggered  when timer stops
            $scope.$on('timer-stopped', function (event, data){
                console.log('timer-stopped event listener');
                var durationData = {
                    targetBehavior:$scope.behavior.title,
                    duration:data.millis
                };
                $scope.$emit('durationTimer-timerStopped',durationData);
            });

            $scope.$on('$destroy', $scope.destroy);
        },
        link: function (scope, element, attrs, ctrl) {

        }
    }
}]);
