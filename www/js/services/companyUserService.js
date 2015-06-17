angular.module('track.companyService', ['comm'])

    .factory('CompanyUsers', function ($http, f, v, s) {

        return {
            list: function () {
                return $http.post(f.url('companyUsers/list'), null);
            }
        };
    });
