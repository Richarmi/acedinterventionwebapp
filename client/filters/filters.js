// filters for profile narrative
// parameters are the field to sort by, asc or desc, the categories to filter by
angular.module('acedIntervention.filters').
    filter('profileNarrativeFilter', function() {
        return function(items, field, reverse,narrativeFilter) {
            var filtered = [];
            angular.forEach(items, function(item,key) {
                // exclude any questions
                if (_.indexOf(narrativeFilter.categories,item.c) == -1) {
                    filtered.push(item);
                }
            });
            filtered.sort(function (a, b) {
                return (a[field] > b[field] ? 1 : -1);
            });
            if(reverse) filtered.reverse();
            return filtered;
        };
    }).
    filter('formatTS',function(){
        return function(inputTS, locale) {
            return moment.unix(inputTS).fromNow();
        }
    }).
    filter('displayZero',function(){
        return function(value) {
            return parseInt(value) >= 0 ? value : 'Inches';
        }
    })