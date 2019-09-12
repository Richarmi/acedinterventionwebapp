module.exports = {
    webAppConfigs:{
        defaultStateForLoggedInUser : '/dtpm/date',
        defaultStateForNonLoggedInUser : '/lndm',
        states :[
            {
                name:'landing',
                url:'/',
                templateUrl:'template/landing.html',
                controller:'landingController',
                secure:false,
                isModal:false
            },
            {
                name:'student',
                abstract:true,
                url:'/student',
                templateUrl:'template/securedTemplate.html',
                secured:false,
                isModal:false
            },
            {
                name:'student.select',
                url:'/select',
                views:{
                    'header':{
                        templateUrl: 'template/header.html',
                        controller:'headerController'
                    },
                    'content@student':{
                        templateUrl: 'template/selectStudent.html',
                        controller:'selectStudentController'
                    },
                    'footer':{
                        templateUrl: 'template/footer.html',
                        controller:'footerController'
                    }

                },
                secured:false,
                isModal:false
            },
            {
                name:'student.manage',
                url:'/manage',
                views:{
                    'header':{
                        templateUrl: 'template/header.html',
                        controller:'headerController'
                    },
                    'content@student':{
                        templateUrl: 'template/manageStudent.html',
                        controller:'manageStudentController'
                    },
                    'footer':{
                        templateUrl: 'template/footer.html',
                        controller:'footerController'
                    }

                },
                secured:false,
                isModal:false
            },
            {
                name:'student.manage.dashboard',
                url:'/dashboard',
                views:{
                    'dashboard@student.manage':{
                        templateUrl: 'template/dashboard.html',
                        controller:'dashboardController'
                    }
                },
                secured:false,
                isModal:false
            },
            {
                name:'student.manage.prepareFba',
                url:'/prepareFba',
                views:{
                    'prepareFba@student.manage':{
                        templateUrl: 'template/prepareFba.html',
                        controller:'prepareFbaController'
                    }
                },
                secured:false,
                isModal:false
            },
            {
                name:'student.manage.prepareBip',
                url:'/prepareBip',
                views:{
                    'prepareBip@student.manage':{
                        templateUrl: 'template/prepareBip.html',
                        controller:'prepareBipController'
                    }
                },
                secured:false,
                isModal:false
            },
            {
                name:'student.manage.studentSchedule',
                url:'/studentSchedule',
                views:{
                    'studentSchedule@student.manage':{
                        templateUrl: 'template/studentSchedule.html',
                        controller:'studentScheduleController'
                    }
                },
                secured:false,
                isModal:false
            },
            {
                name:'student.manage.profile',
                url:'/profile',
                templateUrl: 'template/studentProfile.html',
                controller:'studentProfileController',
                secured:false,
                isModal:true
            },
            {
                name:'student.manage.observeFAndD',
                url:'/observeFAndD',
                templateUrl: 'template/observeFAndD.html',
                controller:'observeFAndDController',
                secured:false,
                isModal:true
            },
            {
                name:'student.manage.observeAbc',
                url:'/observeAbc',
                templateUrl: 'template/observeAbc.html',
                controller:'observeAbcController',
                secured:false,
                isModal:true
            },
            {
                name:'student.manage.observeOnOffTask',
                url:'/observeOnOffTask',
                templateUrl: 'template/observeOnOffTask.html',
                controller:'observeOnOffTaskController',
                secured:false,
                isModal:true
            },
            {
                name:'student.manage.dailyBehaviorSheet',
                url:'/dailyBehaviorSheet',
                templateUrl: 'template/dailyBehaviorSheet.html',
                controller:'dailyBehaviorSheetController',
                secured:false,
                isModal:true
            },
            {
                name:'student.manage.survey',
                url:'/survey',
                templateUrl: 'template/survey.html',
                controller:'surveyController',
                secured:false,
                isModal:true
            },
            {
                name:'student.manage.interventionLog',
                url:'/interventionLog',
                templateUrl: 'template/interventionLog.html',
                controller:'interventionLogController',
                secured:false,
                isModal:true
            },
            {
                name:'student.manage.serviceLog',
                url:'/serviceLog',
                templateUrl: 'template/serviceLog.html',
                controller:'serviceLogController',
                secured:false,
                isModal:true
            },
            {
                name:'account',
                abstract:true,
                url:'/account',
                templateUrl:'template/securedTemplate.html',
                secured:false,
                isModal:false
            },
            {
                name:'account.select',
                url:'/select',
                views:{
                    'header':{
                        templateUrl: 'template/header.html',
                        controller:'headerController'
                    },
                    'content@account':{
                        templateUrl: 'template/selectAccount.html',
                        controller:'selectAccountController'
                    },
                    'footer':{
                        templateUrl: 'template/footer.html',
                        controller:'footerController'
                    }

                },
                secured:false,
                isModal:false
            },
            {
                name:'account.manage',
                url:'/manage',
                views:{
                    'header':{
                        templateUrl: 'template/header.html',
                        controller:'headerController'
                    },
                    'content@account':{
                        templateUrl: 'template/manageAccount.html',
                        controller:'manageAccountController'
                    },
                    'footer':{
                        templateUrl: 'template/footer.html',
                        controller:'footerController'
                    }

                },
                secured:false,
                isModal:false
            },
            {
                name:'school',
                abstract:true,
                url:'/school',
                templateUrl:'template/securedTemplate.html',
                secured:false,
                isModal:false
            },
            {
                name:'school.resources',
                url:'/resources',
                views:{
                    'header':{
                        templateUrl: 'template/header.html',
                        controller:'headerController'
                    },
                    'content@school':{
                        templateUrl: 'template/resources.html',
                        controller:'resourcesController'
                    },
                    'footer':{
                        templateUrl: 'template/footer.html',
                        controller:'footerController'
                    }

                },
                secured:false,
                isModal:false
            },
            {
                name:'school.messages',
                url:'/messages',
                views:{
                    'header':{
                        templateUrl: 'template/header.html',
                        controller:'headerController'
                    },
                    'content@school':{
                        templateUrl: 'template/message.html',
                        controller:'messagesController'
                    },
                    'footer':{
                        templateUrl: 'template/footer.html',
                        controller:'footerController'
                    }

                },
                secured:false,
                isModal:false
            },
            {
                name:'my',
                abstract:true,
                url:'/my',
                templateUrl:'template/securedTemplate.html',
                secured:false,
                isModal:false
            },
            {
                name:'my.shortcuts',
                url:'/shortcuts',
                views:{
                    'header':{
                        templateUrl: 'template/header.html',
                        controller:'headerController'
                    },
                    'content@my':{
                        templateUrl: 'template/myShortcuts.html',
                        controller:'myShortcutsController'
                    },
                    'footer':{
                        templateUrl: 'template/footer.html',
                        controller:'footerController'
                    }

                },
                secured:false,
                isModal:false
            },
            {
                name:'my.profile',
                url:'/profile',
                views:{
                    'header':{
                        templateUrl: 'template/header.html',
                        controller:'headerController'
                    },
                    'content@my':{
                        templateUrl: 'template/myProfile.html',
                        controller:'myProfileController'
                    },
                    'footer':{
                        templateUrl: 'template/footer.html',
                        controller:'footerController'
                    }

                },
                secured:false,
                isModal:false
            }
        ]

    }
};