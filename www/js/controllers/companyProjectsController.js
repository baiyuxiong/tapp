/**
 * Created by baiyuxiong on 15/6/15.
 */
angular.module('track.companyProjectsController', ['localstorage', 'comm'])

    .controller('CompanyProjectsCtrl', function ($scope, $state, s, User, $cordovaToast, f, Projects,$stateParams,$cordovaToast) {
        $scope.companyId = $stateParams.companyId;
        Projects.listByCompany($stateParams.companyId)
            .success(function (data, status, headers, config) {
                if (data.code == 200) {
                    $scope.projects = data.data;
                }
                else {
                        $cordovaToast.showLongBottom(data.message);
                }
            })
            .error(function (data, status, headers, config) {
                    $cordovaToast.showLongBottom("异常，请检查网络或联系管理员")
            });
    });