angular.module('track.authService', ['comm',"localstorage"])

    .factory('Auth', function (f, $http,s) {
        return {
            login: function (username, password) {
                return $http.post(f.url('auth/login',null), {username: username, password: password});
            },
            reg: function () {
                return $http.post(f.url('auth/reg',null), {username: username, password: password,sms_code:sms_code});
            },
            changePassword: function () {

                return "hello";
            },
            getPassword: function () {

                return "hello";
            },
            logout: function () {

                return "hello";
            },
            isLoggedIn:function(){
                return s.get("token") != "" && s.get("userId") != ""
            }
        };
    });
