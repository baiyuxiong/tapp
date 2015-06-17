angular.module('track.userService', ['comm',"localstorage"])

    .factory('User', function (f, $http,s) {
        return {
            me: function (username, password) {
                return $http.post(f.url('user/me',null), {});
            }
        };
    });
