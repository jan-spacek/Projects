(function (angular) {
    "use strict";

    angular.module("app.nursery")
        .controller("NurseryEditController", NurseryEditController);

    function NurseryEditController($scope, $http, $location, $controller, $rootScope, DataService) {
        $controller('BaseController', {
            '$scope':$scope
        });

        var vm = this;

        vm.nurseryId = $rootScope.nursery.id;
        vm.nursery = {};
        vm.isBusy = true;

        DataService.getNursery(vm.nurseryId)
            .then(function (response) {
                angular.copy(response.data, vm.nursery);
            }, function () {
                toastr.error("Nepodarilo sa načítať informácie o škôlke");
            }).finally(function () {
                vm.isBusy = false;
            });

        vm.saveNursery = function (isValid) {
            if (isValid) {
                vm.isBusy = true;

                DataService.updateNursery(vm.nursery)
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
    }
})(angular);