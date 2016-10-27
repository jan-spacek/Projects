(function (angular) {
    "use strict";

    angular.module("app.nursery")
        .controller("EmployeeEditController", EmployeeEditController);

    function EmployeeEditController($scope, $rootScope, $http, $routeParams, $controller, $uibModal, DataService) {
        $controller('BaseController', {
            '$scope':$scope
        });

        var vm = this;

        vm.employeeId = $routeParams.id;
        vm.nurseryId = $rootScope.nursery.id;
        vm.employee = {};
        vm.isNew = vm.employeeId == 0;
        $scope.attendance = [{ id: 0, name: 'Žiadateľ' }, { id: 1, name: 'Pracujúci' }, { id: 2, name: 'Odstúpený' }];
        $scope.employmentTypes = [{ value: 'Dohoda' }, { value: 'Plný úväzok' }, { value: 'Študentská dohoda' }, { value: 'Skrátený úväzok' }, { value: 'Živnosť' }];

        if (!vm.isNew) {
            vm.isBusy = true;

            DataService.getEmployee(vm.employeeId)
                .then(function (response) {
                    angular.copy(response.data, vm.employee);
                }, function () {
                    toastr.error("Nepodarilo sa načítať informácie o zamestnancovi");
                }).finally(function () {
                    vm.isBusy = false;
                });
        }

        vm.saveEmployee = function (isValid) {
            if (isValid) {
                vm.isBusy = true;

                if (vm.isNew) {
                    DataService.insertEmployee(vm.nurseryId, vm.employee)
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
                    DataService.updateEmployee(vm.nurseryId, vm.employee)
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

        vm.deleteEmployeeModal = function () {
           $scope.deleteModalTarget = "zamestnanca " + vm.employee.fullName;

            var modalInstance = $uibModal.open({
                templateUrl: '/app/common/templates/delete-modal.template.html',
                controller: 'DeleteModalController',
                scope:$scope
            });

            modalInstance.result.then(function () {
                vm.deleteEmployee();
            });
        }

        vm.deleteEmployee = function () {
            vm.isBusy = true;

            DataService.deleteEmployee(vm.employee.id)
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
})(angular);