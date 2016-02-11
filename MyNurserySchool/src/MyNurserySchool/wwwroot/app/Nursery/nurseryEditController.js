(function () {
    "use strict";

    angular.module("nursery-app")
        .controller("nurseryEditController", nurseryEditController);

    function nurseryEditController($scope, $http, $location, $controller) {
        $controller('baseController', {
            '$scope': $scope
        });

        var vm = this;
        vm.nursery = {};
        vm.isBusy = true;

        $http.get("/Api/Nursery/" + $scope.outerId)
            .then(function (response) {
                angular.copy(response.data, vm.nursery);
            }, function () {
                toastr.error("Nepodarilo sa načítať informácie o škôlke");
            }).finally(function () {
                vm.isBusy = false;
            });

        vm.saveNursery = function () {
            vm.isBusy = true;
            $http.put("/Api/Nursery/", vm.nursery)
                .then(function (response) {
                    toastr.success("Zmeny v škôlke " + vm.nursery.name + " boli úspešne uložené");
                    $location.path("#/");
                }, function () {
                    toastr.error("Škôlku sa nepodarilo uložiť");
                }).finally(function () {
                    vm.isBusy = false;
                });
        }
    }
})();