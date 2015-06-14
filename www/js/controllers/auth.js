angular.module('track.authController', [])

.controller('AppCtrl',function($scope,$rootScope, $ionicModal,$state){
            
    /**
     * 初始化登录弹窗
     */
    $ionicModal.fromTemplateUrl('templates/auth/login.html',
        {
                scope: $scope,
                animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.loginModal = modal;
        });
    
    //open login
    $scope.openLoginModal = function() {
            $scope.loginModal.show();
    };
    //close login
    $scope.closeLoginModal = function() {
            $scope.loginModal.hide();
    };
    
    
    //初始化注册弹窗
    $ionicModal.fromTemplateUrl('templates/auth/reg.html',
                                {
                                scope: $scope,
                                animation: 'slide-in-up'
                                }).then(function(modal) {
                                        $scope.regModal = modal;
                                        });
    
    //open login
    $scope.openRegModal = function() {
            $scope.regModal.show();
    };
    //close login
    $scope.closeRegModal = function() {
            $scope.regModal.hide();
    };
    
    $state.go("tab.todo");
    });