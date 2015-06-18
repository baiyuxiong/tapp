/**
 * Created by baiyuxiong on 15/6/15.
 */
angular.module('track.todoController', ['localstorage', 'track.taskService', 'track.companyService', 'track.projectService', 'ionic-datepicker', 'ion-autocomplete'])

    .controller('TodoCtrl', function ($scope, Companies, Projects, Tasks, $cordovaToast,$ionicPopover,$location) {
        var toastShowed = false;
        Tasks.listTodo()
            .success(function (data, status, headers, config) {
                if (data.code == 200) {
                    var tasks = {}
                    var tasksInCharge = data.data.tasksInCharge;
                    var tasksOwnedByMe = data.data.tasksOwnedByMe;
                    var users = data.data.users;
                    var projects = data.data.projects;
                    var transfers = data.data.transfers;

                    for (x in tasksInCharge) {
                        tasksInCharge[x].rUser = users[tasksInCharge[x].owner_id];
                        tasksInCharge[x].rProject = projects[tasksInCharge[x].project_id];
                        tasksInCharge[x].rTransfer = transfers[tasksInCharge[x].latest_transfer_id];
                    }
                    tasks.tasksInCharge = tasksInCharge;

                    for (y in tasksOwnedByMe) {
                        tasksOwnedByMe[y].rUser = users[tasksOwnedByMe[y].in_charge_user_id];
                        tasksOwnedByMe[y].rProject = projects[tasksOwnedByMe[y].project_id];
                        tasksOwnedByMe[y].rTransfer = transfers[tasksOwnedByMe[y].latest_transfer_id];
                    }

                    tasks.tasksOwnedByMe = tasksOwnedByMe;
                    $scope.tasks = tasks;
                }
                else {
                    if (!toastShowed) {
                        $cordovaToast.showLongBottom(data.message);
                        toastShowed = true;
                    }

                }
            }).
            error(function (data, status, headers, config) {
                if (!toastShowed) {
                    $cordovaToast.showLongBottom("异常，请检查网络或联系管理员")
                    toastShowed = true;
                }
            });
        /**
         * 右上角菜单
         */
        $ionicPopover.fromTemplateUrl('templates/popover.html', {
            scope: $scope,
        }).then(function (popover) {
            $scope.popover = popover;
        });

        $scope.addTask = function(){
            $scope.popover.hide();
            $location.url("/tab/todo/addTask");
        };

        $scope.addProject = function(){
            $scope.popover.hide();
            $location.url("/tab/todo/addProject");
        };

        $scope.addCompany = function(){
            $scope.popover.hide();
            $location.url("/tab/todo/addCompany");
        };
    })
;