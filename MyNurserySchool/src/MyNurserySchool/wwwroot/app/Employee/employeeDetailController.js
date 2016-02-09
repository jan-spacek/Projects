(function () {
    "use strict";

    angular.module("nursery-app")
        .controller("employeeDetailController", employeeDetailController);

    function employeeDetailController($scope, $http, $location, $routeParams) {
        var vm = this;
        vm.employeeId = $routeParams.id;
        vm.employee = {};
        vm.attendanceStates = ["žiadateľ", "pracujúci", "odstúpený"];

        vm.isBusy = true;
        $http.get("/Api/Employee/" + vm.employeeId)
            .then(function (response) {
                angular.copy(response.data, vm.employee);
            }, function () {
                toastr.error("Nepodarilo sa načítať informácie o zamestnancovi");
            }).finally(function () {
                vm.isBusy = false;
            });

        vm.deleteEmployee = function () {
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