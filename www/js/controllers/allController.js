/**
 * Created by baiyuxiong on 15/6/15.
 */
angular.module('track.allController', ['localstorage','track.taskService'])

    .controller('AllCtrl', function ($scope, Tasks) {
        $scope.tasks = {};
        $scope.remove = function (task) {
            //Tasks.remove(task);
        }
    });
