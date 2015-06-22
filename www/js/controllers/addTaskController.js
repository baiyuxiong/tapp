/**
 * Created by baiyuxiong on 15/6/15.
 */
angular.module('track.addTaskController', ['localstorage', 'track.userService', 'comm'])

    .controller('AddTaskCtrl', function ($scope, $state, s, User, $cordovaToast, f,Companies,Projects) {
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
            var returnValue = {items: []};
            zoekItems.forEach(function (item) {
                console.log(item);
                if (item.name.indexOf(query) > -1) {
                    returnValue.items.push(item);
                }
                else if (item.id.indexOf(query) > -1) {
                    returnValue.items.push(item);
                }
            });
            return returnValue;
        };
        $scope.itemsClicked = function (callback) {
            $scope.callbackValueModel = callback;
        }

        $scope.task = {};
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
                    if($scope.companies[0])
                    {
                        $scope.companyId = $scope.companies[0].id;
                        projectList($scope.companyId)
                    }
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
                        if($scope.projects[0])
                        {
                            $scope.projectId = $scope.projects[0].id;
                        }
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