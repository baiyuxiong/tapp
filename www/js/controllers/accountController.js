/**
 * Created by baiyuxiong on 15/6/15.
 */
angular.module('track.accountController', ['localstorage', 'track.userService','comm'])

    .controller('AccountCtrl', function ($scope, $state, s, User,$cordovaToast,f) {
        $scope.settings = {
            enableFriends: false
        };
        $scope.doLogout = function () {
            s.set('token', '');
            s.set('userId', '');
            $state.go("app");
        }

        User.me()
            .success(function (data, status, headers, config) {
                if (data.code == 200) {
                    $scope.user = data.data;
                }
                else {
                    $cordovaToast.showLongBottom(data.message)
                }
            }).
            error(function (data, status, headers, config) {
                $cordovaToast.showLongBottom("异常，请检查网络或联系管理员")
            });
    })
    .controller('EditProfileCtrl', function ($scope, $state, s, User,$cordovaToast,f) {
        User.me()
            .success(function (data, status, headers, config) {
                if (data.code == 200) {
                    $scope.user = data.data;
                }
                else {
                    $cordovaToast.showLongBottom(data.message)
                }
            }).
            error(function (data, status, headers, config) {
                $cordovaToast.showLongBottom("异常，请检查网络或联系管理员")
            });
    })
    .controller('EditPasswordCtrl', function ($scope, $state, s, User,$cordovaToast,f) {
    })
    .controller('HelpCtrl', function ($scope, $state, s, User,$cordovaToast,f) {
    });