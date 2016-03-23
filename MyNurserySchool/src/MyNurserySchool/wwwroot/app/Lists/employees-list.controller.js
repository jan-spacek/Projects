(function (angular) {
    "use strict";

    angular.module("app.nursery")
        .controller("employeesListController", employeesListController);

    function employeesListController($scope, $http, $window, $controller) {
        $controller('baseController', {
            '$scope': $scope
        });

        var vm = this;
        vm.employees = [];
        vm.isBusy = true;
        $scope.attendance = [{ id: 0, name: 'Žiadateľ' }, { id: 1, name: 'Pracujúci' }, { id: 2, name: 'Odstúpený' }];

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
})(angular);