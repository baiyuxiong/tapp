/**
 * Created by baiyuxiong on 15/6/15.
 */
angular.module('track.joinCompanyController', ["ngCordova", 'localstorage', 'track.userService', 'comm'])

    .controller('JoinCompanyCtrl', function ($scope,$location,CompanyUsers,$cordovaToast) {
        $scope.companyName = "";
        $scope.doJoinCompany = function(){
            CompanyUsers.addByCompanyName($scope.companyName)
                .success(function (data, status, headers, config) {
                    if (data.code == 200) {
                    }
                    else {
                        $cordovaToast.showLongBottom(data.message);
                    }
                }).
                error(function (data, status, headers, config) {
                    $cordovaToast.showLongBottom("异常，请检查网络或联系管理员")
                });
        };
    });