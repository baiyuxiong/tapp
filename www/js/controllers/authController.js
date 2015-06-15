angular.module('track.authController', ['ngCordova','track.authService', 'localstorage'])

    .controller('AppCtrl', function ($scope, $rootScope, $ionicModal, $state, Auth, s, $cordovaToast) {

        if (!Auth.isLoggedIn()) {
            $state.go("app");
        }
        /**
         * 初始化登录弹窗
         */
        $ionicModal.fromTemplateUrl('templates/auth/login.html',
            {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.loginModal = modal;
            });

        //open login
        $scope.openLoginModal = function () {
            $scope.loginModal.show();
        };
        //close login
        $scope.closeLoginModal = function () {
            $scope.loginModal.hide();
        };


        //初始化注册弹窗
        $ionicModal.fromTemplateUrl('templates/auth/reg.html',
            {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.regModal = modal;
            });

        //open login
        $scope.openRegModal = function () {
            $scope.regModal.show();
        };
        //close login
        $scope.closeRegModal = function () {
            $scope.regModal.hide();
        };

        $scope.loginData = {'username': '13456789012', 'password': '12345678'};
        $scope.doLogin = function () {
            Auth.login($scope.loginData.username, $scope.loginData.password)
                .success(function (data, status, headers, config) {
                    if (data.code == 200) {
                        s.set('token', data.data.token);
                        s.set('userId', data.data.id);
                        $scope.closeLoginModal();
                        $state.go("tab.todo");
                    }
                    else {
                        //chrome不能工作，手机上可以
                        $cordovaToast.showLongBottom(data.message)
                    }
                }).
                error(function (data, status, headers, config) {
                    $cordovaToast.showLongBottom("异常，请检查网络或联系管理员")
                });
        }

        //$state.go("tab.todo");
    });