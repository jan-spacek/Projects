(function () {
    "use strict";

    angular.module("nursery-app")
        .controller("employeesListController", employeesListController);

    function employeesListController($scope, $http, $window, $controller) {
        $controller('baseController', {
            '$scope': $scope
        });

        var vm = this;
        vm.employees = [];
        vm.isBusy = true;

        $http.get("/Api/Nursery/" + $scope.outerId + "/employees")
            .then(function (response) {
                angular.copy(response.data, vm.employees);
            }, function (error) {
                toastr.error("Nepodarilo sa načítať zoznam zamestnancov");
            })
            .finally(function () {
                vm.isBusy = false;
            });
    }
})();