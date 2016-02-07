(function () {

    "use strict";

    angular.module("nursery-app")
        .controller("nurseryDetailController", ['$scope', '$routeParams', '$http', nurseryDetailController]);

    function nurseryDetailController($scope, $routeParams, $http) {
        var vm = this;
        vm.nursery = [];
        vm.isBusy = true;

        $http.get("/Api/Nursery/" + $scope.outerId)
            .then(function (response) {
                angular.copy(response.data, vm.nursery);
            }, function () {
                toastr.error("Nepodarilo sa načítať informácie o škôlke");
            }).finally(function () {
                vm.isBusy = false;
            });
    }
})();