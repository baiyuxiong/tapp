angular.module('track.companyService', ['comm'])

    .factory('Companies', function ($http, f, v, s) {

        return {
            add:function(company){
                return $http.post(f.url('company/add',{}), company);
            },
            list: function () {
                return $http.post(f.url('company/list',null), {});
            },
            listMyCompanies: function () {
                return $http.post(f.url('company/listMyCompanies',null), {});
            },
            detail: function (companyId) {
                return $http.post(f.url('company/detail',{id:companyId}), {});
            }
        };
    });
