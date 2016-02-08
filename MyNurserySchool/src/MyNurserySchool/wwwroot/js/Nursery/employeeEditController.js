(function () {
    "use strict";

    angular.module("nursery-app")
        .controller("employeeEditController", employeeEditController);

    function employeeEditController($scope, $http, $location, $routeParams) {
        var vm = this;
        vm.employeeId = $routeParams.id;
        vm.nursery = {};
        vm.employee = {};
        vm.isBusy = true;

        $http.get("/Api/Nursery/" + $scope.outerId)
            .then(function (response) {
                angular.copy(response.data, vm.nursery);
                for (var i = 0, l = vm.nursery.employees.length; i < l; i++) {
                    if (vm.nursery.employees[i].id == vm.employeeId) {
                        angular.copy(vm.nursery.employees[i], vm.employee);
                        vm.dateOfBirth = new Date(vm.employee.dateOfBirth);
                        vm.startDate = new Date(vm.employee.startDate);
                        vm.leaveDate = new Date(vm.employee.leaveDate);
                    }
                }
            }, function () {
                toastr.error("Nepodarilo sa načítať informácie o triede");
            }).finally(function () {
                vm.isBusy = false;
            });

        vm.saveEmployee = function () {
            vm.isBusy = true;
            vm.employee.dateOfBirth = vm.dateOfBirth;
            vm.employee.startDate = vm.startDate;
            vm.employee.leaveDate = vm.leaveDate;

            $http.put("/Api/Employee/" + vm.nursery.id, vm.employee)
                .then(function (response) {
                    toastr.success("Zmeny v zamestnancovi " + vm.employee.fullName + " boli úspešne uložené");
                    $location.path("#/");
                }, function () {
                    toastr.error("Zamestnanca sa nepodarilo uložiť");
                }).finally(function () {
                    vm.isBusy = false;
                });
        }

        vm.deleteEmployeeS = function () {
            vm.isBusy = true;
            $http.delete("/Api/Employee/" + vm.employee.id)
                .then(function () {
                    toastr.success("Zamestnanec bol vymazaný");
                    $location.path("#/");
                }, function (error) {
                    toastr.error("Zamestnanca sa nepodarilo vymazať");
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }
    }
})();