/**
 * Created by baiyuxiong on 15/6/15.
 */
angular.module('track.todoController', ['localstorage','track.taskService'])

    .controller('TodoCtrl', function ($scope, Tasks) {
        $scope.tasks = Tasks.all();
        $scope.remove = function (task) {
            Tasks.remove(task);
        }
    });