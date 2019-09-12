
var observeFAndDController = function($scope,studentService,utilsService,$timeout,$rootScope) {
    $rootScope.selectedAccountId = '3738973897983eihvov789h';
    $rootScope.selectedLocation = 'Room 101';
    $scope.enableObservation = false;
    $scope.realTime = false;
    $scope.realTimeOptionSet = false;

    var params,behaviorMeasurementArray = [];
    params = {studentId:$rootScope.selectedAccountId};
    studentService.listTargetBehaviors(params,function(err,validationError,results){
        if (err) {
            // throw error
            utilsService.logger('error',err);
        } else if (validationError) {
            utilsService.logger('error',validationError);
        } else {
            $scope.behaviors = results.behaviors;
            _.each($scope.behaviors,function(behavior){
                behaviorMeasurementArray.push({
                    behavior:behavior.title,
                    frequency:0,
                    duration:[]
                });
            });
        }
    });

    $scope.$on('observationManager-timerStopped', function (evt, data) {
        console.log('observationManager-timerStopped event listener');
        console.log(data);
        $scope.enableObservation = false;
        // if any timers are running, stop it.
        $scope.$broadcast('durationTimer-stopTimer');
        // create one record for each behavior
        //{timestamp,accountId,totalObservationTime,targetBehavior,duration:[duration],frequency:9}

        $timeout(function(){
            var behaviorRecords=[];
            console.log(behaviorMeasurementArray);
            _.each(behaviorMeasurementArray,function(item){
                if (item.frequency > 0 || item.duration.length > 0) {
                    var record = {
                        accountId:$rootScope.selectedAccountId,
                        location:$rootScope.selectedLocation,
                        totalObservationTime:data.millis,
                        targetBehavior:item.behavior,
                        frequency:item.frequency,
                        duration:item.duration
                    }
                    behaviorRecords.push(record);
                }
            });

            studentService.postFrequencyObservation(behaviorRecords,function(err,validationError,results){
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
        },1000);
    });

    $scope.$on('observationManager-timerStarted', function (evt) {
        // user has started observation enable all buttons
        $scope.enableObservation = true;
    });


    $scope.$on('durationTimer-timerStopped', function (evt,durationData) {
        console.log(durationData);
        _.each(behaviorMeasurementArray,function(item){
            if (item.behavior == durationData.targetBehavior) {
                item.duration.push(durationData.duration)
            }
        });
    });

    $scope.$on('frequency-counterChanged', function (evt,frequencyData) {
        console.log(frequencyData);
        _.each(behaviorMeasurementArray,function(item){
            if (item.behavior == frequencyData.targetBehavior) {
                item.frequency = frequencyData.frequency
            }
        });

    });

    $scope.$on('toggleButton-changed',function(evt,realTime) {
        console.log('toggleButton-changed... event listener');
        $scope.realTime = realTime;
        $scope.realTimeOptionSet = true;
        console.log('realTime...'+$scope.realTime);
        console.log('realTimeOptionSet...'+$scope.realTimeOptionSet);
    });

    console.log($scope);
}


angular.module('acedIntervention.controllers').controller('observeFAndDController',['$scope','studentService','utilsService','$timeout','$rootScope',observeFAndDController]);

