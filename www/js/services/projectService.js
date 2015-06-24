angular.module('track.projectService', ['comm'])

    .factory('Projects', function ($http, f, v, s) {

        return {
            listByCompany: function (companyId) {
                return $http.post(f.url('project/listByCompany',{companyId:companyId}),null);
            },
            listCompanyAndProject: function (companyId) {
                return $http.post(f.url('project/listCompanyAndProject'),null);
            },
            detail:function(companyId,projectId){
                return $http.post(f.url('project/detail'),{companyId:companyId,id:projectId},null);
            }
        };
    });
