(function (angular) {
    "use strict";

    angular.module("app.nursery")
        .controller("ChildEditController", ChildEditController);

    function ChildEditController($scope, $rootScope, $http, $routeParams, $controller, $uibModal, DataService) {
        $controller('BaseController', {
            '$scope':$scope
        });

        var vm = this;

        vm.childId = $routeParams.id;
        vm.nurseryId = $rootScope.nursery.id;
        vm.child = {};
        vm.classId = 0;
        vm.isNew = vm.childId == 0;
        $scope.attendance = [{ id: 0, name: 'Žiadateľ' }, { id: 1, name: 'Dochádzajúci' }, { id: 2, name: 'Odstúpený' }];
        vm.classes = [];

        DataService.getAllClasses(vm.nurseryId)
            .then(function (response) {
                angular.copy(response.data, vm.classes);
               $scope.classes = vm.classes;
            }, function () {
                toastr.error("Nepodarilo sa načítať informácie o triedach");
            }).finally(function () {
                vm.isBusy = false;
            });


        if (!vm.isNew) {
            vm.isBusy = true;

            DataService.getChild(vm.childId)
                .then(function (response) {
                    angular.copy(response.data, vm.child);
                    vm.classId = vm.child.classId;
                }, function () {
                    toastr.error("Nepodarilo sa načítať informácie o dieťati");
                }).finally(function () {
                    vm.isBusy = false;
                });
        }

        vm.saveChild = function (isValid) {
            if (isValid) {
                vm.isBusy = true;
                vm.child.nurseryId = vm.nurseryId;

                if (vm.isNew) {
                    DataService.insertChild(vm.child)
                        .then(function (response) {
                            toastr.success("Dieťa " + vm.child.firstName + " " + vm.child.lastName + " bolo úspešne vytvorené");
                           $scope.back();
                        }, function () {
                            toastr.error("Dieťa sa nepodarilo vytvoriť");
                        }).finally(function () {
                            vm.isBusy = false;
                        });
                }
                else {
                    if (vm.child.classId == null)
                        vm.child.classId = vm.classId;

                    DataService.updateChild(vm.child)
                        .then(function (response) {
                            toastr.success("Zmeny v dieťati " + vm.child.firstName + " " + vm.child.lastName + " boli úspešne uložené");
                           $scope.back();
                        }, function () {
                            toastr.error("Dieťa sa nepodarilo uložiť");
                        }).finally(function () {
                            vm.isBusy = false;
                        });
                }
            }
        }

        vm.deleteChildModal = function () {
           $scope.deleteModalTarget = "dieťa " + vm.child.firstName + " " + vm.child.lastName;

            var modalInstance = $uibModal.open({
                templateUrl: '/app/common/templates/delete-modal.template.html',
                controller: 'DeleteModalController',
                scope:$scope
            });

            modalInstance.result.then(function () {
                vm.deleteChild();
            });
        }

        vm.deleteChild = function () {
            vm.isBusy = true;

            DataService.deleteChild(vm.child.id)
                .then(function () {
                    toastr.success("Dieťa bolo vymazané");
                   $scope.back();
                }, function (error) {
                    toastr.error("Dieťa sa nepodarilo vymazať");
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }        
    }
})(angular);