angular.module('track.companyUserService', ['comm'])

    .factory('CompanyUsers', function ($http, f, v, s) {

        return {
            list: function () {
                return $http.post(f.url('companyUsers/list'), null);
            },
            addByCompanyName:function(companyName) {
                return $http.post(f.url('companyUsers/AddByCompanyName',{companyName:companyName}), null);
            }
        };
    });
