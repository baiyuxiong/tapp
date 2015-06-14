angular.module('track.controllers', [])

.controller('TodoCtrl', function($scope,Tasks) {
    $scope.tasks = Tasks.all();
    $scope.remove = function(task) {
        Tasks.remove(task);
    }
})

.controller('AllCtrl', function($scope,Tasks) {
    $scope.tasks = Tasks.all();
    $scope.remove = function(task) {
        Tasks.remove(task);
    }
})

.controller('TaskDetailCtrl', function($scope, $stateParams, Tasks) {
    $scope.task = Tasks.get($stateParams.taskId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: false
    };
});