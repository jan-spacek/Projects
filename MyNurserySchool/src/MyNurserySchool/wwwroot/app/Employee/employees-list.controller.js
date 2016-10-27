(function (angular) {
    "use strict";

    angular.module("app.nursery")
        .controller("EmployeesListController", EmployeesListController);

    function EmployeesListController($scope, $http, $window, $controller, $rootScope, DataService) {
        $controller('BaseController', {
            '$scope':$scope
        });

        var vm = this;

        vm.nurseryId = $rootScope.nursery.id;
        vm.employees = [];
        vm.isBusy = true;
        vm.editing = false;
        vm.editedEmp = {};
        $scope.attendance = [{ id: 0, name: 'Žiadateľ' }, { id: 1, name: 'Pracujúci' }, { id: 2, name: 'Odstúpený' }];

        activate();

        function activate() {
            DataService.getAllEmployees(vm.nurseryId)
                .then(function (response) {
                    angular.copy(response.data, vm.employees);
                    _.each(vm.employees, function (employee) {
                        employee.editMode = false;
                    });
                }, function (error) {
                    toastr.error("Nepodarilo sa načítať zoznam zamestnancov");
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }
        
        vm.activateEditMode = function (employee) {
            if (!vm.editing && $scope.canEdit && $window.outerWidth > 768) {
                angular.copy(employee, vm.editedEmp);
                vm.setEditMode(employee.id, true);
            }
        }

        vm.closeEditMode = function (id) {
            vm.setEditMode(id, false);
            vm.editedEmp = {};
        }

        vm.setEditMode = function (id, value, copy) {
            _.find(vm.employees, function (employee) {
                if (employee.id == id) {
                    employee.editMode = value;
                    vm.editing = value;
                    if (copy) {
                        angular.copy(vm.editedEmp, employee);
                    }
                }
            });
        }

        vm.saveEmployee = function (employee) {
            var isValid = true;

            if (isValid) {
                vm.isBusy = true;

                DataService.updateEmployee(vm.nurseryId, employee)
                    .then(function (response) {
                        toastr.success("Zmeny v zamestnancovi " + employee.fullName + " boli úspešne uložené");
                        vm.setEditMode(employee.id, false, true);
                    }, function () {
                        toastr.error("Zamestnanca sa nepodarilo uložiť");
                    }).finally(function () {
                        vm.isBusy = false;
                    });
            }
        }
    }
})(angular);