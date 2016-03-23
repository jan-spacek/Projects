(function (angular) {

    "use strict";

    angular.module("app.nurseries")
        .controller("NurseriesListController", NurseriesListController);

    function NurseriesListController($http, $scope, $window) {
        var vm = this;
        vm.nurseries = [];
        vm.isBusy = true;

        $http.get("/Api/Nurseries")
            .then(function (response) {
                angular.copy(response.data, vm.nurseries);
            }, function (error) {
                toastr.error("Nepodarilo sa načítať dáta: " + error);
            })
            .finally(function () {
                vm.isBusy = false;
            });

        $scope.redirect = function (path) {
            $window.location.href = path;
        }
    }
})(angular);