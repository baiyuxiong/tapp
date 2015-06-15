angular.module('track.commService', ['comm'])

    .factory('sms', function (f) {
        return {
            sendSms: function () {

                return "hello";
            }
        };
    });
