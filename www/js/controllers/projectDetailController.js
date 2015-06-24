/**
 * Created by baiyuxiong on 15/6/15.
 */
angular.module('track.projectDetailController', ['localstorage', 'comm'])

    .controller('ProjectDetailCtrl', function ($scope, $state, s, User, $cordovaToast, f, Projects,$stateParams,$cordovaToast) {
        $scope.companyId = $stateParams.companyId;
        Projects.detail($stateParams.companyId,$stateParams.projectId)
            .success(function (data, status, headers, config) {
                if (data.code == 200) {
                    $scope.projectDetail = data.data;
                    $scope.taskCount =$scope.projectDetail.tasks.length;

                    for( key in $scope.projectDetail.tasks)
                    {
                        $scope.projectDetail.tasks[key].ownerProfile = $scope.projectDetail.userProfiles[$scope.projectDetail.tasks[key].owner_id];
                        $scope.projectDetail.tasks[key].inChargeUserProfile = $scope.projectDetail.userProfiles[$scope.projectDetail.tasks[key].in_charge_user_id];
                    }
                }
                else {
                    $cordovaToast.showLongBottom(data.message);
                }
            }).
            error(function (data, status, headers, config) {
                $cordovaToast.showLongBottom("异常，请检查网络或联系管理员")
            });
    });