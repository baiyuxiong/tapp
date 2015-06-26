/**
 * Created by baiyuxiong on 15/6/15.
 */
angular.module('track.addCompanyController', ["ngCordova", 'localstorage', 'track.userService', 'comm'])

    .controller('AddCompanyCtrl', function ($scope, Companies, $state, s, User, $cordovaToast, f, $cordovaImagePicker, $ionicActionSheet, $cordovaCamera,$location) {

        $scope.company = {};
        $scope.doAddCompany = function () {
            Companies.add($scope.company)
                .success(function (data, status, headers, config) {
                    if (data.code == 200) {
                        $cordovaToast.showLongBottom("添加组织成功");
                        $location.url("/tab/all");
                    }
                    else {
                            $cordovaToast.showLongBottom(data.message);
                    }
                }).
                error(function (data, status, headers, config) {
                        $cordovaToast.showLongBottom("异常，请检查网络或联系管理员")
                });
        };

        $scope.addLogo = function () {
            $ionicActionSheet.show({
                buttons: [
                    {text: '相机'},
                    {text: '图库'}
                ],
                cancelText: '关闭',
                cancel: function () {
                    return true;
                },
                buttonClicked: function (index) {
                    switch (index) {
                        case 0:
                            takePhoto()
                            break;
                        case 1:
                            pickImage();
                            break;
                        default:
                            break;
                    }
                    return true;
                }
            });
        };

        var pickImage = function () {

            var options = {
                maximumImagesCount: 1,
                width: 800,
                height: 800,
                quality: 80
            };

            $cordovaImagePicker.getPictures(options)
                .then(function (results) {
                    $scope.images_list.push(results[0]);
                }, function (error) {

                });

        };

        var takePhoto = function () {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function (imageURI) {
                //$scope.imgURI = "data:image/jpeg;base64," + imageData;
                var image = document.getElementById('myImage');
                image.src = imageURI;
            }, function (err) {
                // An error occured. Show a message to the user
            });
        }
    });