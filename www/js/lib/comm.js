/**
 * Created by baiyuxiong on 15/6/14.
 */
angular.module('comm', ['localstorage'])

    .constant('v', (function () {
        // Define your variable

        var base_url = 'http://127.0.0.1:9001/';
        var client_id = "cf23df2207d99a74";
        // Use the variable in your constants
        return {
            'base_url': base_url,
            'client_id':client_id
        }
    })())

    .factory('f', function (s,v) {
        var token = s.get('token')
        return {
            url: function (path) {
                var u = v.base_url+path+'?client_id='+ v.client_id;
                if(token){
                    u += '&token='+token;
                }
                return u;
            }
        };
    });