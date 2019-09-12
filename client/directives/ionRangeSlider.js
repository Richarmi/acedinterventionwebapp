/*
 directive to invoke the ion range slider
 */
angular.module('acedIntervention.directives').directive('ionRangeSlider', function() {
    return {
        restrict: 'EA',
        scope:{min:'@',
            max:'@',
            type:'@sliderType',
            from:'=',
            to:'=',
            disable:'=',
            grid_snap:'=',
            grid:'@',
            prefix:'@',
            maxPostfix:'@',
            postfix:'@',
            onFinish:'='
        },
        template:'<input type="text"/>',
        replace:true,
        controller: function ($scope,$element) {
            var postfix = $scope.postfix || ' ';
            $($element).ionRangeSlider({
                min: $scope.min,
                max: $scope.max,
                type: $scope.type,
                from: $scope.from,
                to:$scope.to,
                disable:$scope.disable || false,
                grid_snap:$scope.grid_snap,
                grid:$scope.grid,
                prefix: $scope.prefix || '',
                maxPostfix: $scope.maxPostfix || '',
                postfix:" "+postfix,
                forceEdges:true,
                onFinish:function(data) {
                    $scope.onFinish(data);
                }
            });

            $scope.$on('$destroy',$scope.destroy);
        }
    }
});