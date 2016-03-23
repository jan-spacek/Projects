(function () {
    "use strict";

    angular.module("app.nursery")
        .controller("ClassEditController", ClassEditController);

    function ClassEditController($scope, $http, $location, $routeParams, $controller, $uibModal) {
        $controller('BaseController', {
            '$scope': $scope
        });

        var vm = this;
        vm.classId = $routeParams.id;
        vm.nursery = {};
        vm.class = {};
        vm.isNew = vm.classId == 0;
        vm.isBusy = true;

        $http.get("/Api/Nursery/" + $scope.outerId)
            .then(function (response) {
                angular.copy(response.data, vm.nursery);
                if (!vm.isNew) {
                    for (var i = 0, l = vm.nursery.classes.length; i < l; i++) {
                        if (vm.nursery.classes[i].id == vm.classId) {
                            angular.copy(vm.nursery.classes[i], vm.class);
                        }
                    }
                }

            }, function () {
                toastr.error("Nepodarilo sa načítať informácie o triede");
            }).finally(function () {
                vm.isBusy = false;
            });

        vm.saveClass = function (isValid) {
            if (isValid) {
                vm.isBusy = true;
                if (vm.isNew) {
                    $http.post("/Api/Class/" + vm.nursery.id, vm.class)
                        .then(function (response) {
                            toastr.success("Trieda " + vm.class.name + " bola úspešne vytvorená");
                            $location.path("#/");
                        }, function () {
                            toastr.error("Triedu sa nepodarilo vytvoriť");
                        }).finally(function () {
                            vm.isBusy = false;
                        });
                }
                else {
                    $http.put("/Api/Class/" + vm.nursery.id, vm.class)
                        .then(function (response) {
                            toastr.success("Zmeny v triede " + vm.class.name + " boli úspešne uložené");
                            $location.path("#/");
                        }, function () {
                            toastr.error("Triedu sa nepodarilo uložiť");
                        }).finally(function () {
                            vm.isBusy = false;
                        });
                }
            }
        }

        vm.deleteClassModal = function () {
            $scope.deleteModalTarget = "triedu " + vm.class.name;

            var modalInstance = $uibModal.open({
                templateUrl: '/app/common/templates/delete-modal.template.html',
                controller: 'DeleteModalController',
                scope: $scope
            });

            modalInstance.result.then(function () {
                vm.deleteClass();
            });
        }

        vm.deleteClass = function () {
            vm.isBusy = true;
            var className = vm.class.name;
            $http.delete("/Api/Class/" + vm.class.id)
                .then(function () {                    
                    toastr.success("Trieda " + className + " bola vymazaná");
                    $scope.back();
                }, function (error) {
                    toastr.error("Triedu sa nepodarilo vymazať");
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }
    }
})();