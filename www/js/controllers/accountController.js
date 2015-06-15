/**
 * Created by baiyuxiong on 15/6/15.
 */
angular.module('track.accountController', ['localstorage'])

    .controller('AccountCtrl', function ($scope, $state, s) {
        $scope.settings = {
            enableFriends: false
        };
        $scope.doLogout = function () {
            s.set('token', '');
            s.set('userId', '');
            $state.go("app");
        }
    });