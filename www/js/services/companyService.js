angular.module('track.companyService', ['comm'])

    .factory('Companies', function ($http, f, v, s) {

        return {
            list: function () {
                return $http.post(f.url('company/list',null), {});
            },
            listMyCompanies: function () {
                return $http.post(f.url('company/listMyCompanies',null), {});
            }
        };
    });
