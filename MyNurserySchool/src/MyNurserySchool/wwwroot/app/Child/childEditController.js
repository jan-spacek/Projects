(function () {
    "use strict";

    angular.module("nursery-app")
        .controller("childEditController", childEditController);

    function childEditController($scope, $http, $location, $routeParams) {
        var vm = this;
        vm.childId = $routeParams.id;
        vm.child = {};
        vm.classId = 0;
        vm.isNew = vm.childId == 0;
        $scope.attendance = [{ id: 0, name: 'Žiadateľ' }, { id: 1, name: 'Dochádzajúci' }, { id: 2, name: 'Odstúpený' }];

        vm.birthDate = "1900-01-01";
        vm.startDate = "1900-01-01";
        vm.leaveDate = "1900-01-01";

        if (!vm.isNew) {
            vm.isBusy = true;
            $http.get("/Api/Child/" + vm.childId)
                .then(function (response) {
                    angular.copy(response.data, vm.child);
                    vm.classId = vm.child.classId;
                    var birthDate = new Date(vm.child.birthDate);
                    vm.birthDate = birthDate.getFullYear() < 1901 ? "1900-01-01" : birthDate;
                    var startDate = new Date(vm.child.startDate);
                    vm.startDate = startDate.getFullYear() < 1901 ? "1900-01-01" : startDate;
                    var leaveDate = new Date(vm.child.leaveDate);
                    vm.leaveDate = leaveDate.getFullYear() < 1901 ? "1900-01-01" : leaveDate;
                }, function () {
                    toastr.error("Nepodarilo sa načítať informácie o dieťati");
                }).finally(function () {
                    vm.isBusy = false;
                });
        }

        vm.saveChild = function () {
            vm.isBusy = true;
            vm.child.birthDate = vm.birthDate === null ? "1900-01-01" : vm.birthDate;
            vm.child.startDate = vm.startDate === null ? "1900-01-01" : vm.startDate;
            vm.child.leaveDate = vm.leaveDate === null ? "1900-01-01" : vm.leaveDate;

            if (vm.isNew)
            {
                $http.post("/Api/child/" + $scope.outerId, vm.child)
                    .then(function (response) {
                        toastr.success("Dieťa " + vm.child.firstName + " " + vm.child.lastName + " bolo úspešne vytvorené");
                        $location.path("#/class/" + vm.classId);
                    }, function () {
                        toastr.error("Dieťa sa nepodarilo vytvoriť");
                    }).finally(function () {
                        vm.isBusy = false;
                    });
            }
            else
            {
                $http.put("/Api/Child/" + $scope.outerId, vm.child)
                    .then(function (response) {
                        toastr.success("Zmeny v dieťati " + vm.child.firstName + " " + vm.child.lastName + " boli úspešne uložené");
                        $location.path("#/class/" + vm.classId);
                    }, function () {
                        toastr.error("Dieťa sa nepodarilo uložiť");
                    }).finally(function () {
                        vm.isBusy = false;
                    });
            }
        }

        vm.deleteChild = function () {
            vm.isBusy = true;
            $http.delete("/Api/Child/" + vm.child.id)
                .then(function () {
                    toastr.success("Dieťa bolo vymazané");
                    $location.path("#/class/" + vm.classId);
                }, function (error) {
                    toastr.error("Dieťa sa nepodarilo vymazať");
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }
    }
})();