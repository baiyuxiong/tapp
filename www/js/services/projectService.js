angular.module('track.projectService', ['comm'])

    .factory('Projects', function ($http, f, v, s) {

        return {
            listByCompany: function (companyId) {
                return $http.post(f.url('project/listByCompany',{companyId:companyId}),null);
            }
        };
    });
