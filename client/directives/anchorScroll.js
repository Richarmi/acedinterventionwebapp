// this directive scrolls the document to the anchor specified in the directive attribute
// the element should set attribute scroll-action
angular.module('acedIntervention.directives').directive('anchorScroll', function() {
    return {
        restrict: 'A',
        controller : function($scope) {
            $scope.$on('$destroy', $scope.destroy);
        },
        link: function(scope, elem, attrs) {
            if (attrs['scrollAction'] == 'click') {
                return elem.bind('click', function() {
                    var el;
                    el = document.getElementById(attrs['anchorScroll']);
                    return el.scrollIntoView();
                });
            }
        }
    };
});
