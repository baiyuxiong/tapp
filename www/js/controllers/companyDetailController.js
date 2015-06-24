/**
 * Created by baiyuxiong on 15/6/15.
 */
angular.module('track.companyDetailController', ['localstorage', 'track.companyService', 'comm'])

    .controller('CompanyDetailCtrl', function ($scope, $state, s, User, $cordovaToast, f, Companies,$stateParams,$cordovaToast) {
        $scope.companyId = $stateParams.companyId;
        Companies.detail($stateParams.companyId)
            .success(function (data, status, headers, config) {
                if (data.code == 200) {
                    $scope.companyDetail = data.data;
                }
                else {
                    $cordovaToast.showLongBottom(data.message);
                }
            }).
            error(function (data, status, headers, config) {
                $cordovaToast.showLongBottom("异常，请检查网络或联系管理员")
            });
    });