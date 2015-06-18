// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('track', ['ionic', 'track.authController', 'track.todoController', 'track.allController', 'track.accountController',
    'track.addTaskController', 'track.addProjectController', 'track.addCompanyController', 'comm'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })

    //http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/
    .config(function ($httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        var param = function (obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function (data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }]
    })
    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('app', {
                url: '/app',
                cache: false,
                templateUrl: 'templates/app.html',
                controller: 'AppCtrl'
            })

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // Each tab has its own nav history stack:

            .state('tab.todo', {
                url: '/todo',
                cache: false,
                views: {
                    'tab-todo': {
                        templateUrl: 'templates/todo/tabTodo.html',
                        controller: 'TodoCtrl'
                    }
                }
            })

            .state('tab.todo-addTask', {
                url: '/todo/addTask',
                views: {
                    'tab-todo': {
                        templateUrl: 'templates/todo/addTask.html',
                        controller: 'AddTaskCtrl'
                    }
                }
            })

            .state('tab.todo-addProject', {
                url: '/todo/addProject',
                views: {
                    'tab-todo': {
                        templateUrl: 'templates/todo/addProject.html',
                        controller: 'AddProjectCtrl'
                    }
                }
            })

            .state('tab.todo-addCompany', {
                url: '/todo/addCompany',
                views: {
                    'tab-todo': {
                        templateUrl: 'templates/todo/addCompany.html',
                        controller: 'AddCompanyCtrl'
                    }
                }
            })

            .state('tab.all', {
                url: '/all',
                views: {
                    'tab-all': {
                        templateUrl: 'templates/all/tabAll.html',
                        controller: 'AllCtrl'
                    }
                }
            })

            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/tabAccount.html',
                        controller: 'AccountCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app');

    });
