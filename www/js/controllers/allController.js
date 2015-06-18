/**
 * Created by baiyuxiong on 15/6/15.
 */
angular.module('track.allController', ['localstorage','track.companyService'])

    .controller('AllCtrl', function ($scope, Companies) {
        Companies.listMyCompanies()
            .success(function (data, status, headers, config) {
                if (data.code == 200) {
                    //var projects = {}
                    //projects.companiesOwned = data.data.companys.companiesOwned;
                    //projects.companiesJoined = data.data.companys.companiesJoined;
                    //projects.companiesJoining = data.data.companys.companiesJoining;
                    //
                    //for (x in projects.companiesOwned) {
                    //    projects.companiesOwned[x].rProjects = data.data.projects[projects.companiesOwned[x].id];
                    //}
                    //for (x in projects.companiesJoined) {
                    //    projects.companiesJoined[x].rProjects = data.data.projects[projects.companiesJoined[x].id];
                    //}
                    //for (x in projects.companiesJoining) {
                    //    projects.companiesJoining[x].rProjects = data.data.projects[projects.companiesJoining[x].id];
                    //}

                    $scope.companies = data.data;
                }
                else {
                    if (!toastShowed) {
                        $cordovaToast.showLongBottom(data.message);
                        toastShowed = true;
                    }

                }
            }).
            error(function (data, status, headers, config) {
                if (!toastShowed) {
                    $cordovaToast.showLongBottom("异常，请检查网络或联系管理员")
                    toastShowed = true;
                }
            });
    });
