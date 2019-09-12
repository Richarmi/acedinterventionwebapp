
// declare all the global modules here. Each factory should register itself with the respective module.
// example directives should register itself with acedIntervention.directives
angular.module('acedIntervention.directives', []);
angular.module('acedIntervention.services', []);
angular.module('acedIntervention.resources', ['ngResource']);
angular.module('acedIntervention.controllers',[]);
angular.module('acedIntervention.filters', []);
angular.module('acedIntervention.templates', []);

// array of modules to register with the main app
var modulesList = [
    'ngSanitize',
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngMessages',
    'ui.bootstrap',
    'ui.router',
    'ngFileUpload',
    'timer',
    'acedIntervention.controllers',
    'acedIntervention.directives',
    'acedIntervention.services',
    'acedIntervention.filters',
    'acedIntervention.resources',
    'acedIntervention.templates'
];

// configure the resources list into acedIntervention.resources
var acedInterventionResource = function($resource) {
    return $resource('/',{},acedInterventionGlobals.resourceList)
}
angular.module('acedIntervention.resources').factory('acedInterventionResource', ['$resource',acedInterventionResource]);

// main angular module
angular.module('acedIntervention', modulesList)
    .config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
        _.each(acedInterventionGlobals.states,function(state){
            console.log(state);
            $stateProvider.state(state)
        });
        // default route
        $urlRouterProvider.otherwise('/');
    }])
    .config(['$httpProvider',function($httpProvider) {
        $httpProvider.defaults.useXDomain = true
        delete $httpProvider.defaults.headers.common['X.Requested-With'];
        $httpProvider.interceptors.push('interceptorService');
    }])
    /*
    .config(['$provide',function($provide){
        // override the default tabset and tabs template
        $provide.decorator('tabsetDirective', function($delegate) {
            var directive = $delegate[0];

            directive.templateUrl = "tabset.tpl.html";

            return $delegate;
        });
    }])
    .config(['$provide',function($provide){
        // override the default tabset and tabs template
        $provide.decorator('tabDirective', function($delegate) {
            var directive = $delegate[0];

            directive.templateUrl = "tab.tpl.html";

            return $delegate;
        });
    }])
    */
    .run(['$rootScope','utilsService','$location','$window','logService','$state',function($rootScope,utilsService,$location,$window,logService,$state) {
        // copy the routes list to rootscope (only the route and not other info

        // copy the constraints to the rootScope
        $rootScope.constraints = {}
        _.each(acedInterventionGlobals.resourceList, function(value,key){
            $rootScope.constraints[key] = value['constraints']
        });

        // set the base url
        $rootScope.baseUrl = acedInterventionGlobals.baseUrl;
        $rootScope.version = acedInterventionGlobals.version;
        $rootScope.severErrorOccurred = false;
        $rootScope.displaySeverErrorMessage = false;
        // set the rootScope for variables
        if (acedInterventionGlobals.userLoggedIn === true) {
            $rootScope.userLoggedIn = true;
            $rootScope.account = acedInterventionGlobals.account;
            $rootScope.cloudinaryConfigs = acedInterventionGlobals.cloudinaryConfigs;
        } else {
            $rootScope.userLoggedIn = false;

        };
        $rootScope.clientDebug = acedInterventionGlobals.clientDebug;



        // global array of modal instances
        $rootScope.modalInstances = {}

        // global functions for opening and closing modals
        // modal configs format
        /*
         templateUrl : 'dtpp-picture-gallery-modal.html',
         size : 'sm',
         scope: $scope,
         backdrop : 'static',
         controller : function(){},
         modalName: ''
         */
        $rootScope.openModal = function(modalConfig) {
            $rootScope.modalInstances[modalConfig.modalName] = utilsService.openModal(modalConfig)
        }

        $rootScope.closeModal = function() {
            // close modals if they are open
            _.each($rootScope.modalInstances,function(modal){
                utilsService.closeModal(modal);
            });
        }

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
            //event.preventDefault();
            if (toState.isModal === true) {
                var modal = {
                    animation : true,
                    templateUrl : toState.templateUrl,
                    size : 'lg',
                    backdrop:'static',
                    keyboard: false, // to block 'esc' key from closing modal
                    controller: toState.controller
                }
                console.log('opening modal');
                $rootScope.openModal(modal);
            } else {
                $rootScope.closeModal(modal);
            }
            // store the previous state
            $rootScope.previousState = {
                state : fromState,
                params : fromParams
            };
                // transitionTo() promise will be rejected with
                // a 'transition prevented' error
        });

        // for each route change set the page title
        $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
            $rootScope.pageTitle = current.title;
            // if the route has datm, mmkm, cntm then display the in beta message
            if (current.title == 'Matchmake' || current.title == 'Date' || current.title == 'Side-by-side' || current.title == 'Connect' ) {
                $location.path('/dtpm').replace();
                $rootScope.displayInBetaMessage = true;
            }
        });


        //*** Manages redirection after sign in ******
        // **** for links in email ****
        // if the user is requesting a path that requires a login, but is not logged in, save that path in the cookie
        // the user will then be redirected after login
        if ($rootScope.userLoggedIn === false) {
            var isValidRoute = false
            var routeFirstPath = $location.path().split('/')[1];
            if ($location.path()) {
                _.each($rootScope.routesList,function(item) {
                    if (routeFirstPath == item.split('/')[1]) {
                        isValidRoute = true
                    }
                });
                if (!isValidRoute) {
                    // set the cookie with the value
                    utilsService.setCookie('pathHistory.lastRequestedPath',$location.path());
                    utilsService.setCookie('pathHistory.landingPageView','signin');
                }
            }
        } else {
            var lastRequestedPath = utilsService.getCookie('pathHistory.lastRequestedPath');
            if (lastRequestedPath) {
                utilsService.removeCookie('pathHistory.lastRequestedPath');
                $location.path(lastRequestedPath).replace();
            }
        }

        // initiate the handling for exception
        $rootScope.$on('event::exception-occurred', function(event,response) {
            $rootScope.displaySeverErrorMessage = true;
            if ($rootScope.severErrorOccurred === false) {
                logService.makeLog({makeLog:{log:response}},function(err,response){
                    $rootScope.severErrorOccurred = true;
                });
            }
            $rootScope.severErrorOccurred = true;
        });

        $rootScope.goTo = function(state,params) {
            $state.go(state,params,{notify:true,location:true})
        }

        // this is to reload the landing page (full reload) to handle the bug with fb login
        $rootScope.reloadLanding = function(mode) {
            utilsService.setCookie('pathHistory.landingPageView',mode);
            $window.location  = '/'
        }
    }]);
