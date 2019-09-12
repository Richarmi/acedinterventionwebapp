// this directive monitors the toggle button
angular.module('acedIntervention.directives').directive('toggleButton', function() {
    return {
        restrict: 'A',
        controller : function($scope) {
            $scope.$on('$destroy', $scope.destroy);
        },
        link: function(scope, elem, attrs) {
            $('#realTime').bootstrapToggle('off');
            $('#realTime').change(function() {
                console.log('...option set....');
                console.log($(this).prop('checked'));
                scope.$emit('toggleButton-changed',$(this).prop('checked'));
            });
        }
    };
});
