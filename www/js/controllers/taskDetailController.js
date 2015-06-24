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

                    myUserId = s.get('userId');
                    $scope.taskDetail = data.data;
                    for( key in $scope.taskDetail.taskTransfers)
                    {
                        assignFrUserProfile = $scope.taskDetail.taskTransferUsers[$scope.taskDetail.taskTransfers[key].assign_fr];
                        assignToUserProfile = $scope.taskDetail.taskTransferUsers[$scope.taskDetail.taskTransfers[key].assign_to];

                        if(assignFrUserProfile.user_id == myUserId)
                        {
                            assignFrUserProfile.name="我";
                        }
                        if(assignToUserProfile.user_id == myUserId)
                        {
                            assignToUserProfile.name="我";
                        }

                        $scope.taskDetail.taskTransfers[key].assignFrUserProfile = assignFrUserProfile;
                        $scope.taskDetail.taskTransfers[key].assignToUserProfile = assignToUserProfile;
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