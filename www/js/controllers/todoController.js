/**
 * Created by baiyuxiong on 15/6/15.
 */
angular.module('track.todoController', ['localstorage', 'track.taskService', 'track.companyService', 'track.projectService', 'ionic-datepicker','ion-autocomplete'])

    .controller('TodoCtrl', function ($scope, Companies, Projects, Tasks, $cordovaToast, $ionicModal) {
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
         * 初始化添加任务弹窗
         */

        $scope.task = {}

        $ionicModal.fromTemplateUrl('templates/todo/addTask.html',
            {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.addTaskModal = modal;
            });

        //open login
        $scope.openAddTaskModal = function () {
            $scope.addTaskModal.show();
        };
        //close login
        $scope.closeAddTaskModal = function () {
            $scope.addTaskModal.hide();
        };

        /**
         * 优先级列表
         */
        $scope.priorityList = [
            {id: 3, name: '非常着急'},
            {id: 2, name: '一般'},
            {id: 1, name: '不着急'}
        ];
        $scope.priority = 2;

        /**
         * 指派用户列表
         */
        $scope.model = "";
        $scope.callbackValueModel = "";
        $scope.getTestItems = function (query) {
            var zoekItems = [
                {id: "1", name: "John", view: "John: "},
                {id: "2", name: "Richard", view: "Richard: "},
                {id: "3", name: "Steve", view: "Steve: "},
            ];
            var returnValue = { items: [] };
            zoekItems.forEach(function(item){
                console.log(item);
                if (item.name.indexOf(query) > -1 ){
                    returnValue.items.push(item);
                }
                else if (item.id.indexOf(query) > -1 ){
                    returnValue.items.push(item);
                }
            });
            return returnValue;
        };
        $scope.itemsClicked = function (callback) {
            $scope.callbackValueModel = callback;
        }

        /**
         * 日期选择
         */
        $scope.currentDate = new Date();
        $scope.task.deadline = "";
        $scope.datePickerCallback = function (val) {
            if (typeof(val) === 'undefined') {
                console.log('Date not selected');
            } else {
                var d = new Date(val);
                $scope.task.deadline = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
                console.log('Selected date is : ', val);
            }
        };

        /**
         * 团队列表
         */
        Companies.list()
            .success(function (data, status, headers, config) {
                if (data.code == 200) {
                    $scope.companies = data.data;
                    $scope.companyId = $scope.companies[0].id;
                    projectList($scope.companyId)
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

        /**
         * 获取项目列表
         */
        var projectList = function (companyId) {
            Projects.listByCompany(companyId)
                .success(function (data, status, headers, config) {
                    if (data.code == 200) {
                        $scope.projects = data.data;
                        $scope.projectId = $scope.projects[0].id;
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
        };

        /**
         * 二级联动，根据团队获取项目列表
         */
        $scope.companySelected = function () {
            projectList($scope.companyId);
        };
    });