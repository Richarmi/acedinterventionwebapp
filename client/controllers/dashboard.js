
var dashboardController = function($scope,$timeout) {
    console.log('in dashboard...')
    $scope.tabs['activeTab'] = 'dashboard';
    console.log($scope.tabs);

    // using time out to wait for the html to be ready so the chart is drawn within the width of the container
    $timeout(function(){
        $(document).ready(function () {
            $('#chart').highcharts({
                chart: {
                    type: 'spline'
                },
                title: {
                    text: 'Negative Behaviors Over Time',
                    style:{ "color": "#333333", "fontSize": "10px",fontWeight: 'bold' }
                },
                subtitle: {
                    text: 'FRQ Data'
                },
                xAxis: {
                    categories: ['Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'Jan',
                        'Feb', 'March', 'April', 'May', 'June']},
                yAxis: {
                    title: {
                        text: 'Average FRQ Rate / Day'
                    },
                    labels: {
                        formatter: function () {
                            return this.value ;
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },
                plotOptions: {
                    spline: {
                        marker: {
                            radius: 4,
                            lineColor: '#666666',
                            lineWidth: 1
                        }
                    }
                },
                series: [{
                    name: 'Verbal Aggression',
                    marker: {
                        symbol: 'square'
                    },
                    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
                        y: 26.5,
                        name:  'New Intervention',
                        marker: {
                            symbol: 'url(http://cdn.shopify.com/s/files/1/0450/8877/t/8/assets/pin.svg?14977623644183712911)'
                        }
                    }, 23.3, 18.3, 13.9]

                }, {
                    name: 'Physical Aggression',
                    marker: {
                        symbol: 'diamond'
                    },
                    data: [{
                        y: 3.9,
                        marker: {
                            symbol: 'circle'
                        }
                    }, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6]
                }]
            });
        });
    });


}

angular.module('acedIntervention.controllers').controller('dashboardController',['$scope','$timeout',dashboardController]);