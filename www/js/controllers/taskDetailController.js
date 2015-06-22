/**
 * Created by baiyuxiong on 15/6/15.
 */
angular.module('track.taskDetailController', ['localstorage', 'track.taskService', 'comm'])

    .controller('TaskDetailCtrl', function ($scope, $state, s, User, $cordovaToast, f, Tasks,$stateParams,$cordovaToast) {
        $scope.companyId = $stateParams.companyId;
        $scope.taskId = $stateParams.taskId;
        Tasks.detail($scope.companyId,$scope.taskId)
            .success(function (data, status, headers, config) {
                if (data.code == 200) {
                    $scope.taskDetail = data.data;
                    for( key in $scope.taskDetail.taskTransfers)
                    {
                        $scope.taskDetail.taskTransfers[key].assignFrUserProfile = $scope.taskDetail.taskTransferUsers[$scope.taskDetail.taskTransfers[key].assign_fr];
                        $scope.taskDetail.taskTransfers[key].assignToUserProfile = $scope.taskDetail.taskTransferUsers[$scope.taskDetail.taskTransfers[key].assign_to];
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