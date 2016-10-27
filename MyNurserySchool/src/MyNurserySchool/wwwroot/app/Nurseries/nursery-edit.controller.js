(function (angular) {
    "use strict";

    angular.module("app.nursery")
        .controller("NurseryAdminEditController", NurseryAdminEditController);

    function NurseryAdminEditController($routeParams, $http, $location, $uibModal,$scope, DataService) {
        var vm = this;
        vm.nurseryId = parseInt($routeParams.id);
        vm.nursery = {};
        vm.isNew = vm.id == 0;

        if (!vm.isNew) {
            vm.isBusy = true;

            DataService.getNursery(vm.nurseryId)
                .then(function (response) {
                    angular.copy(response.data, vm.nursery);
                }, function () {
                    toastr.error("Nepodarilo sa načítať informácie o škôlke");
                }).finally(function () {
                    vm.isBusy = false;
                });
        }

        vm.saveNursery = function () {
            vm.isBusy = true;

            if (vm.isNew) {
                DataService.insertNursery(vm.nursery)
                    .then(function (response) {
                        toastr.success("Bola vytvorená nová škôlka " + vm.nursery.name);
                        $location.path("#/");
                    }, function () {
                        toastr.error("Škôlku sa nepodarilo uložiť");
                    }).finally(function () {
                        vm.isBusy = false;
                    });
            }
            else
            {
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

        vm.deleteNurseryModal = function () {
           $scope.deleteModalTarget = "škôlku " + vm.nursery.name;

            var modalInstance = $uibModal.open({
                templateUrl: '/app/common/templates/delete-modal.template.html',
                controller: 'DeleteModalController',
                scope:$scope
            });

            modalInstance.result.then(function () {
                vm.deleteNursery();
            });
        }

        vm.deleteNursery = function () {
            vm.isBusy = true;

            var nurseryName = vm.nursery.name;

            DataService.deleteNursery(vm.nursery.id)
                .then(function () {
                    toastr.success("Škôlka " + nurseryName + " bola vymazaná");
                    $location.path("#/");
                }, function (error) {
                    toastr.error("Škôlku " + nurseryName + " sa nepodarilo vymazať");
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }
    }
})(angular);