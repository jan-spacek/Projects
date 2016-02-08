(function () {
    "use strict";

    angular.module("nursery-app")
        .controller("employeeEditController", employeeEditController);

    function employeeEditController($scope, $http, $location, $routeParams) {
        var vm = this;
        vm.employeeId = $routeParams.id;
        vm.employee = {};
        vm.isBusy = true;

        $http.get("/Api/Employee/" + vm.employeeId)
            .then(function (response) {
                angular.copy(response.data, vm.employee);
                var dateOfBirth = new Date(vm.employee.dateOfBirth);
                vm.dateOfBirth = dateOfBirth.getFullYear() < 1901 ? null : dateOfBirth;
                var startDate = new Date(vm.employee.startDate);
                vm.startDate = startDate.getFullYear() < 1901 ? null : startDate;
                var leaveDate = new Date(vm.employee.leaveDate);
                vm.leaveDate = leaveDate.getFullYear() < 1901 ? null : leaveDate;
            }, function () {
                toastr.error("Nepodarilo sa načítať informácie o zamestnancovi");
            }).finally(function () {
                vm.isBusy = false;
            });

        $http.get("/Api/Nursery/AttendanceStates")
            .then(function (response) {
                $scope.data = response.data;
            }, function () {
                toastr.error("Nepodarilo sa načítať stránku");
            });

        vm.saveEmployee = function () {
            vm.isBusy = true;
            vm.employee.dateOfBirth = vm.dateOfBirth === null ? "1900-01-01" : vm.dateOfBirth;
            vm.employee.startDate = vm.startDate === null ? "1900-01-01" : vm.startDate;
            vm.employee.leaveDate = vm.leaveDate === null ? "1900-01-01" : vm.leaveDate;

            $http.put("/Api/Employee/" + $scope.outerId, vm.employee)
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