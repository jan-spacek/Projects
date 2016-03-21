(function () {
    "use strict";

    angular.module("nursery-app")
        .controller("childEditController", childEditController);

    function childEditController($scope, $http, $routeParams, $controller, $uibModal) {
        $controller('baseController', {
            '$scope': $scope
        });

        var vm = this;
        vm.childId = $routeParams.id;
        vm.child = {};
        vm.classId = 0;
        vm.isNew = vm.childId == 0;
        $scope.attendance = [{ id: 0, name: 'Žiadateľ' }, { id: 1, name: 'Dochádzajúci' }, { id: 2, name: 'Odstúpený' }];
        vm.classes = [];

        $http.get("/Api/Nursery/" + $scope.outerId)
            .then(function (response) {
                for (var i = 0; i < response.data.classes.length; i++) {
                    vm.classes.push({
                        id: response.data.classes[i].id,
                        name: response.data.classes[i].name
                    });
                }
                $scope.classes = vm.classes;
            }, function () {
                toastr.error("Nepodarilo sa načítať informácie o škôlke");
            }).finally(function () {
                vm.isBusy = false;
            });


        if (!vm.isNew) {
            vm.isBusy = true;
            $http.get("/Api/Child/" + vm.childId)
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
                vm.child.nurseryId = $scope.outerId;

                if (vm.isNew) {
                    $http.post("/Api/Child/", vm.child)
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
                    $http.put("/Api/Child/", vm.child)
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
                templateUrl: '/app/Common/deleteModal.html',
                controller: 'deleteModalController',
                scope: $scope
            });

            modalInstance.result.then(function () {
                vm.deleteChild();
            });
        }

        vm.deleteChild = function () {
            vm.isBusy = true;
            $http.delete("/Api/Child/" + vm.child.id)
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
})();