(function (angular) {
    "use strict";

    angular.module("app.nursery")
        .controller("EmployeesListController", EmployeesListController);

    function EmployeesListController($scope, $http, $window, $controller, $rootScope) {
        $controller('BaseController', {
            '$scope':$scope
        });

        var vm = this;
        vm.nurseryId = $rootScope.nursery.id;
        vm.employees = [];
        vm.isBusy = true;
       $scope.attendance = [{ id: 0, name: 'Žiadateľ' }, { id: 1, name: 'Pracujúci' }, { id: 2, name: 'Odstúpený' }];

        $http.get("/Api/Nursery/" + vm.nurseryId + "/employees")
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