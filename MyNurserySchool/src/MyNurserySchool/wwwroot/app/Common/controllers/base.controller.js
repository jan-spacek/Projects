(function (angular) {
    "use strict";

    angular
        .module("common")
        .controller("BaseController", BaseController);

    function BaseController($scope, $window) {
       $scope.redirect = function (path) {
            $window.location.href = path;
        }

       $scope.back = function () {
            $window.history.back();
        };

       $scope.back2 = function () {
            $window.history.go(-2);
        };

       $scope.exportAction = function (exportTo) {
            switch (exportTo) {
                case 'excel':$scope.$broadcast('export-excel', {});
                    break;
                case 'doc':$scope.$broadcast('export-doc', {});
                    break;
                default: console.log('no event caught');
            }
        }
    }

})(angular);