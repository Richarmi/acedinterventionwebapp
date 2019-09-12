
var observeAbcController = function($scope,studentService,utilsService,$rootScope) {
    $rootScope.selectedAccountId = '3738973897983eihvov789h';
    $rootScope.selectedLocation = 'Room 101';
    $scope.enableObservation = false;
    var params,abcItems;abcRecords=[]
    params = {studentId:$rootScope.selectedAccountId};
    studentService.listAbcs(params,function(err,validationError,results){
        if (err) {
            // throw error
            utilsService.logger('error',err);
        } else if (validationError) {
            utilsService.logger('error',validationError);
        } else {
            abcItems = results.abcItems;
            $scope.abcItems = angular.copy(abcItems)
        }
    });

    // format of each abc record
    //[b,a,c]
    $scope.recordABC = function () {
        var abcRecord={a:[],b:"",c:[]};
        console.log($scope.abcItems.abcBehaviors);
        _.each($scope.abcItems.abcBehaviors,function(behavior){
            if (behavior.checked== "true") { // set as HTML value
                abcRecord['b'] = behavior.title
            }
        });
        _.each($scope.abcItems.abcAntecedents,function(antecedent){
            if (antecedent.checked===true) {
                abcRecord['a'].push(antecedent.title);
            }
        });
        _.each($scope.abcItems.abcConsequences,function(consequence){
            if (consequence.checked===true) {
                abcRecord['c'].push(consequence.title);
            }
        });
        if ($scope.abcItems.userTyped.abcAntecedent.checked===true) {
            abcRecord['a'].push($scope.abcItems.userTyped.abcAntecedent.title);
        }
        if ($scope.abcItems.userTyped.abcConsequence.checked===true) {
            abcRecord['c'].push($scope.abcItems.userTyped.abcConsequence.title);
        }

        abcRecords.push(abcRecord);
        console.log(abcRecords);
        $scope.abcItems = angular.copy(abcItems)
    };

    $scope.$on('observationManager-timerStarted', function (evt) {
        // user has started observation enable all buttons
        $scope.enableObservation = true;
    });

    $scope.$on('observationManager-timerStopped', function (evt, data) {
        // save the records in the cloud
        params = {
            accountId:$rootScope.selectedAccountId,
            location:$rootScope.selectedLocation,
            totalObservationTime:data.millis,
            abcRecords:abcRecords
        };
        console.log(params);

        studentService.postAbcObservation(params,function(err,validationError,results){
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

    $scope.setUserTyped = function(type){
        if (type=='a' && $scope.abcItems.userTyped.abcAntecedent.title != '') {
            $scope.abcItems.userTyped.abcAntecedent.checked = true
        }
        if (type=='a' && $scope.abcItems.userTyped.abcAntecedent.title == '') {
            $scope.abcItems.userTyped.abcAntecedent.checked = false
        }
        if (type=='c' && $scope.abcItems.userTyped.abcConsequence.title != '') {
            $scope.abcItems.userTyped.abcConsequence.checked = true
        }
        if (type=='c' && $scope.abcItems.userTyped.abcConsequence.title == '') {
            $scope.abcItems.userTyped.abcConsequence.checked = false
        }
    }
}

angular.module('acedIntervention.controllers').controller('observeAbcController',['$scope','studentService','utilsService','$rootScope',observeAbcController]);
