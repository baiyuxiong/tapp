/**
 * Created by baiyuxiong on 15/6/14.
 */
angular.module('comm', ['localstorage'])

    .constant('v', (function () {
        // Define your variable

        var base_url = 'http://track.pub:9001/';
        var client_id = "cf23df2207d99a74";
        // Use the variable in your constants
        return {
            'base_url': base_url,
            'client_id':client_id
        }
    })())

    .factory('f', function (s,v) {
        return {
            url: function (path,params) {
                var token = s.get('token')
                var u = v.base_url+path+'?client_id='+ v.client_id;
                if(token){
                    u += '&token='+token;
                }
                if(params){
                    for(k in params) {
                        u += '&'+k+'='+params[k];
                    }
                }
                return u;
            }
        };
    })
    .filter('avatar', function () {
        return function (path) {
            if (!path) {
                return 'img/default.png'
            }
            return path;
        };
    })
;