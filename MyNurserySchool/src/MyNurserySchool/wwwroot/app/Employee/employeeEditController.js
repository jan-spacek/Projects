(function () {
    "use strict";

    angular.module("nursery-app")
        .controller("employeeEditController", employeeEditController);

    function employeeEditController($scope, $http, $routeParams, $controller) {
        $controller('baseController', {
            '$scope': $scope
        });

        var vm = this;
        vm.employeeId = $routeParams.id;
        vm.employee = {};
        vm.isNew = vm.employeeId == 0;
        $scope.attendance = [{ id: 0, name: 'Žiadateľ' }, { id: 1, name: 'Pracujúci' }, { id: 2, name: 'Odstúpený' }];

        vm.birthDate = "1900-01-01";
        vm.startDate = "1900-01-01";
        vm.leaveDate = "1900-01-01";

        if (!vm.isNew) {
            vm.isBusy = true;
            $http.get("/Api/Employee/" + vm.employeeId)
                .then(function (response) {
                    angular.copy(response.data, vm.employee);
                    var birthDate = new Date(vm.employee.birthDate);
                    vm.birthDate = birthDate.getFullYear() < 1901 ? "1900-01-01" : birthDate;
                    var startDate = new Date(vm.employee.startDate);
                    vm.startDate = startDate.getFullYear() < 1901 ? "1900-01-01" : startDate;
                    var leaveDate = new Date(vm.employee.leaveDate);
                    vm.leaveDate = leaveDate.getFullYear() < 1901 ? "1900-01-01" : leaveDate;
                }, function () {
                    toastr.error("Nepodarilo sa načítať informácie o zamestnancovi");
                }).finally(function () {
                    vm.isBusy = false;
                });
        }

        vm.saveEmployee = function (isValid) {
            if (isValid) {
                vm.isBusy = true;
                vm.employee.birthDate = vm.birthDate === null ? "1900-01-01" : vm.birthDate;
                vm.employee.startDate = vm.startDate === null ? "1900-01-01" : vm.startDate;
                vm.employee.leaveDate = vm.leaveDate === null ? "1900-01-01" : vm.leaveDate;

                if (vm.isNew) {
                    $http.post("/Api/Employee/" + $scope.outerId, vm.employee)
                        .then(function (response) {
                            toastr.success("Zamestnanec " + vm.employee.fullName + " bol úspešne vytvorený");
                            $scope.back();
                        }, function () {
                            toastr.error("Zamestnanca sa nepodarilo vytvoriť");
                        }).finally(function () {
                            vm.isBusy = false;
                        });
                }
                else {
                    $http.put("/Api/Employee/" + $scope.outerId, vm.employee)
                        .then(function (response) {
                            toastr.success("Zmeny v zamestnancovi " + vm.employee.fullName + " boli úspešne uložené");
                            $scope.back();
                        }, function () {
                            toastr.error("Zamestnanca sa nepodarilo uložiť");
                        }).finally(function () {
                            vm.isBusy = false;
                        });
                }
            }
        }

        vm.deleteEmployee = function () {
            vm.isBusy = true;
            $http.delete("/Api/Employee/" + vm.employee.id)
                .then(function () {
                    toastr.success("Zamestnanec bol vymazaný");
                    $scope.back();
                }, function (error) {
                    toastr.error("Zamestnanca sa nepodarilo vymazať");
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }
    }
})();