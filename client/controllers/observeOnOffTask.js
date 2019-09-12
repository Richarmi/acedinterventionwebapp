
var observeOnOffTaskController = function($scope,studentService,utilsService,$rootScope) {
    var taskDataRecords = [],params,taskInterval;
    $rootScope.selectedAccountId = '3738973897983eihvov789h';
    $rootScope.selectedLocation = 'Room 101';
    // inits a taskDataItem
    function taskDataItem() {
        return {
            onTask: {
                active: {
                    student: false,
                    peer: false
                },
                passive: {
                    student: false,
                    peer: false
                }
            },
            offTask: {
                motor: {
                    student: false,
                    peer: false
                },
                verbal: {
                    student: false,
                    peer: false
                },
                passive: {
                    student: false,
                    peer: false
                }
            }
        }
    }

    $scope.taskDataItem = new taskDataItem();
    $scope.enableObservation = false;

    $scope.intervalManagerConfig = {
        enableObservation: $scope.enableObservation,
        intervalSet: false
    }

    $scope.$on('taskObservation-intervalSet', function(evt,interval){
        taskInterval = interval;
    });
    // listener for completion of timer
    $scope.$on('intervalManager-intervalComplete', function () {
        console.log($scope.taskDataItem);
        taskDataRecords.push($scope.taskDataItem);
        $scope.taskDataItem = new taskDataItem();
    });

    // listener for start of observation by user
    $scope.$on('observationManager-timerStarted', function (evt) {
        // user has started observation enable all buttons
        $scope.enableObservation = true;
        // trigger event to intervalManager to start time
        $scope.$broadcast('taskObservation-timer-started');
    });

    // listener for end of observation by user
    $scope.$on('observationManager-timerStopped', function (evt, data) {
        console.log('event received');
        console.log(data);

        // trigger event to intervalManager to stop
        $scope.$broadcast('taskObservation-timer-stopped');


        // save the records in the cloud
        params = {
            accountId:$rootScope.selectedAccountId,
            location:$rootScope.selectedLocation,
            totalObservationTime:data.millis,
            taskInterval:taskInterval,
            taskDataRecords:taskDataRecords
        };
        console.log(params);

        studentService.postTaskObservation(params,function(err,validationError,results){
            if (err) {
                // throw error
                utilsService.logger('error',err);
            } else if (validationError) {
                utilsService.logger('error',validationError);
            } else {
                // close modal
                $rootScope.goTo('student.manage.dashboard');
            }
        });

    });
}

angular.module('acedIntervention.controllers').controller('observeOnOffTaskController',['$scope','studentService','utilsService','$rootScope',observeOnOffTaskController]);