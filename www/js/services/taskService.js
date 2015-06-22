angular.module('track.taskService', ['comm'])

    .factory('Tasks', function ($http, f, v, s) {

        return {
            listTodo: function () {
                return $http.post(f.url('task/listTodo',null), {});
            },
            detail:function(companyId, taskId){
                return $http.post(f.url('task/detail',{companyId:companyId, taskId:taskId }), {});
            }
        };
    });
