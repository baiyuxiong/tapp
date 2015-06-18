/**
 * Created by baiyuxiong on 15/6/15.
 */
angular.module('track.addProjectController', ['localstorage', 'track.userService', 'comm'])

    .controller('AddProjectCtrl', function ($scope, Companies, s, $cordovaToast, f) {

        /**
         * 团队列表
         */
        Companies.list()
            .success(function (data, status, headers, config) {
                if (data.code == 200) {
                    $scope.companies = data.data;
                    $scope.companyId = $scope.companies[0].id;
                }
                else {
                    if (!toastShowed) {
                        $cordovaToast.showLongBottom(data.message);
                        toastShowed = true;
                    }
                }

            })
            .error(function (data, status, headers, config) {
                if (!toastShowed) {
                    $cordovaToast.showLongBottom("异常，请检查网络或联系管理员")
                    toastShowed = false;
                }
            });
    });